/* This project is based off https://github.com/TDAWebDevBootcamp/Example-Todo-list */

import {useState, useEffect, useRef} from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import MyNavBar from './components/navbar' ;
import UserRegister from './UserRegister' ;
import UserLogin from './UserLogin' ;
import Admin from './Admin' ;
import Profile from './Profile' ;
import View from './View'
import Add from './Add';
import Footer from './components/footer';
import "./App.css"

function App() {
	// ======= Users state =======
	const adminUser = {
		username: 'Admin',
		password: 'Admin123', // Who needs cryptographic hash functions or strong passwords?
		imageUrl: 'https://images.unsplash.com/photo-1593486544625-13ef2368e43a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80',
		bio: 'Administrator Bob - Now officially unremovable'
	} ;
	const [users, changeUsers] = useState({
		0: { ...adminUser }, // (must have ID 0)
	}) ;
	const [nextUserId, changeNextUserId] = useState(1) ;
	const [currentUserId, changeCurrentUserId] = useState(null) ; // (initially no user logged in) 

	// Get user id given username (case-insensitive)
	function getUserId(username) {
		username = username.toLowerCase() ;
		const matchingUsers = Object.entries(users).filter(([id, userData]) => userData.username.toLowerCase() === username) ;
		if (matchingUsers.length === 1) return matchingUsers[0][0] ;
		else if (matchingUsers.length === 0) return null ;
		else {
			console.error("Duplicate usernames in data") ;
			return null ;
		}
	}

	function getNextUserId() {
		const nextIdTemp = nextUserId ;
		changeNextUserId(a => a + 1) ;
		return nextIdTemp ;
	}

	function addUser(newUser) {
		const userId = getNextUserId() ;
		const user = { [userId]: newUser };
    changeUsers((users) => ({...users, ...user}));
	}

	function removeUser(userId) {
		const removeUserFunc = (users) => {
			const usersNew = {...users}
			delete usersNew[userId] ;
			return usersNew ;
		}
		changeUsers(removeUserFunc) ;
		if (userId === currentUserId) {
			changeCurrentUserId(null) ;
		}
	}

	function userLogin(formValues) {
		const userId = getUserId(formValues.username) ;
		const credentialsMatch = (userId !== null && formValues.password === users[userId].password) ; // User exists and passwords match?
		if (credentialsMatch) {
			changeCurrentUserId(userId) ; // Make this the current user if credentials were okay
		}
		return credentialsMatch ;
	}

	function userLogout() {
		changeCurrentUserId(null) ;
	}

	// ======= Cards State =======

  const [cardDefs, changeCardDefs] = useState({}) ;
	const [nextPostId, changeNextPostId] = useState(0) ;

	function getNextPostId() {
		const nextPostIdTemp = nextPostId ;
		changeNextPostId(a => a + 1) ;
		return nextPostIdTemp ;
	}

  const addCard = (userId, imageUrl, text,) => {
    const cardDef = { [getNextPostId()]: {userId, imageUrl, text, dislikeCount: 0, likeCount: 0, comments: {}} };
    changeCardDefs((cardDefs) => ({...cardDefs, ...cardDef}));
  }

	function handleAddLike(postId) {
		const changeLikeCountFunc = (cardDefs) => {
			let cardDefsNew = {...cardDefs} ;
			cardDefsNew[postId] = {...cardDefsNew[postId], likeCount: cardDefsNew[postId].likeCount + 1} ;
			return cardDefsNew ;
		}
		changeCardDefs(changeLikeCountFunc) ;
	}

	function handleAddDislike(postId) {
		const changeDislikeCountFunc = (cardDefs) => {
			let cardDefsNew = {...cardDefs} ;
			cardDefsNew[postId] = {...cardDefsNew[postId] , dislikeCount: cardDefsNew[postId].dislikeCount + 1} ;
			return cardDefsNew ;
		}
		changeCardDefs(changeDislikeCountFunc) ;
	}

	// ======= Comments State (nested in Cards State) =======

  const [nextCommentId, changeNextCommentId] = useState(0) ;

	function getNextCommentId() {
		const nextComIdTemp = nextCommentId ;
		changeNextCommentId(a => a + 1) ;
		return nextComIdTemp ;
	}

	function addComment(text, postId) {
		const changeComments = (cardDefs) => {
			const cardDefsNew = {...cardDefs} ;
			const name = users[currentUserId].username ;
			const commentDef = { [getNextCommentId()]: {userId: currentUserId, name, text} };
			cardDefsNew[postId].comments = {...cardDefsNew[postId].comments, ...commentDef} ;
			return cardDefsNew ;
		}
		changeCardDefs(changeComments) ; ;
	}

	// ======================================================

	// Restore from localStorage on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || undefined ;
		const nextUserId  = JSON.parse(localStorage.getItem("nextUserId")) || undefined ;
		const cardDefs = JSON.parse(localStorage.getItem("cardDefs")) || undefined ;
		const nextPostId  = JSON.parse(localStorage.getItem("nextPostId")) || undefined ;
		const nextCommentId  = JSON.parse(localStorage.getItem("nextCommentId")) || undefined ;
		const currentUserId = JSON.parse(localStorage.getItem("currentUserId")) || undefined ;
    initWithData(users, nextUserId, cardDefs, nextPostId, nextCommentId, currentUserId) ;
  }, []) ;

	// === Update localStorage when component state changes so we can persist between 'sessions' ===
	/* 	Counter for initial useEffect() calls to ignore
	*		Non-optimised build seems to call this 3 times but optimised (e.g. GitHub pages deployment) seems to call it only twice (why????)
	*		As per https://maksimrv.medium.com/usestate-with-callback-d574298eb8bd this has been changed from 3 to 1
	*		as it appears to give the required behaviour in both builds
	*/
	const initialCallsRemaining = useRef(1);
  useEffect(() => {
		// (ignore calls in first render so we don't overwrite localstorage with default values)
		 if (initialCallsRemaining.current > 0) {
			initialCallsRemaining.current-- ;
			return ;
		}
		localStorage.setItem("users", JSON.stringify(users)) ;
		localStorage.setItem("nextUserId", JSON.stringify(nextUserId)) ;
		localStorage.setItem("cardDefs", JSON.stringify(cardDefs)) ;
		localStorage.setItem("nextPostId", JSON.stringify(nextPostId)) ;
		localStorage.setItem("nextCommentId", JSON.stringify(nextCommentId)) ;
		localStorage.setItem("currentUserId", JSON.stringify(currentUserId)) ;
  }, [users, nextUserId, cardDefs, nextPostId, nextCommentId, currentUserId]) ;

	// Initialise state from given data
	function initWithData(users = {0: { ...adminUser }}, nextUserId = 1, cardDefs = {}, nextPostId = 0, nextCommentId = 0, currentUserId = null) {
		changeUsers(users) ;
		changeCurrentUserId(currentUserId) ;
		changeNextUserId(nextUserId) ;
		changeCardDefs(cardDefs) ;
		changeNextPostId(nextPostId) ;
		changeNextCommentId(nextCommentId) ;
	}

	// Clear everything!
	function clearData() {
		initWithData() ;
		localStorage.clear() ;
	}

	// Template
	return (
		<div>
			<MyNavBar username={currentUserId === null ? null : users[currentUserId].username} userLogout={userLogout} clearData={clearData} />

			<Container className="my-container">
				<main>
					<Routes>
						<Route path="/" element={
							<UserLogin onSubmit={userLogin} />
						} />

						<Route path="/register" element={
							<UserRegister getUserId={getUserId} onSubmit={addUser} />
						} />
						
						<Route path="/view" element={<>{
							(currentUserId !== null) &&
								<View
									onSubmit={addComment}
									cardDefs={cardDefs}
									users={users}
									handleAddDislike={(postId) => handleAddDislike(postId)}
									handleAddLike={(postId) => handleAddLike(postId)}
								/>
						}</>}
						/>

						<Route path="/add" element={<>{
							(currentUserId !== null) &&
								<Add onSubmit={(imageUrl, text) => addCard(currentUserId, imageUrl, text)} />
						}</>}
						/>
	
						<Route path="/profile/:userId" element={<>{
							(currentUserId !== null) &&
								<Profile users={users} currentUserId={currentUserId} removeUser={removeUser} clearDB={clearData} />
						}</>}
						/>

						<Route path="/admin" element={<>{
							(currentUserId === "0") &&
								<Admin users={users} removeUser={removeUser} clearDB={clearData} />
						}</>}
						/>
						
						<Route path="*" element={<Navigate to="/" replace />} />

					</Routes>
				</main>
			</Container>
			<Footer className="footer"/>
			
		</div>
	);
}
export default App;
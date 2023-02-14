/* This project is based off https://github.com/TDAWebDevBootcamp/Example-Todo-list */

import React, {useState, useEffect} from 'react';
import { Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import MyNavBar from './components/navbar' ;
import View from './View'
import Add from './Add';

function App() {
	// Hard-coded users for now
	const [users, changeUsers] = useState({
		0: { username: 'Bob', imageUrl: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
		1: { username: 'Bob2', imageUrl: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' }
	}) ;
	const userId = 0 ;

  const [cardDefs, changeCardDefs] = useState({}) ;
	const [nextPostId, changeNextPostId] = useState(0) ;

	function getNextPostId() {
		const nextPostIdTemp = nextPostId ;
		changeNextPostId(a => a + 1) ;
		return nextPostIdTemp ;
	}

  const addCard = (userId, imageUrl, text) => {
    const cardDef = { [getNextPostId()]: {userId, imageUrl, text, likeCount: 0} };
    localStorage.setItem("cardDefs", JSON.stringify({...cardDefs, ...cardDef}))
		console.log("DEBUG2 :", {...cardDefs, ...cardDef}) ;
    changeCardDefs((cardDefs) => ({...cardDefs, ...cardDef}));
  }

	function handleAddLike(postId) {
		const changeLikeCountFunc = (cardDefs) => {
			let cardDefsNew = {...cardDefs} ;
			cardDefsNew[postId] = {...cardDefsNew[postId] , likeCount: cardDefsNew[postId].likeCount + 1} ;
			localStorage.setItem("cardDefs", JSON.stringify(cardDefsNew)) ;
			return cardDefsNew ;
		}
		changeCardDefs(changeLikeCountFunc) ;
	}

	// Restore from localStorage on component mount
  useEffect(() => {
    const cardDefs = JSON.parse(localStorage.getItem("cardDefs")) ;
		console.log({cardDefs}) ;
    if (cardDefs) { 
			changeCardDefs(cardDefs) ;
			console.log("DEBUG ", Object.keys(cardDefs).length) ;
			changeNextPostId(Object.keys(cardDefs).length) ;
		}
  }, []) ;


	return (
		<div>

			<MyNavBar />

			<Container>
				<Routes>
					<Route path="/" element={
						<View cardDefs={cardDefs} users={users} handleAddLike={(postId) => handleAddLike(postId)} />
					} />
					
					<Route path="/view" element={
						<View cardDefs={cardDefs} users={users} handleAddLike={(postId) => handleAddLike(postId)} />
					} />

					<Route path="/add" element={
						<Add onSubmit={(imageUrl, text) => addCard(userId, imageUrl, text)} />
					} />
					
				</Routes>
			</Container>
		</div>
	);

}
export default App;
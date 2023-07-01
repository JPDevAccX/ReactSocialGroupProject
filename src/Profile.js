import { useEffect } from 'react';
import { useParams } from 'react-router';
import Card from 'react-bootstrap/Card';
import "./Profile.css"

export default function Profile({users, currentUserId}) {

	// Get specified user (current or given id)
	let { userId } = useParams(); 
	const user = users[((userId === 'current') ? currentUserId : userId)] ;

	// Set a default profile image if one wasn't given
	let userImageUrl = user.imageUrl || "images/user.png" ;

	useEffect(() => {
		window.scrollTo({top: 0, behavior: 'instant'}) ;
	}, []) ;

	// Template
  return (
		<div className="my-max-width-972px m-auto">
			<h1 className="text-center">User Profile</h1>
			<span className="visibility-hidden">&nbsp;</span>
			<Card className="profile-card">
				<Card.Header>
					<div className="profile-card-user-heading">
						<img className="user-avatar" src={userImageUrl} alt="" />
						<div className="user-name">{user.username}</div>
					</div>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						{user.bio}
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
  );
}
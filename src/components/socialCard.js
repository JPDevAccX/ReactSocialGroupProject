import Card from 'react-bootstrap/Card';
import Likes from './Likes';
import Comments from './Comments';
import "./socialCards.css"
import { Link } from 'react-router-dom';

export default function SocialCard(props) {
	const cardDef = props.cardDef ;
	const user = props.users[cardDef.userId] ;

	// Set a default profile image if one wasn't given or the user account has been deleted
	let userImageUrl = ((user) ? user.imageUrl : "") || "images/user.png" ;

	// Set a default username if the user account has been deleted
	let username = (user) ? user.username : "(deleted user)" ;

	return (
		<Card className="social-card">
			<Card.Header>
				<div>
					<Link to={`/profile/${cardDef.userId}`} className={user ? '' : 'pe-none'}>
						<img className="user-avatar mb-2" src={userImageUrl} alt="" />
					</Link>
				</div>
				<span className="post-username">{username}</span>
			</Card.Header>
			<Card.Img variant="top" src={cardDef.imageUrl} />
			<Card.Body>
				<Card.Text>
					{cardDef.text}
				</Card.Text>
				<Likes 
					likeCount={cardDef.likeCount} 
					dislikeCount={cardDef.dislikeCount}
					handleAddLike={() => props.handleAddLike()}
					handleAddDislike={() => props.handleAddDislike()}
				/>
				<Comments comments={cardDef.comments} users={props.users} />
				
			</Card.Body>
		</Card>
	)
}
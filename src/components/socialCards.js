import SocialCard from "./socialCard" ;
import AddComment from './AddComment.js';
import "./socialCards.css"

export default function SocialCards(props) {
	const socialCards = Object.entries(props.cardDefs).map(([postId, cardDef]) => {
	  
		const handleAddLike = () => {
			props.handleAddLike(postId) ;
		} ;
    
		const handleAddDislike = () => {
			props.handleAddDislike(postId) ;
		} ;
		const addComments = (text) => {
			props.onSubmit(text, postId) ;
		} ;

		return (
			<div className="single-post" key={postId} >
				<SocialCard cardDef={cardDef} users={props.users} handleAddLike={handleAddLike} handleAddDislike={handleAddDislike} />
				<AddComment onSubmit={addComments} />
			</div>
		) ;
}) ;
	
	return (
		<div className="social-cards">
			{socialCards}
		</div>
	)
}
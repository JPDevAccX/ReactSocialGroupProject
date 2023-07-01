import { Link } from "react-router-dom";
import "./socialCards.css"

function Comment(props){
  const commentDef = props.commentDef;
	const user = props.users[commentDef.userId] ;
  
	return (
		<div className="comment">
			<Link to={`/profile/${commentDef.userId}`} className={user ? '' : 'pe-none'}>
      	<h5>{commentDef.name}</h5>
			</Link>
								
			<p className="px-1">{commentDef.text}</p>		
		</div>
  );
}
export default Comment;
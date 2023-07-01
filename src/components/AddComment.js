import { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./socialCards.css"

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function AddComment(props){
	const [comment, changeComment] = useState("") ; 

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  const handleChange = (event) => {
		changeComment(event.target.value) ;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(comment);
		changeComment("") ;
    toastr["success"]("Comment added", "Success")
  }

  return (
		<div className="add-comment">
			<Form onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="comment">
					<Form.Label>Comment</Form.Label>
					<Form.Control 
						name="comment"
						value={comment}
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				
				<Button variant="primary" type="submit" disabled={!comment}>
					Submit
				</Button>
			</Form>
		</div>
  );
}
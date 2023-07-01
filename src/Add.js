import { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './index.css';

function Add(props){
	const [formValues, changeFormValues] = useState({imageUrl: "", message: ""}) ;

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
		changeFormValues(values => ({...values, [event.target.name]: event.target.value}))
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(formValues.imageUrl, formValues.message);
		changeFormValues({imageUrl: "", message: ""}) ;
    toastr["success"]("Post added", "Success")
  }

  return (
		<div className="add-post my-max-width-972px m-auto">
			<h1 className="text-center">Add Post</h1>
			<span className="visibility-hidden">&nbsp;</span>
			<Form onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="imageUrl">
					<Form.Label>Image URL</Form.Label>
					<Form.Control className='input-shadow'
						name="imageUrl"
						value={formValues.imageUrl}
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				<Form.Group controlId="message">
					<Form.Label>Message</Form.Label>
					<Form.Control className='input-shadow'
						name="message"
						value={formValues.message}
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>

				<div className="text-center my-4">
					<Button variant="primary" type="submit">Submit</Button>
				</div>
			</Form>
		</div>
  );

}
export default Add;
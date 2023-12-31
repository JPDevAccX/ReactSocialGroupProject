import {useState} from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

export default function UserLogin(props) {
	const navigate = useNavigate();

	// Login state (false denotes error) 
	const [loginOkay, setLoginOkay] = useState(null) ;

	// Form fields
	const [formValues, setFormValues] = useState({
		username: "",
		password: ""
	}) ;

	// Handle form field user-input
  const handleChange = (event) => {
		setLoginOkay(null) ;
		const newState = { ...formValues };
    newState[event.target.name] = event.target.value;
    setFormValues(newState);
  } ;

	// Handle form submission
  const submitHandler = (event) => {
    event.preventDefault();
		const loginOkay = props.onSubmit({...formValues}) ;
		if (loginOkay) navigate("/view");
		else setLoginOkay(loginOkay);
  } ;

	// Template
  return (
		<div className="user-login my-max-width-972px m-auto">
			<h1 className="text-center">Login</h1>
			{loginOkay !== false ? <div className="text-center visibility-hidden">&nbsp;</div> : <div className="text-center text-danger">Incorrect username or password</div>}
			
			<Form onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control className='input-shadow'
						name="username"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control className='input-shadow'
						name="password"
						type="password"
						onChange={(event)=>handleChange(event)}  
					/>
				</Form.Group>
				<div className="text-center my-4">
					<Button variant="primary" type="submit">Log in</Button>
				</div>
			</Form>
		</div>
  );
}
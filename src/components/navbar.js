import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

export default function MyNavbar(props) {
	return (
		<div>
			<Navbar bg="light" expand="md">
				<Navbar.Brand>Social Cards</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link className="nav-link" to="/">Login</Link>
						<Link className="nav-link" to="/register">Register</Link>
						<Link className="nav-link" to="/view">View</Link>
						<Link className="nav-link" to="/add">Add</Link>
					</Nav>
					<div className="d-flex">
						<div className="me-4 align-self-center">Logged in as <b>{props.username}</b></div>
						<Button onClick={props.clearData}>Clear Data</Button>
					</div>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

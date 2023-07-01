import Button from "react-bootstrap/Button"
import Table from 'react-bootstrap/Table';

export default function Admin({users, removeUser, clearDB}) {
  const doRemoveUser = (event) => {
    removeUser(event.target.dataset.id);
  }

	// Template
  return (
		<div className="admin my-max-width-972px m-auto">
			<h1 className="text-center">Administration</h1>
			<span className="visibility-hidden">&nbsp;</span>
			<div className="text-center mb-4">
				<Button onClick={clearDB} className='p-3' variant="danger">Clear database</Button>
			</div>
			<h2 className="text-center">Users</h2>
			<Table onClick={doRemoveUser} striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
				{Object.entries(users).map(([userId, user]) => (
					<tr key={userId}>
						<td>{userId}</td>
						<td>{user.username}</td>
						<td>
							<Button variant="danger" data-id={userId} disabled={userId === "0"}>Remove</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		</div>
  );
}
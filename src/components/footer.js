import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import "./footer.css"

export default function App() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      <section className='border-bottom'>
 
					<div className="m-auto logo position-relative">
						<div className="logo-side-text d-none d-lg-block" style={{width: "max-content"}}>Get connected with us on social networks:</div>
          	<img src="images/logo.png" alt="Logo Goes Here" className='logo'/>
					</div>
    
      </section>

      <section className='footer2 mt-4'>
				<div className='text-uppercase fw-bold mt-1 mb-2 text-center'>
					React Social Group Project
				</div>
  
				<div className='text-center footertext1 pb-4'>
					Copyright © 2023&nbsp;
					<a href="https://github.com/JPDevAcc/ReactSocialGroupProject" className='text-reset fw-bold'>
						Contributors
					</a>
				</div>
			</section>
    </MDBFooter>
  );
}
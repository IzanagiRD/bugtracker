import React from 'react';
// import { Link } from 'react-router-dom';

function Footer() {
   return (
      <div className="footer">
         {/* <p>&copy; {new Date().getFullYear()} Bug Tracker. All rights reserved.</p> */}
         <div className='pageFooterBox'>
            <div className='pageFooterDescription'>
               <h2>Bug Tracker</h2>
               {/* <Link to={'/login'}>Login</Link> */}
               <a href='/login'>Login</a>
            </div>
            <div className='pageFooterDescription'>
               <h2>About Bug Tracker</h2>
               {/* <Link to={'/about'}>About Us</Link> */}
               <a href='/about'>About Us</a>
            </div>
            <div className='pageFooterDescription'>
               <h2>Jobs</h2>
               {/* <Link to={'/about'}>Opportunities</Link> */}
               <a href='/about'>Opportunities</a>
            </div>
            <div className='pageFooterDescription'>
               <h2>Apps</h2>
               {/* <Link to={'/dashboard'}>Dashboard</Link> */}
               <a href='/dashboard'>Dashboard</a>
            </div>
            <div className='pageFooterDescription'>
               <h2>Contact Us</h2>
               {/* <Link to={'/contactus'}>Need Assistance? Get in touch and we can help.</Link> */}
               <a href='/contactus'>Need Assistance? Get in touch and we can help.</a>
            </div>
         </div>
         <hr></hr>
         <h4>&copy; {new Date().getFullYear()} Bug Tracker. All rights reserved.</h4>
      </div>
   ); 
}
export default Footer;
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                
                <div className="footer-links">
                    <a href="/" className="footer-link">Home</a>
                    <a href="/contactus" className="footer-link">Contact Us</a>
                    <a href="/about" className="footer-link">About</a>
                </div>

                <div className="social-media">
                    <a href="https://www.facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" />
                    </a>
                    <a href="https://www.twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter-squared.png" alt="Twitter" />
                    </a>
                    <a href="https://www.instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
                    </a>
                </div>
                
                <div className="copyright">
                    &copy; {new Date().getFullYear()} BugTracker. Icons by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>. <br />
                    3D Models: <br />
                    <a href="https://skfb.ly/6QWpW" target="_blank" rel="noopener noreferrer">"A Windy Day" by Loïc Norgeot</a> licensed under
                    <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"> Creative Commons Attribution</a>, <br />
                    <a href="https://skfb.ly/oDPCS" target="_blank" rel="noopener noreferrer">"Modern Office" by dylanheyes</a> licensed under
                    <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"> Creative Commons Attribution</a>.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
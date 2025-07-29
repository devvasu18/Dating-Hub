import React from "react";
import "../styles/Footer.css"; // external CSS

function Footer() {
  return (
    <footer className="footer bg-pink text-white pt-4">
      <div className="container text-center">
        <div className="datehub-logo mb-3">
          <img
            className="footerimg"
            src="/ChatGPT Image Jul 29, 2025, 01_50_54 pM.png"
            alt="DateHub"
            height="40"
            width={80}
          />
          <h5 className="fw-bold mb-3">
          — Where Love Begins</h5>
        </div> 
        <p>Connecting hearts since 2025. Let’s build something special together!</p>

       <div className="social-icons my-3">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://example.com/love" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
    <i className="fas fa-heart"></i>
  </a>
</div>


        <p className="mb-0">&copy; 2025 DateHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

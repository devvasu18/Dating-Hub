import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="bg-light text-dark text-center p-5">
      <h1 className="display-4 fw-bold">Find Your Perfect Match</h1>
      <p className="lead">Join thousands of singles finding love and friendship on DateHub.</p>
      <Link to="/signup" className="btn btn-primary btn-lg mt-3">Get Started</Link>
    </div>
  );
}

export default HeroSection;

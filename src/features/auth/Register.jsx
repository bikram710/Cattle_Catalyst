import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h2>Register</h2>
      {/* Simple placeholder form, real logic will come later */}
      <form>
        <input type="email" placeholder="Email" required /><br />
        <input type="password" placeholder="Password" required /><br />
        <input type="password" placeholder="Confirm Password" required /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Register;

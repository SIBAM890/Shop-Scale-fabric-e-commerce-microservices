import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";    

function Signin(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u)=>u.email===email);

    if(userExists){
      alert("User already exists");
      return;
    }

    const newUser = { name,email,password };

    users.push(newUser);

    localStorage.setItem("users",JSON.stringify(users));

    alert("Signup successful");

    navigate("/login");
  };

  return(
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </form>

    </div>
  )
}

export default Signin;
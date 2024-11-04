import React, { useState, useEffect } from 'react';
import '../CSS/login.css';
import notesCover from '../Images/back.jpg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const validate = () => {
    if (!username || !password) {
      alert("Username / Password Missing!!!");
    } else {
      if (username === "ST1234" && password === "1234" && loginType === "Student") {
        navigate('/Student');
      } else if (username === "IN1234" && password === "1234" && loginType === "Institute") {
        navigate('/Institute');
      } else {
        alert("Wrong Username or Password");
      }
    }
  };

  return (
    <div className="container signInCard center">
      <div className="card setCardWidth">
        <div className="card-image">
          <img src={notesCover} alt="Notes" className="cardImageHeight" />
        </div>
        <div className="signInContainer card-content">
          <h4 className="grey-text card-title">Sign In</h4>
          <form className="signInForm">
            <div className="input-field">
              <i className="material-icons prefix grey-text text-darken-3">fingerprint</i>
              <input
                type="text"
                id="email"
                onChange={(evt) => setUsername(evt.target.value)}
              />
              <label htmlFor="loginID">Login ID</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix grey-text text-darken-3">lock</i>
              <input
                id="password"
                type="password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field row">
              <p className="col s4">
                <label>
                  <input
                    name="dept"
                    type="radio"
                    value="Student"
                    onChange={() => setLoginType("Student")}
                  />
                  <span>Student</span>
                </label>
              </p>
              <p className="col s4">
                <label>
                  <input
                    name="dept"
                    type="radio"
                    value="Institute"
                    onChange={() => setLoginType("Institute")}
                  />
                  <span>Institute</span>
                </label>
              </p>
            </div>
            <div className="input-field center card-action">
              <button
                type="button"
                className="btn grey darken-3"
                onClick={validate}
              >
                Sign In!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

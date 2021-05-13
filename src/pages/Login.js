import React, { useState, useEffect } from 'react';
import './signup.css';

const Login = (props) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (email !== 'tanmay@gmail.com') {
      setEmailError('Email is incorrect');

      setTimeout(() => {
        setEmailError(null);
      }, [2000]);
    }
    if (password !== '123456') {
      setPasswordError('Password is incorrect');
      setTimeout(() => {
        setPasswordError(null);
      }, [2000]);
    }
    if (email !== 'tanmay@gmail.com' || password !== '123456') {
      localStorage.setItem('authenticated', false);
    } else {
      localStorage.setItem('authenticated', true);
      props.history.push('/home');
    }
  };

  // useEffect(() => {
  //   console.log(error);
  // }, [error]);

  return (
    <div className="row min-vh-100 p-0 m-0">
      <div className="col-6 m-auto p-0">
        <div className="card border border-dark">
          <div
            className="card-header font-weight-bold text-center"
            style={{ backgroundColor: '#cb9c18' }}
          >
            LOGIN
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                {emailError !== null && (
                  <div className="text-danger">{emailError}</div>
                )}
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter email"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                {passwordError !== null && (
                  <div className="text-danger">{passwordError}</div>
                )}
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  autoComplete="on"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-block font-weight-bold"
                style={{ backgroundColor: '#cb9c18' }}
              >
                Submit
              </button>
            </form>
            <div className="text-right mt-2">
              <span
                className="signup-btn"
                onClick={() => props.history.push('/signup')}
              >
                Doesn't have an account?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

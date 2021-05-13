import React, { useState, useEffect } from 'react';

const SignUp = (props) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (email !== '' && password !== '' && name !== '') {
      props.history.push('/');
    } else {
      setError('Please fill all details');
      setTimeout(() => {
        setError(null);
      }, [2000]);
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
            SIGNUP
          </div>
          <div className="card-body">
            {error !== null && (
              <div className="text-center text-danger font-weight-bold">
                {error}
              </div>
            )}
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>

                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="Enter Name"
                  autoComplete="on"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

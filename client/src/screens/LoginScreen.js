import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className='form-container'>
      <Meta title='BlogSnippet | Login' />
      <div className='row'>
        <form className='col s12'>
          <h3>LOGIN</h3>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='email'
                type='email'
                className='validate'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='password'
                type='password'
                className='validate'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          <div className='row'>
            <div className='col s12'>
              <button className='btn btn-yellow' onClick={submitHandler}>
                Login
              </button>
            </div>
          </div>
          <span>
            New user? &nbsp;
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              {' '}
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;

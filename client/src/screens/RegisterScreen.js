import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const RegisterScreen = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: loginUserInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo || loginUserInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, loginUserInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(username, email, password));
    }
  };

  return (
    <div className='form-container'>
      <Meta title='BlogSnippet | Register' />
      <div className='row'>
        <form className='col s12'>
          <h3>REGISTER</h3>
          {error && <Message>{error}</Message>}
          {message && <Message>{message}</Message>}
          {loading && <Loader />}

          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='username'
                type='text'
                className='validate'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='username'>Username</label>
            </div>
          </div>

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
            <div className='input-field col s12'>
              <input
                id='confirmPassword'
                type='password'
                className='validate'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <button className='btn btn-yellow' onClick={submitHandler}>
                Register
              </button>
            </div>
          </div>
          <span>
            Have an account? &nbsp;
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              {' '}
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;

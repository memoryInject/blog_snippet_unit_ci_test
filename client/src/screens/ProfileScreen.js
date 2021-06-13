import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { update } from '../actions/userActions';
import {
  USER_LOGIN_SUCCESS,
  USER_UPDATE_CLEAR,
} from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [refresh, setRefresh] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, user } = userUpdate;

  const buttonRef = useRef(null);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=/profile');
    } else {
      if (user === null && refresh) {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
      }
    }

    if (user) {
      M.toast({
        html: `User profile updated: ${user.username}`,
        completeCallback: function () {
          buttonRef.current.removeAttribute('disabled');
          const data = { ...user };

          dispatch({ type: USER_UPDATE_CLEAR });

          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
          });
        },
        displayLength: 1500,
      });
    }

    if (error) {
      buttonRef.current.removeAttribute('disabled');
    }

    // Using a setTimeout will fix Labels overlapping prefilled content in Materialize.
    // Also add className='active' to labels
    const timerId = setTimeout(() => M.updateTextFields(), 0);
    return () => clearTimeout(timerId);
  }, [history, userInfo, user, dispatch, error, refresh]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(update({ email, password, username }));
      buttonRef.current.setAttribute('disabled', 'true');
      setRefresh(false);
    }
  };

  return (
    <div className='form-container'>
      <div className='row'>
        <form className='col s12'>
          <h3>UPDATE PROFILE</h3>
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
              <label htmlFor='username' className='active'>
                Username
              </label>
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
              <label htmlFor='email' className='active'>
                Email
              </label>
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
              <button
                className='btn btn-yellow'
                onClick={submitHandler}
                ref={buttonRef}
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;

import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import M from 'materialize-css';

import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [hover, setHover] = useState(true);
  const elems = useRef(null);
  const dropDown = useRef(null);
  useEffect(() => {
    if (hover === true) {
      setHover(false);
    }
    M.Sidenav.init(elems.current);
    if (userInfo) {
      // For dropdown menu
      M.Dropdown.init(dropDown.current);

      // For testing
      // const instance = M.Dropdown.init(dropDown.current);
      // instance.open()
    }
  }, [hover, elems, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className='nav-color nav-extended'>
        <div className='container'>
          <div className='nav-wrapper'>
            <Link
              to='/'
              className='brand-logo'
              style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              BLOG SNIPPET
            </Link>
            <Link to='#!' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </Link>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
              <li>
                <NavLink
                  style={{ display: userInfo ? 'block' : 'none' }}
                  to='/myblogs'
                  activeStyle={{
                    fontWeight: 'bold',
                    backgroundColor: '#002b36',
                  }}
                >
                  <span
                    className='material-icons'
                    style={{ position: 'relative', top: '6px' }}
                  >
                    article
                  </span>{' '}
                  My Blogs
                </NavLink>
              </li>
              {userInfo ? (
                <li>
                  <a
                    className='dropdown-trigger'
                    href='#!'
                    data-target='dropdown1'
                    ref={dropDown}
                  >
                    {userInfo.username}
                    <i
                      className='material-icons right'
                      style={{ position: 'relative', top: '1px' }}
                    >
                      arrow_drop_down
                    </i>
                  </a>
                </li>
              ) : (
                <li>
                  <NavLink
                    to='/login'
                    activeStyle={{
                      fontWeight: 'bold',
                      backgroundColor: '#002b36',
                    }}
                  >
                    <span
                      className='material-icons'
                      style={{ position: 'relative', top: '6px' }}
                    >
                      person
                    </span>{' '}
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Dorpdown structure */}
      <ul id='dropdown1' className='dropdown-content'>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className='divider'></li>
        <li>
          <a href='#!' onClick={logoutHandler}>
            Logout
          </a>
        </li>
      </ul>

      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {userInfo ? (
          <>
            <li>
              <Link to='/myblogs'>My Blogs</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <a href='#!' onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Header;

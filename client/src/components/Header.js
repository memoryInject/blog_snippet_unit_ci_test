import { useRef, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import M from 'materialize-css';
const Header = () => {
  const [hover, setHover] = useState(true);
  const elems = useRef(null);
  useEffect(() => {
    if (hover === true) {
      setHover(false);
    }
    M.Sidenav.init(elems.current);
  }, [hover]);

  return (
    <>
      <nav className='deep-purple darken-2 nav-extended'>
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
                  to='/myblogs'
                  activeStyle={{
                    fontWeight: 'bold',
                    backgroundColor: '#4527a0',
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
              <li>
                <NavLink
                  to='/login'
                  activeStyle={{
                    fontWeight: 'bold',
                    backgroundColor: '#4527a0',
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
            </ul>
          </div>
        </div>
      </nav>

      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/myblogs'>My Blogs</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;

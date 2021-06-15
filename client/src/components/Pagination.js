import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ page, pages, path = '' }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <ul className='pagination'>
        <li
          className={
            page === 1 ? 'disabled-arrow' : 'enabled-arrow wave-effect'
          }
        >
          {page === 1 ? (
            <i className='material-icons'>chevron_left</i>
          ) : (
            <Link to={`${path}/page/${page - 1}`}>
              <i className='material-icons'>chevron_left</i>
            </Link>
          )}
        </li>
        {[...Array(pages).keys()].map((x) => (
          <li
            className={
              x + 1 === page ? 'active-page' : 'inactive-page waves-effect'
            }
            key={x}
          >
            <Link to={`${path}/page/${x + 1}`}>{x + 1}</Link>
          </li>
        ))}

        <li
          className={
            page === pages ? 'disabled-arrow' : 'enabled-arrow wave-effect'
          }
        >
          {page === pages ? (
            <i className='material-icons'>chevron_right</i>
          ) : (
            <Link to={`${path}/page/${page + 1}`}>
              <i className='material-icons'>chevron_right</i>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const BackBtn = ({ redirect }) => {
  const backBtn = useRef(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      backBtn.current.classList.remove('pulse');
    }, 0);
    return () => clearTimeout(timerId);
  }, [backBtn]);

  return (
    <div className='fixed-action-btn float-left'>
      <Link
        to={redirect}
        className='btn-floating waves-effect waves-light btn-back btn-large pulse'
        title='Go back'
        ref={backBtn}
      >
        <i className='large material-icons' style={{ top: '0px' }}>
          arrow_back
        </i>
      </Link>
    </div>
  );
};

export default BackBtn;

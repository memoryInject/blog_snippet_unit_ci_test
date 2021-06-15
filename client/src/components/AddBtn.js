import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const AddBtn = ({ path }) => {
  const addBtn = useRef(null);
  useEffect(() => {
    const timerId = setTimeout(() => {
      addBtn.current.classList.remove('pulse');
    }, 0);
    return () => clearTimeout(timerId);
  }, [addBtn]);
  return (
    <div className='fixed-action-btn'>
      <Link
        to={`/create?redirect=${path}`}
        className='btn-floating btn-yellow btn-large darken-1 pulse'
        title='Add new blog'
        ref={addBtn}
      >
        <i className='large material-icons' style={{ top: '0px' }}>
          add
        </i>
      </Link>
    </div>
  );
};

export default AddBtn;

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddBtn = ({ path }) => {
  const [hover, setHover] = useState(true);
  const elems = useRef(null);
  useEffect(() => {
    if (hover === true) {
      setHover(false);
    }
  }, [hover]);

  return (
    <div ref={elems} className='fixed-action-btn'>
      <Link
        to={`/create?redirect=${path}`}
        className='btn-floating btn-yellow btn-large darken-1'
        title='Add new blog'
      >
        <i className='large material-icons' style={{ top: '0px' }}>
          add
        </i>
      </Link>
    </div>
  );
};

export default AddBtn;

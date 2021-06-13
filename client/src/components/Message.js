import React from 'react';

const Message = ({ type, children }) => {
  const getIcon = type === 'green' ? 'check_circle' : 'report_problem';

  return (
    <div className={`alert card ${type} darken-4 white-text`}>
      <div className='card-content'>
        <p>
          <i className='material-icons'>{getIcon}</i>
          <span>{children}</span>
        </p>
      </div>
    </div>
  );
};

Message.defaultProps = {
  type: 'red',
};

export default Message;

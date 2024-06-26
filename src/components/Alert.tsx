import React from 'react';

type AlertProps = {
  message: string;
  promptLogin: boolean;
};

const Alert: React.FC<AlertProps> = ({ message, promptLogin }) => {
  return (
    <div className='absolute left-1/2 -translate-x-1/2 top-3 bg-primary p-1 px-3 rounded-full w-max'>
      <p>
        {message}
        {promptLogin && (
          <span>
            {' '}
            Click&nbsp;
            <a
              className='font-bold hover:cursor-pointer underline-offset-1 underline'
              href='/popup.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              here
            </a>
            &nbsp;to login.
          </span>
        )}
      </p>
    </div>
  );
};

export default Alert;

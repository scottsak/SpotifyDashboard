import React from 'react';

type AlertProps = {
  message: string,
  promptLogin: boolean
};

const Alert: React.FC<AlertProps> = (props) => {
  const { message, promptLogin } = props || {};
  return (
    <div className='absolute left-1/2 -translate-x-1/2 top-3 bg-primary p-1 px-3 rounded-full w-max'>
      <p>
        {message}
        {promptLogin && <span> Click&nbsp;
          <span
            className='font-bold hover:cursor-pointer underline-offset-1 underline'
            onClick={() => chrome.tabs.create({ url: "popup.html" })}>
            here
          </span>
          &nbsp;to login.
        </span>}
      </p>
    </div>
  );
};

export default Alert;

import React, { useEffect, useState, useRef } from 'react';
import useTime from '../../../hooks/useTime';
import useUserPreferredName from '../../../hooks/useUserPreferredName';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { PencilIcon } from '@heroicons/react/24/outline';

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const { formattedTime, formattedDate, timeFrame } = useTime();
  const { name, setName } = useUserPreferredName();
  const contentRef = useRef<HTMLSpanElement>(null);
  const [editText, setEditText] = useState<string>('');
  const [nameHovered, setNameHovered] = useState<boolean>(false);

  useEffect(() => {
    setEditText(name);
  }, [name]);

  const sanitize = (input: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    return plainText.replace(/[^a-zA-Z0-9 ]/g, '');
  };

  const handleEditName = (event: ContentEditableEvent) => {
    const text = event.target.value;
    const sanitized = sanitize(text);
    setEditText(sanitized);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.currentTarget as HTMLElement).blur();
    }
  };

  const handleNewName = () => {
    const maybeNewName = contentRef.current?.textContent || '';
    const sanitized = sanitize(maybeNewName);
    if (sanitized.length) {
      setName(maybeNewName);
    } else {
      setEditText(name);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-full select-none'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-3xl'>{formattedDate}</p>
        <p className='text-8xl'>{formattedTime}</p>
        <p className='text-3xl mt-5'>
          Good {timeFrame},{' '}
          <span className='relative'>
            <ContentEditable
              html={editText}
              innerRef={contentRef}
              disabled={false}
              onChange={handleEditName}
              tagName='span'
              onBlur={handleNewName}
              onKeyDown={handleKeyPress}
              onMouseEnter={() => setNameHovered(true)}
              onMouseLeave={() => setNameHovered(false)}
              aria-label='Edit name'
            />
            {nameHovered && (
              <span className='absolute -top-2 -right-5'>
                <PencilIcon className='w-4 h-4' />
              </span>
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DefaultLayout;

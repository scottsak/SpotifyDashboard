import React, { useEffect, useState, useRef } from 'react';
import useUserPreferredName from '../../../hooks/useUserPreferredName';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { PencilIcon } from '@heroicons/react/24/outline';

interface EditableNameProps {}

const EditableName: React.FC<EditableNameProps> = () => {
  const { name, setName } = useUserPreferredName();
  const contentRef = useRef<HTMLSpanElement>(null);
  const [editText, setEditText] = useState<string>(' ');
  const [nameHovered, setNameHovered] = useState<boolean>(false);

  useEffect(() => {
    setEditText(name);
  }, [name]);

  const sanitize = (toSanitize: string): string => {
    const sanitized = toSanitize.replace(/<\/[^>]+(>|$)/g, '');
    return sanitized.length ? sanitized : '';
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
    const sanitized = sanitize(maybeNewName).trim();
    if (sanitized.length) {
      setName(sanitized);
    } else {
      setEditText(name);
    }
  };

  return (
    <>
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
    </>
  );
};

export default EditableName;

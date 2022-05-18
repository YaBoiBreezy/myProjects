import React from 'react';
import '../../style.css';

export interface KeyboardKeyProps extends React.HTMLAttributes<HTMLElement> {
  /** the key being displayed */
  keyValue?: string;
  /** optional hidden description of key, for screen readers */
  description?: string;
}

const KeyboardKey = ({ keyValue = '', description = '' }: KeyboardKeyProps) => {
  const ret =
    keyValue === '' ? null : description === '' ? (
      <p>
        Press <kbd>{keyValue}</kbd>
      </p>
    ) : (
      <p>
        Press{' '}
        <kbd>
          <abbr title={description}>{keyValue}</abbr>
        </kbd>
      </p>
    );
  return ret;
};

export default KeyboardKey;

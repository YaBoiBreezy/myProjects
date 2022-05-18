import React from 'react';
import '../../style.css';

type headingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  /** size of heading */
  size?: headingType;
  /** Contents of Heading */
  children?: React.ReactNode;
  /** heading text */
  text?: string;
  /** Use to create lighter, secondary text in any heading */
  secondaryText?: string;
  /** Use to add an underline to a heading */
  underline?: boolean;
}

const Heading = ({
  size = 'h1',
  secondaryText = '',
  underline = false,
  text = '',
}: HeadingProps) => {
  const underlineString = underline ? 'page-header' : '';
  return secondaryText === '' ? (
    size === 'h1' ? (
      <h1 className={underlineString}>{text}</h1>
    ) : size === 'h2' ? (
      <h2 className={underlineString}>{text}</h2>
    ) : size === 'h3' ? (
      <h3 className={underlineString}>{text}</h3>
    ) : size === 'h4' ? (
      <h4 className={underlineString}>{text}</h4>
    ) : size === 'h5' ? (
      <h5 className={underlineString}>{text}</h5>
    ) : size === 'h6' ? (
      <h6 className={underlineString}>{text}</h6>
    ) : (
      <p>ERROR: no size given for this header</p>
    )
  ) : size === 'h1' ? (
    <h1 className={underlineString}>
      {text}
      {' – '}
      <span className="small">{secondaryText}</span>
    </h1>
  ) : size === 'h2' ? (
    <h2 className={underlineString}>
      {text}
      {' – '}
      <span className="small">{secondaryText}</span>
    </h2>
  ) : size === 'h3' ? (
    <h3 className={underlineString}>
      {text}
      {' – '}
      <span className="small">{secondaryText}</span>
    </h3>
  ) : size === 'h4' ? (
    <h4 className={underlineString}>
      {text}
      {' – '}
      <span className="small">{secondaryText}</span>
    </h4>
  ) : size === 'h5' ? (
    <h5 className={underlineString}>
      {text}
      {' – '}
      <span className="small">{secondaryText}</span>
    </h5>
  ) : size === 'h6' ? (
    <h6 className={underlineString}>
      {text}
      {' – '}
      <span className="small">{secondaryText}</span>
    </h6>
  ) : (
    <p>ERROR: no size given for this header</p>
  );
};
Heading.displayName = 'Heading';

export default Heading;

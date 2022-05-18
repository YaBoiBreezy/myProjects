import React from 'react';
import '../../../style.css';

export interface FootnoteProps extends React.HTMLAttributes<HTMLElement> {
  /** What footnote it links to */
  value?: string;
  /** The content of the Footer */
  children?: React.ReactNode;
}

const Footnote = ({ value = '', children }: FootnoteProps) => {
  const footnoteId = `fn${value}-rf`;
  return (
    <span>
      <dt>Footnote {value}</dt>
      <dd id={footnoteId}>
        {children}
        <p className="fn-rtn">
          <a href={footnoteId}>
            <span className="wb-inv">
              Return to <span>first</span> footnote
            </span>
            {value}
            <span className="wb-inv"> referrer</span>
          </a>
        </p>
      </dd>
    </span>
  );
};

export default Footnote;

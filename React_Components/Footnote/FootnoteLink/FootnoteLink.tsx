import React from 'react';
import '../../../style.css';

export interface FootnoteLinkProps extends React.HTMLAttributes<HTMLElement> {
  /** What footnoteSection it links to */
  value?: string;
  /** If multiple links go to the same footer, use this to differentiate */
  subValue?: number;
  /** Optional: Name of footnoteLink, for display to user */
  indicator?: string;
}

const FootnoteLink = ({
  value = '',
  subValue = 0,
  indicator = '',
}: FootnoteLinkProps) => {
  const footnoteId =
    subValue === 0 ? `fn${value}-rf` : `fn${value}-${subValue}-rf`;
  const footnoteHref = `#fn${value}`;
  const footnoteName = indicator === '' ? value : indicator;
  return value === '' ? (
    <a href="#fn">Footnotes</a>
  ) : (
    <sup id={footnoteId}>
      <a className="fn-lnk" href={footnoteHref}>
        <span className="wb-inv">Footnote </span>
        {footnoteName}
      </a>
    </sup>
  );
};

export default FootnoteLink;

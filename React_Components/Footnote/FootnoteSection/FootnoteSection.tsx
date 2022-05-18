import React from 'react';
import '../../../style.css';

export interface FootnoteSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Footnotes in this section */
  children?: React.ReactNode;
}

const FootnoteSection = ({ children }: FootnoteSectionProps) => (
  <aside className="wb-fnote" role="note">
    <h2 id="fn">Footnotes</h2>
    <dl>{children}</dl>
  </aside>
);

export default FootnoteSection;

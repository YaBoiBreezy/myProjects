import React from 'react';
import '../../style.css';

export interface DetailSummaryProps {
  /** the title of the expandable menu */
  title?: string;
  /** the contents of the DetailSummary */
  children?: React.ReactNode;
}

const DetailSummary = ({ title = '', children }: DetailSummaryProps) => (
  <details>
    <summary>{title}</summary>
    {children}
  </details>
);

export default DetailSummary;

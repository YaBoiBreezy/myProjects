import React from 'react';
import '../../style.css';

export interface QuotationProps extends React.HTMLAttributes<HTMLElement> {
  /** Contents of Quotation */
  children?: React.ReactNode;
  /** reversequote makes the quote right-aligned */
  reverseQuote?: boolean;
  /** reversesource makes the footer and cite right-aligned */
  reverseSource?: boolean;
  /** footer is the author's name */
  footer?: string;
  /** cite is the source title */
  cite?: string;
}

const Quotation = ({
  reverseQuote = false,
  reverseSource = false,
  footer = '',
  cite = '',
  children,
}: QuotationProps) => {
  const reverseQuoteString = reverseQuote ? 'blockquote-reverse' : '';
  const reverseFooterString = reverseSource ? 'text-right' : '';
  const footerHandle = footer === '' ? '' : '--';
  const fullFooterString =
    footer === '' && cite === '' ? (
      ''
    ) : (
      <footer className={reverseFooterString}>
        {footerHandle}
        {footer}
        {footer === '' ? '' : <br />}
        <cite>{cite}</cite>
      </footer>
    );
  return (
    <span className={`blockquote ${reverseQuoteString}`}>
      <p>{children}</p>
      {fullFooterString}
    </span>
  );
};
Quotation.displayName = 'Quotation';

export default Quotation;

import React from 'react';
import '../../style.css';

export interface PaginationButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Is button in active state */
  active?: boolean;
  /** Is button in disabled state */
  disabled?: boolean;
  /** Value associated to the button */
  value?: string;
  /** Onclick action */
  onClick?: React.MouseEventHandler;
}

function innerValue(value: string) {
    if (value === 'next') { return 'Next' }
    if (value === 'prev') { return 'Previous' }
    return (<span>{value} <span className="wb-inv">Go to Page {value} </span></span>);
}

const PaginationButton = ({
    children,
    active = false, 
    disabled = false,
    value = 'nil'
}: PaginationButtonProps) => (
    <li className={ active? 'active': disabled ? 'disabled' : '' }>
        <a href="#" rel={(value === 'next') ? 'next' : value === 'prev' ? 'prev' : ''}>
            {innerValue(value)}
            {children}
    </a></li>
);
PaginationButton.displayName = 'PaginationButton';

export default PaginationButton;
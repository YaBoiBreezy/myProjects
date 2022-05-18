import React from 'react';
import '../../style.css';

export interface SecondaryMenuProps {
  /** the title of the SecondaryMenu */
  title?: string;
  /** the contents of the SecondaryMenu */
  children?: React.ReactNode;
}

const SecondaryMenu = ({ title = '', children }: SecondaryMenuProps) => (
  <nav
    role="navigation"
    id="wb-sec"
    typeof="SiteNavigationElement"
    className="visible-md visible-lg"
  >
    <h2>Section menu</h2>
    <ul className="list-group menu list-unstyled">
      <li>
        <h3 className="wb-navcurr">{title}</h3>
        <ul className="list-group menu list-unstyled">{children}</ul>
      </li>
    </ul>
  </nav>
);

export default SecondaryMenu;

import React from 'react';
import '../../style.css';

export interface SecondaryMenuItemProps {
  /** the title of the SecondaryMenuItem */
  title?: string;
  /** the HREF link of the SecondaryMenuItem */
  link?: string;
}

const SecondaryMenuItem = ({
  title = '',
  link = '#a',
}: SecondaryMenuItemProps) => (
  <li>
    <a className="list-group-item" href={link}>
      {title}
    </a>
  </li>
);

export default SecondaryMenuItem;

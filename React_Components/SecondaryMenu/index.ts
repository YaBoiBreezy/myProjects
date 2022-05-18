import OriginSecondaryMenu from './SecondaryMenu';
import SecondaryMenuItem from './SecondaryMenuItem';

export type SecondaryMenuProps = typeof OriginSecondaryMenu & {
  Item: typeof SecondaryMenuItem;
};

const SecondaryMenu = OriginSecondaryMenu as SecondaryMenuProps;

SecondaryMenu.Item = SecondaryMenuItem;

export default SecondaryMenu;

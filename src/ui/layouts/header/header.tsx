import * as React from 'react';

import * as s from './header.style';

type Props = {
  trigger?: React.ReactNode,
};

const Header: React.FC<Props> = ({ trigger }) => (
  <s.HeaderBody>
    {trigger}
  </s.HeaderBody>
);


export default Header;

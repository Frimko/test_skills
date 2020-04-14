import * as React from 'react';

import SidePanel from '../sidePanel';
import Header from '../header';

import * as s from './layout.style';

const Menu = () => (
  <div>
    222
  </div>
);
type Props = {
  children?: React.ReactNode,
};

const Layout: React.FC<Props> = ({ children }) => (
  <s.ContainerBody>
    <SidePanel sidePanel={<Menu />} />
    <s.ContainerPage>
      <Header />
      <s.ContentWrapper>
        <s.Content>
          {children}
        </s.Content>
      </s.ContentWrapper>
    </s.ContainerPage>
  </s.ContainerBody>
);


export default Layout;

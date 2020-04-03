import * as React from 'react';

import * as s from './sidePanel.style';

type Props = {
  sidePanel: React.ReactNode,
  children?: React.ReactNode,
  hiddenTitle?: boolean,
  scroll?: boolean,
};

const SidePanel: React.FC<Props> = ({
  sidePanel,
  children,
  hiddenTitle,
  scroll,
}) => (
  <s.Wrapper>
    <s.SidePanel>
      {
        !!hiddenTitle
        && <s.ScreenReaderHeading>{hiddenTitle}</s.ScreenReaderHeading>
      }
      {sidePanel}
    </s.SidePanel>
    <s.Main scroll={!!scroll}>{children}</s.Main>
  </s.Wrapper>
);

export default SidePanel;

import * as React from 'react';
import { Helmet } from 'react-helmet';

import * as s from './page.style';

type Props = {
  title?: string,
  children?: React.ReactNode,
};

const Page: React.FC<Props> = ({
  title,
  children,
}) => (
  <s.WrapBody>
    <s.PageBody>
      <Helmet title={title} />
      <s.Content>
        <h3>{title}</h3>
        {children}
      </s.Content>
    </s.PageBody>
  </s.WrapBody>
);

export default Page;

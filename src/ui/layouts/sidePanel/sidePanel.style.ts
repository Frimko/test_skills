import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #191c20;
  font-weight: normal;
  padding: 0;
  width: 256px;
`;

export const SidePanel = styled.aside`
  position: relative;
  z-index: 12;
  width: 256px;
  flex-shrink: 0;
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, .1);
  overflow-y: auto;
`;

// language=SCSS prefix=dummy{ suffix=}
export const Main = styled.div<{ scroll: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  ${props => props.scroll && 'overflow-y: scroll;'}
`;

// ${hidden}
export const ScreenReaderHeading = styled.h2`

`;

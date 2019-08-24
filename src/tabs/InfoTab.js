import React from 'react';
import styled from 'styled-components';

import Text from '../components/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 15px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Content = styled(Text)`
  font-size: 2em;
`

const Link = styled.a`
  color: rgba(255, 255, 255, .6);
  text-decoration: underline;
`

const InfoTab = () => {
  return (
    <Container>
      <Content>
        This Tab isn't supported on mobile yet please join the <Link href='https://discord.gg/a5qSfxv'>discord</Link> or open a issue on <Link href='https://github.com/KingCosmic/BardsBallad'>github</Link> to push it higher on the priority list.
      </Content>
    </Container>
  )
}

export default InfoTab;
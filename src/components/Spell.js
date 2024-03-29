import React from 'react';
import styled, { css } from 'styled-components';

import T from './Text';
import Clamp from './Clamp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;

  ${props => (Math.abs(props.index % 2) === 1) && css`
    background-color: rgba(0, 0, 0, .17);
  `}
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Header = styled(T)`
  font-size: 1.2em;
`

const Text = styled(T)`
  font-size: 1.1em;
`

const SubText = styled(Text)`
  color: rgba(255, 255, 255, .6);
`

const Spell = ({ item, name, school, source, casttime, ritual, concentration, range, verbal, somatic, material, id, onClick, index }) => (
  <Container index={index} key={id} onClick={() => onClick(item)}>
    <InnerContainer>
      <Header>{name}</Header>
      <Header color='gold'>{source || 'CUSTOM'}</Header>
    </InnerContainer>
    <InnerContainer>
      <Clamp text={`${verbal ? 'V,' : ''} ${somatic ? 'S,' : ''} ${material ? `M (${material})` : ''}`} component={SubText} lines={1} />
      <Clamp text={`${casttime}, ${range}`} component={Text} lines={1} />
    </InnerContainer>
  </Container>
)

export default Spell;
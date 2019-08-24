import React from 'react';
import styled, { css } from 'styled-components';

import Text from './Text';

import { itemTypes } from '../data/constants';

const Container = styled.div`
  display: flex;
  width: calc(100% - 12px);
  padding: 5px;

  justify-content: space-between;
  align-items: center;

  flex-direction: row;

  ${props => (Math.abs(props.index % 2) === 1) && css`
    background-color: rgba(0, 0, 0, .17);
  `}
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
`

const SideText = styled(Text)`
  margin-left: 6px;
`

const Category = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis; 
  color: rgba(255, 255, 255, .6);
`

const Item = ({ index, id, name, quantity, category, weight, value, onClick }) => {
  return (
    <Container onClick={onClick} key={id} index={index}>
      <LeftSection>
        <Text size='0.9em'>{name} {quantity > 1 ? `x${quantity}` : ''}</Text>
        <Category size='0.8em'>{itemTypes[category]}</Category>
      </LeftSection>

      <RightSection>
        <SideText>{weight} lb</SideText>
        <SideText>{value}</SideText>
      </RightSection>
    </Container>
  )
}

export default Item;
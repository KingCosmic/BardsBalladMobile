import React from 'react';
import styled from 'styled-components';

import Text from './Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 5px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid ${props => props.theme.gold};
  background-color: ${props => props.hcolor ? props.theme[props.hcolor] : props.theme.light};
`

const HeaderText = styled(Text)`
  color: ${props => props.theme.gold};
  font-size: 1.4em;
`

const ListSection = ({ title, Component, filter = () => true, data, headerColor, HeaderExtra = () => null, onClick = () => {} }) => {
  const filterdData = data.filter(filter);

  if (filterdData.length === 0) return null;

  return (
    <Container margin='0 5px 5px'>
      <Header hcolor={headerColor}>
        <HeaderText>{title}</HeaderText>
        <HeaderExtra />
      </Header>
      <div>
        {
          filterdData.map((item, i) => {
            return (
              <Component item={item} {...item} index={i} key={item.id} onClick={() => onClick(item)} />
            )
          })
        }
      </div>
    </Container>
  )
}

export default ListSection;
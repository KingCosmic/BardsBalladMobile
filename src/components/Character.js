import React from 'react';
import styled from 'styled-components';

import { Link as L } from 'react-router-dom';
import Text from './Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5px;
  width: 90%;
  margin: 10px
  border-radius: 5px;
  height: 150px;
  background: url('https://cdn.discordapp.com/attachments/391809595473002496/579335189331836939/233.png');
  background-size: cover;
  background-repeat: no-repeat;
`

const Link = styled(L)`
  text-decoration: none;
`

const Character = (props) => {
  const { name, job, lvl, id } = props;

  return (
    <Container>
      <Link to={`/characters/${id}`}>
        <Text>{name}</Text><Text>{job}: {lvl}</Text>
      </Link>
    </Container>
  )
}

export default Character;
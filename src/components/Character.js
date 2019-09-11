import React from 'react';
import styled from 'styled-components';

import { Link as L } from 'react-router-dom';
import Text from './Text';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5px;
  width: 90%;
  margin: 10px
  border-radius: 5px;
  height: 180px;
  background: url('https://cdn.discordapp.com/attachments/391809595473002496/579335189331836939/233.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Link = styled(L)`
  text-decoration: none;
`

const OptionsButton = styled(Text)`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2em;
`

const Character = (props) => {
  const { name, job, lvl, id } = props;

  return (
    <Container>
      <OptionsButton>?</OptionsButton>

      <Link to={`/characters/${id}`}>
        <Text>{name}</Text><Text>{job}: {lvl}</Text>
      </Link>
    </Container>
  )
}

export default Character;
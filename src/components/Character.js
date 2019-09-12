import React from 'react';
import styled from 'styled-components';

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

const OptionsButton = styled(Text)`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2em;
`

const Character = (props) => {
  const { name, job, lvl, id, history } = props;

  return (
    <Container onClick={() => history.replace(`/characters/${id}`)}>
      <OptionsButton>?</OptionsButton>

      <Text>{name}</Text><Text>{job}: {lvl}</Text>
    </Container>
  )
}

export default Character;
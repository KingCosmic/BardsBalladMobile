import React, { Component } from 'react';
import styled from 'styled-components';

import T from './Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  align-items: center;
  width: 33.33%;
  border: 2px solid ${props => props.theme.almostblack};
`

const Text = styled(T)`
  font-size: 1.5em;
`

class PassivePerception extends Component {
  constructor(props) {
    super(props);

    this.editStat = this.editStat.bind(this)
  }

  editStat() {
    const { path, syncData, characterID, value } = this.props;

    const newValue = Number(prompt('Edit Passive Perception', value))

    if (newValue === value) return;

    syncData(
      characterID,
      {
        [path]: newValue
      }
    )
  }

  render() {
    const { value } = this.props;

    return (
      <Container onClick={this.editStat}>
        <Text color='gold'>PP</Text>

        <Text>{value}</Text>
      </Container>
    )
  }
}

export default PassivePerception;
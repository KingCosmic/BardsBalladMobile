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

class Proficiency extends Component {
  constructor(props) {
    super(props);

    this.editStat = this.editStat.bind(this)
  }

  editStat() {
    const { name, path, syncData, characterID, value } = this.props;

    const newValue = prompt(`Edit ${name}`, value)

    if (newValue === value) return;

    syncData(
      characterID,
      {
        [path]: newValue
      }
    )
  }

  render() {
    const { name, value } = this.props;

    return (
      <Container onClick={this.editStat}>
        <Text color='gold'>{name}</Text>

        <Text>+{value}</Text>
      </Container>
    )
  }
}

export default Proficiency;
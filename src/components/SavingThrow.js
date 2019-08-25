import React, { Component } from 'react';
import styled from 'styled-components';

import T from './Text';

import { determinMod } from '../helpers'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 5px;
  width: 100%;
`

const CheckBox = styled.div`
  height: ${props => props.size || '1em'};
  width: ${props => props.size || '1em'};
  background-color: ${props => props.checked ? props.theme[props.color || 'green'] || props.color : props.theme.grey};
  margin-right: 5px;
`

const Text = styled(T)`
  font-size: 1.5em;
  padding: 0 5px;
`

const Value = styled(Text)`
  text-decoration: underline ${props => props.theme.grey};
  margin-right: 5px;
`

class SavingThrow extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { characterID, syncData, throws, skill } = this.props;

    syncData(
      characterID,
      {
        [`savingThrows.${skill}`]: !throws[skill]
      }
    )
  }

  render() {
    const { throws, skill, stats, prof } = this.props;

    const efficient = throws[skill]
    const mod = determinMod(stats[skill]);

    return (
      <Container>
        <CheckBox size='1.8em' onClick={this.handleChange} checked={efficient} />

        <Value>
          {
            (efficient ? mod + prof : mod) < 0 ? 
              (efficient ? mod + prof : mod) :
              `+${(efficient ? mod + prof : mod) }`
          }
          </Value>

        <Text>{skill}</Text>
      </Container>
    )
  }
}

export default SavingThrow;
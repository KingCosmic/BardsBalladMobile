import React, { Component } from 'react';
import styled from 'styled-components';

import T from './Text';

import EditExperience from '../modals/SideInfo/Experience';

import levels from '../data/levels';

const getMaxExp = (exp) => levels[Object.keys(levels).find(lvl => exp < levels[lvl].exp)].exp

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 1.7em;

  background-color: ${props => props.theme.middleblack};
  border-left: 2px;
  border-right: 2px;
  border-style: solid;
  border-color: ${props => props.theme.almostblack};
`

const BarFiller = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  width: ${props => `${props.value}%`};

  background-color: ${props => props.theme[props.color] || props.theme.text};
`

const Text = styled(T)`
  z-index: 50;
  color: rgb(255, 255, 255, .8);
`

const determinPercent = (current, max, temp = 0, isTemp = true) => ((current + ((isTemp) ? temp : 0)) / (max + temp)) * 100;

class EXP extends Component {
  constructor(props) {
    super(props);

    this.editEXP = this.editEXP.bind(this);
  }

  editEXP() {
    const { openModal, closeModal } = this.props;

    openModal({
      id: 'expeditmodal',
      type: 'custom',
      content: <EditExperience {...this.props} requestClose={() => closeModal({ id: 'expeditmodal' })} />
    })
  }

  render() {
    const { current } = this.props;

    const max = getMaxExp(current)

    const expRender = determinPercent(current, max);

    return (
      <BarContainer onClick={this.editEXP}>
        <Text>EXP: {current}/{max}</Text>
        <BarFiller value={expRender} color='gold' />
      </BarContainer>
    )
  }
}

export default EXP;
import React, { Component } from 'react';
import styled from 'styled-components';

import T from './Text';

import EditHealth from '../modals/SideInfo/Health';

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
  color: ${props => props.theme.text};
  opacity: .8;
`

const determinPercent = (current, max, temp = 0, isTemp = true) => ((current + ((isTemp) ? temp : 0)) / (max + temp)) * 100;

class HP extends Component {
  constructor(props) {
    super(props);

    this.editHP = this.editHP.bind(this);
  }

  editHP() {
    const { openModal, closeModal } = this.props;

    openModal({
      id: 'hpeditmodal',
      type: 'custom',
      content: <EditHealth {...this.props} requestClose={() => closeModal({ id: 'hpeditmodal' })} />
    })
  }

  render() {
    const { current, max, temp } = this.props;

    const tempRender = determinPercent(current, max, temp);
    const hpRender = determinPercent(current, max, temp, false);

    return (
      <BarContainer onClick={this.editHP}>
        <Text>HP: {current}/{max} {(temp) ? ` (+${temp})` : ''}</Text>
        <BarFiller value={tempRender} color='blue' />
        <BarFiller value={hpRender} color='green' />
      </BarContainer>
    )
  }
}

export default HP;
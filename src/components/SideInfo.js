import React from 'react';
import styled from 'styled-components';

import Name from './CharacterName';
import Class from './CharacterClass';
import HP from './HP';
import EXP from './EXP';
import ArmorClass from './ArmorClass';
import Speed from './Speed';
import Initiative from './Initiative';
import Proficiency from './Proficiency';
import PassivePerception from './PassivePerception';
import HitDice from './HitDice';
import Stat from './Stat';

const Container = styled.div`
  transition: 0.5s;
  position: fixed;
  z-index: 50;
  top: 0;
  right: 0;
  width: 85%;
  height: 100%;
  overflow-y: auto;
  background-color: ${props => props.theme.dark};
  border-left: 1px solid ${props => props.theme.almostblack};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (device-aspect-ratio: 40/71) {
    width: 100%;
  }

  right: ${props => props.isOpen ? '0' : '-100%'};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const TopRow = styled(Row)`
  width: 100%;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuItem = styled.a`
  padding: 10px 15px;
  text-decoration: none;
  font-size: 2.3em;
  color: ${props => props.theme.text};
  display: block;
`

const CloseButton = styled(MenuItem)`
  font-size: 3em;
`

const SideInfo = (props) => {
  const { open, requestClose, char, syncData, openModal, closeModal } = props;
  const { name, job, hp: { current, max, temp }, exp, stats, ac, speed, initiative, proficiency, passivePerception, hitdice } = char;

  const extraProps = { syncData, characterID: char._id, openModal, closeModal }

  return (
    <Container isOpen={open}>
      <TopRow>
        <CloseButton onClick={requestClose}>&times;</CloseButton>
      </TopRow>

      <BottomContainer>
        <Name name={name} {...extraProps} />
        <Class job={job} {...extraProps} />

        <HP current={current} max={max} temp={temp} {...extraProps} />
        <EXP current={exp} {...extraProps} />

        <Row>
          <ArmorClass name='AC' path='ac' value={ac} {...extraProps} />
          <Speed name='SPD' path='speed' value={speed} {...extraProps} /> 
          <Initiative name='INIT' path='initiative' value={initiative} {...extraProps} />
        </Row>
        <Row>
          <Proficiency name='PROF' path='proficiency' value={proficiency} {...extraProps} />
          <PassivePerception path='passivePerception' value={passivePerception} {...extraProps} />
          <HitDice path='hitdice' value={hitdice} {...extraProps} />
        </Row>

        <Row>
          <Stat name='STR' path='stats.strength' value={stats.strength} {...extraProps} />
          <Stat name='DEX' path='stats.dexterity' value={stats.dexterity} {...extraProps} />
          <Stat name='CON' path='stats.constitution' value={stats.constitution} {...extraProps} />
        </Row>
        <Row>
          <Stat name='INT' path='stats.intelligence' value={stats.intelligence} {...extraProps} />
          <Stat name='WIS' path='stats.wisdom' value={stats.wisdom} {...extraProps} />
          <Stat name='CHA' path='stats.charisma' value={stats.charisma} {...extraProps}s />
        </Row>
      </BottomContainer>
    </Container>
  )
}

export default SideInfo;
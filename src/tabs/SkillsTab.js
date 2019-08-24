import React from 'react';
import styled from 'styled-components';

import SavingThrows from '../components/SavingThrows';
import Skills from '../components/Skills';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 65px 15px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${props => props.theme.light};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SkillsTab = ({ char, syncData, openModal, closeModal }) => {
  const { savingThrows, skills, stats, proficiency, _id } = char;

  const propInfo = { characterID: _id, prof: proficiency, stats, syncData, openModal, closeModal }

  return (
    <Container>
      <ContentContainer>
        <SavingThrows throws={savingThrows} {...propInfo} />
        <Skills skills={skills} {...propInfo} />
      </ContentContainer>
    </Container>
  )
}

export default SkillsTab;
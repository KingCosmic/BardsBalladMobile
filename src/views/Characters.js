import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadAll, createCharacter } from '../reducers/characters';
import { startCharacterCreation, changeCharacterCreationStage, toggleSideNav } from '../reducers/ui';

import Header from '../components/Header';

//import CharacterCreation from '../components/CharacterCreation';
import Character from '../components/Character';

const Tab = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 65px 0;
  overflow-y: auto;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CreateCharacter = styled.p`
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.green};
  position: fixed;
  bottom: 30px;
  right: 20px;
  font-size: 2em;
  padding: 10px 20px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, .1);
`

class Characters extends Component {
  componentDidMount() {
    if (!this.props.loaded) this.props.loadAll()
  }

  render() {

    const { characters, createCharacter, creatingCharacter,
      toggleSideNav
    } = this.props;

    if (creatingCharacter) {
      return (
        {
          //<CharacterCreation stage={creationStage} changeStage={changeCharacterCreationStage} />
        }
      )
    }

    return (
      <Tab>
        <Header title='Characters' leftClick={toggleSideNav} />
        <Container>
          {
            (characters.length === 0) ? null :

            characters.map(character => {
              const { name, job, lvl } = character

              return <Character key={character._id} name={name} job={job} lvl={lvl} character={character} id={character._id} />
            })
          }
        </Container>

        <CreateCharacter onClick={createCharacter}>&#43;</CreateCharacter>
      </Tab>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters.characters,
    loaded: state.characters.loaded,
    creatingCharacter: state.ui.creatingCharacter,
    creationStage: state.ui.creationStage
  }
}


export default withRouter(connect(mapStateToProps, {
  loadAll, createCharacter, startCharacterCreation,
  changeCharacterCreationStage, toggleSideNav
})(Characters));
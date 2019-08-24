import React, { Component } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import T from '../components/Text';

import EditSpell from './AddSpell/EditSpell';

import { ReactComponent as Delete } from '../assets/delete.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';

import { FaArrowLeft, FaCheck } from 'react-icons/fa'

import { cloneDeep, merge, mergeUpdates } from '../helpers';

const BackDrop = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

const Options = styled.div`
  display: flex;
  flex-direction: row;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`

const Text = styled(T)`
  font-size: 1.2em;
  margin: 5px 0;
`

const SubText = styled.span`
  color: rgba(255, 255, 255, .6);
  font-size: 1em;
`

const Description = styled(Text)`
  margin-top: 10px;
`

const BackButton = styled(FaArrowLeft)`
  color: ${props => props.theme.text};
  font-size: 30px;
  height: 60px;
`

const ConfirmButton = styled(FaCheck)`
  color: ${props => props.theme.green};
  font-size: 30px;
  height: 60px;
`

class SpellInfo extends Component {
  constructor(props) {
    super(props);

    const { spells, spellID } = props;

    this.state = {
      isEditing: false,
      spell: cloneDeep(spells.find(obj => obj.id === spellID))
    }

    this.toggleEditing = this.toggleEditing.bind(this)
    this.editSpell = this.editSpell.bind(this)
    this.confirmEdit = this.confirmEdit.bind(this)
    this.deleteSpell = this.deleteSpell.bind(this)
  }

  toggleEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  editSpell(path, data) {
    this.setState({ spell: merge({}, this.state.spell, { [path]: data }) })
  }

  confirmEdit() {
    const { requestClose, syncData, characterID } = this.props;

    requestClose()
    syncData(
      characterID,
      {
        spells: mergeUpdates(this.props.spells, [{ ...this.state.spell }])
      }
    )
  }

  deleteSpell() {
    const { spellID, requestClose, syncData, characterID } = this.props;

    requestClose()
    syncData(
      characterID,
      {
        spells: mergeUpdates(this.props.spells, [{ remove: true, id: spellID }])
      }
    )
  }

  render() {
    const { requestClose } = this.props;
    const { isEditing,
      spell: {
        name, casttime, range, verbal, somatic, material,
        duration, concentration, description, higherlevels
      }
    } = this.state;

    if (isEditing) {
      return (
        <BackDrop onMouseDown={(e) => e.stopPropagation()}>
          <Header title='editing'
            LeftComponent={BackButton} leftClick={this.toggleEditing}
            RightComponent={ConfirmButton}
            rightClick={this.confirmEdit}
            bgStyles={{ position: 'static', zIndex: 60 }}
          />
          <EditSpell spellInfo={this.state.spell} editSpell={this.editSpell} spellData={this.state.spell} />
        </BackDrop>
      )
    }

    return (
      <BackDrop onMouseDown={(e) => e.stopPropagation()}>
        <Header title={name}
          LeftComponent={BackButton} leftClick={requestClose}
          RightComponent={() => (
            <Options>
              <Delete style={{ width: '2em', height: '2em' }} onClick={this.deleteSpell} />
              <Edit style={{ width: '2em', height: '2em' }} onClick={this.toggleEditing} />
            </Options>
          )}
          bgStyles={{ position: 'static', zIndex: 60 }}
        />

        <InfoContainer>
          <Text>CastTime: <SubText>{casttime}</SubText></Text>
          <Text>Range: <SubText>{range}</SubText></Text>
          <Text>Components: <SubText>{verbal ? 'V, ' : ''} {somatic ? 'S, ' : ''} {material ? `M (${material})` : ''}</SubText></Text>
          <Text>Duration: <SubText>{concentration ? `Concentration, up to ${duration}` : duration}</SubText></Text>
          <Description>Description: <SubText>{description}</SubText></Description>
          <Text>Higher Levels:<SubText>{higherlevels}</SubText></Text>
        </InfoContainer>
      </BackDrop>
    )
  }
}

export default SpellInfo;
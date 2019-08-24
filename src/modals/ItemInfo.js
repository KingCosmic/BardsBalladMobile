import React, { Component } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import T from '../components/Text';

import EditItem from './AddItem/EditItem';

import { ReactComponent as Delete } from '../assets/delete.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';

import { FaArrowLeft, FaCheck } from 'react-icons/fa'

import { cloneDeep, merge, mergeUpdates } from '../helpers';
import { itemTypes, propertyTypes } from '../data/constants';

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

class ItemInfo extends Component {
  constructor(props) {
    super(props);

    const { items, itemID } = props;

    this.state = {
      isEditing: false,
      item: cloneDeep(items.find(obj => obj.id === itemID))
    }

    this.toggleEditing = this.toggleEditing.bind(this)
    this.editItem = this.editItem.bind(this)
    this.confirmEdit = this.confirmEdit.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  toggleEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  editItem(path, data) {
    this.setState({ item: merge({}, this.state.item, { [path]: data }) })
  }

  confirmEdit() {
    const { requestClose, syncData, characterID } = this.props;

    requestClose()
    syncData(
      characterID,
      {
        items: mergeUpdates(this.props.items, [{ ...this.state.item }])
      }
    )
  }

  deleteItem() {
    const { itemID, requestClose, syncData, characterID } = this.props;

    requestClose()
    syncData(
      characterID,
      {
        items: mergeUpdates(this.props.items, [{ remove: true, id: itemID }])
      }
    )
  }

  render() {
    const { requestClose } = this.props;
    const { isEditing,
      item: {
        name, desc, category, range, longRange,
        damage1, damage2, value, weight, properties = []
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
          <EditItem itemData={this.state.item} editItem={this.editItem} />
        </BackDrop>
      )
    }

    return (
      <BackDrop onMouseDown={(e) => e.stopPropagation()}>
        <Header title={name}
          LeftComponent={BackButton} leftClick={requestClose}
          RightComponent={() => (
            <Options>
              <Delete style={{ width: '2em', height: '2em' }} onClick={this.deleteItem} />
              <Edit style={{ width: '2em', height: '2em' }} onClick={this.toggleEditing} />
            </Options>
          )}
          bgStyles={{ position: 'static', zIndex: 60 }}
        />

        <InfoContainer>
          <Text><SubText>{itemTypes[category]}</SubText></Text>

          {
            ['M', 'R'].includes(category) ?
              <>
                <Text>Range: <SubText>{range}/{longRange}</SubText></Text>
                <Text>Damage {damage2 ? '(one-handed)' : ''}: <SubText>{damage1}</SubText></Text>
                {damage2 && <Text>Damage (two-handed): <SubText>{damage2}</SubText></Text>}
                <Text>Properties: <SubText>{properties.map(prop => propertyTypes[prop]).join(', ')}</SubText></Text>
              </> : null
          }
          <Text>Value: <SubText>{value}</SubText></Text>
          <Text>Weight: <SubText>{weight} lbs</SubText></Text>

          <Description><SubText>{desc}</SubText></Description>
        </InfoContainer>
      </BackDrop>
    )
  }
}

export default ItemInfo;
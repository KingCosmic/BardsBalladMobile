import React, { Component } from 'react';
import styled from 'styled-components';

import Search from '../components/Search';
import Item from '../components/Item';
import Text from '../components/Text';

import ListSection from '../components/ListSection';

import CurrencyInfoModal from '../modals/CurrencyInfo';
import AddItemModal from '../modals/AddItem';
import ItemInfoModal from '../modals/ItemInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 15px;
  overflow-y: auto;
  background-color: ${props => props.theme.light};
`

const ListContainer = styled.div`
  margin-top: 10px;
`

const AddEquipment = styled(Text)`
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.green};
  position: fixed;
  bottom: 70px;
  right: 20px;
  font-size: 2em;
  padding: 7px 19px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .2), 0 0 0 1px rgba(0, 0, 0, .1);
`

class EquipmentTab extends Component {

  render() {
    const {
      char: { items, pieces, _id },
      syncData, openModal, closeModal
    } = this.props;

    const { platinum, gold, etherium, silver, copper } = pieces;

    return (
      <Container>
        <Search ph='Search Equipment...' />

        <ListContainer>
          <ListSection title='Coin Purse' data={[
            { id: 'platpieces', name: 'Platinum Pieces', category: 'WE', weight: '0.02', quantity: platinum },
            { id: 'goldpieces', name: 'Gold Pieces', category: 'WE', weight: '0.02', quantity: gold },
            { id: 'etheriumpieces', name: 'Etherium Pieces', category: 'WE', weight: '0.02', quantity: etherium },
            { id: 'silverpieces', name: 'Silver Pieces', category: 'WE', weight: '0.02', quantity: silver },
            { id: 'copperpieces', name: 'Copper Pieces', category: 'WE', weight: '0.02', quantity: copper }
          ]} Component={Item} onClick={(currency) => openModal({
            id: 'currencymodal',
            type: 'custom',
            content: <CurrencyInfoModal current={currency.quantity} name={currency.name} characterID={_id} syncData={syncData} requestClose={() => closeModal({ id: 'currencymodal' })} />
          })} />
          {
            items.map((item, i) => {
              return (
                <Item {...item} index={i} key={item.id} onClick={() => openModal({
                  id: 'iteminfomodal',
                  type: 'custom',
                  content: <ItemInfoModal characterID={_id} items={items} itemID={item.id} syncData={syncData} requestClose={() => closeModal({ id: 'iteminfomodal' })} />
                })} />
              )
            })
          }
        </ListContainer>

        <AddEquipment onClick={() => openModal({
          id: 'itemaddmodal',
          type: 'custom',
          content: <AddItemModal items={items} characterID={_id} requestClose={() => closeModal({ id: 'itemaddmodal' })} syncData={syncData} />
        })}>&#43;</AddEquipment>
      </Container>
    )
  }
}

export default EquipmentTab;
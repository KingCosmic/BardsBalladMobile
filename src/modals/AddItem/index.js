import React, { Component } from 'react';
import styled from 'styled-components';

import { FaArrowLeft, FaCheck } from 'react-icons/fa'

import EditItem from './EditItem';
import Header from '../../components/Header';
import Search from './Search';

import { cloneDeep, merge, mergeUpdates } from '../../helpers';

import { itemDefaults } from '../../data/constants';

import nanoid from 'nanoid/generate';
import lowercased from 'nanoid-dictionary/lowercase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'ALL',
      search: '',
      limit: 25,
      creatingItem: false,
      item: cloneDeep(itemDefaults)
    }

    this.changeFilter = this.changeFilter.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.openItem = this.openItem.bind(this)
    this.showItems = this.showItems.bind(this)
    this.editItem = this.editItem.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  changeFilter(filter) {
    this.setState({ filter })
  }

  onSearch(event) {
    this.setState({ search: event.target.value })
  }

  // change the modal to show a item for approval / customization
  // before adding it to the item list.
  openItem(item) {
    if (item) return this.setState({ creatingItem: true, item: merge({}, itemDefaults, item) })

    this.setState({
      creatingItem: true,
      item: cloneDeep(itemDefaults)
    })
  }

  showItems() {
    this.setState({
      creatingItem: false
    })
  }

  editItem(path, data) {
    this.setState({ item: merge({}, this.state.item, { [path]: data }) })
  }

  onConfirm() {
    const { requestClose, syncData, characterID } = this.props;

    const id = nanoid(lowercased, 24)

    requestClose()
    syncData(
      characterID,
      {
        items: mergeUpdates(this.props.items, [{ ...this.state.item, id, new: true }])
      }
    )
  }

  render() {
    const { search, filter, limit, creatingItem } = this.state;
    const { requestClose } = this.props;

    return (
      <Container onMouseDown={(e) => e.stopPropagation()}>
        <Header title={creatingItem ? 'Edit Item' : 'Add Item'}
          LeftComponent={BackButton} leftClick={creatingItem ? this.showItems : requestClose}
          RightComponent={creatingItem ? ConfirmButton : undefined}
          rightClick={this.onConfirm}
          bgStyles={{ position: 'static', zIndex: 60 }}
        />
        {
          (creatingItem === false) ? <Search openItem={this.openItem} onSearch={this.onSearch} search={search} limit={limit} filter={filter} changeFilter={this.changeFilter} /> :
            <EditItem itemData={this.state.item} editItem={this.editItem} />
        }
      </Container>
    )
  }
}

export default AddItem;
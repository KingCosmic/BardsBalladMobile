import React, { Component } from 'react';
import styled from 'styled-components';

import { FaArrowLeft, FaCheck } from 'react-icons/fa'

import EditSpell from './EditSpell';
import Header from '../../components/Header';
import Search from './Search';

import { cloneDeep, merge, mergeUpdates } from '../../helpers';

import { spellDefaults } from '../../data/constants';

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

class AddSpell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'ALL',
      search: '',
      limit: 25,
      creatingSpell: false,
      spell: cloneDeep(spellDefaults)
    }

    this.changeFilter = this.changeFilter.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.openSpell = this.openSpell.bind(this)
    this.showSpells = this.showSpells.bind(this)
    this.editSpell = this.editSpell.bind(this)
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
  openSpell(spell) {
    if (spell) return this.setState({ creatingSpell: true, spell: merge({}, spellDefaults, spell) })

    this.setState({
      creatingSpell: true,
      spell: cloneDeep(spellDefaults)
    })
  }

  showSpells() {
    this.setState({
      creatingSpell: false
    })
  }

  editSpell(path, data) {
    this.setState({ spell: merge({}, this.state.spell, { [path]: data }) })
  }

  onConfirm() {
    const { requestClose, syncData, characterID } = this.props;

    const id = nanoid(lowercased, 24)

    requestClose()
    syncData(
      characterID,
      {
        spells: mergeUpdates(this.props.spells, [{ ...this.state.spell, id, new: true }])
      }
    )
  }

  render() {
    const { search, filter, limit, creatingSpell, spellInfo } = this.state;
    const { requestClose } = this.props;

    return (
      <Container onMouseDown={(e) => e.stopPropagation()} creating={creatingSpell}>
        <Header title={creatingSpell ? 'Edit Spell' : 'Add Spell'}
          LeftComponent={BackButton} leftClick={creatingSpell ? this.showSpells : requestClose}
          RightComponent={creatingSpell ? ConfirmButton : undefined}
          rightClick={this.onConfirm}
          bgStyles={{ position: 'static', zIndex: 60 }}
        />
        {
          (creatingSpell === false) ? <Search onSearch={this.onSearch} search={search} limit={limit} openSpell={this.openSpell} filter={filter} changeFilter={this.changeFilter} /> :
            <EditSpell spellInfo={spellInfo} editSpell={this.editSpell} spellData={this.state.spell} />
        }
      </Container>
    )
  }
}

export default AddSpell;
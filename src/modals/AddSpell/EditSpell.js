import React from 'react';
import styled from 'styled-components';

import Text from '../../components/Text';
import Select from '../../components/Select';

import { spellLevels, schoolOptions, boolOptions } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 15px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  background-color: transparent;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1em;
  font-weight: 200;
  font-family: 'OpenSans';

  &::placeholder {
    color: #8e9297;
  }
`

const TextArea = styled.textarea`
  color: ${props => props.theme.text};
  width: 100%;
  min-height: 50px;
  height: auto;
  max-height: 150px;
  font-size: 1em;
  font-weight: 200;

  margin: 0;

  border-style: none;
  outline: none;
  resize: none;

  background-color: transparent;
  &::placeholder {
    color: #8e9297;
  }
`

const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  width: ${props => props.full ? '100%' : '50%'};
`

const Property = (props) => {
  const { title, value, placeholder, type, options, multi = false, full = false, callback } = props;

  return (
    <PropertyContainer full={full}>
      <Text color='gold'>{title}</Text>

      {
        (type && type === 'select') ?
          <Select value={value} options={options} multi={multi} onChange={callback} /> :
          <Input type={type ? type : 'text'} placeholder={placeholder} value={value} onChange={({ target: { value } }) => callback(value)} />
      }
    </PropertyContainer>
  )
}

const EditSpell = (props) => {
  const { editSpell,
    spellData: {
      name, level, school, ritual, casttime,
      range, duration, concentration, verbal,
      somatic, material, description, higherlevels
    }
  } = props;

  return (
    <Container>
      <Row>
        <Property title='Name' placeholder='Fireball' value={name} callback={(value) => editSpell('name', value)} />
        <Property title='Level' value={level} options={spellLevels} type='select' callback={(value) => editSpell('level', value)} />
      </Row>
      <Row>
        <Property title='School' value={school} options={schoolOptions} type='select' callback={(value) => editSpell('school', value)} />
        <Property title='Ritual' value={ritual} options={boolOptions} type='select' callback={(value) => editSpell('ritual', value)} />
      </Row>
      <Row>
        <Property title='Casting Time' placeholder='1 Action' value={casttime} callback={(value) => editSpell('casttime', value)} />
        <Property title='Range' placeholder='30 feet' value={range} callback={(value) => editSpell('range', value)} />
      </Row>
      <Row>
        <Property title='Duration' placeholder='1 minute' value={duration} callback={(value) => editSpell('duration', value)} />
        <Property title='Concentration' type='select' value={concentration} options={boolOptions} callback={(value) => editSpell('concentration', value)} />
      </Row>

      <Row>
        <Property title='Verbal' value={verbal} options={boolOptions} type='select' callback={(value) => editSpell('verbal', value)} />
        <Property title='Somatic' value={somatic} options={boolOptions} type='select' callback={(value) => editSpell('somatic', value)} />
      </Row>
      <Property title='Material' placeholder='A bit of sponge' value={material} callback={(value) => editSpell('material', value)} />

      <Text margin='10px 0 0' color='gold'>Description</Text>
      <TextArea placeholder='Spell description goes here' value={description} onChange={(event) => editSpell('description', event.target.value)} />

      <Text margin='10px 0 0' color='gold'>Higher Levels</Text>
      <TextArea placeholder='When you cast this spell using a spell slot of 5th level or higher, the bludgeoning damage increases by 1d8 for each slot level above 4th.' value={higherlevels} onChange={(event) => editSpell('higherlevels', event.target.value)} />
    </Container>
  )
}

export default EditSpell;
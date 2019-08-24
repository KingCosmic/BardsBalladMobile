import React, { Component } from 'react';
import styled from 'styled-components';

import Search from '../components/Search';
import Feature from '../components/Feature';
import Text from '../components/Text';

import AddFeatureModal from '../modals/AddFeature';
import FeatureInfoModal from '../modals/FeatureInfo';

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

const AddFeature = styled(Text)`
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

class FeaturesAndTraits extends Component {

  render() {
    const {
      char: { feats, _id },
      syncData, openModal, closeModal
    } = this.props;

    return (
      <Container>
        <Search ph='Search Features...' />

        <ListContainer>
          {
            feats.map((feat, i) => {
              return (
                <Feature {...feat} index={i} key={feat.id} onClick={() => openModal({
                  id: 'featureinfomodal',
                  type: 'custom',
                  content: <FeatureInfoModal characterID={_id} feats={feats} featID={feat.id} syncData={syncData} requestClose={() => closeModal({ id: 'featureinfomodal' })} />
                })} />
              )
            })
          }
        </ListContainer>

        <AddFeature onClick={() => openModal({
          id: 'featureaddmodal',
          type: 'custom',
          content: <AddFeatureModal feats={feats} characterID={_id} requestClose={() => closeModal({ id: 'featureaddmodal' })} syncData={syncData} />
        })}>&#43;</AddFeature>
      </Container>
    )
  }
}

export default FeaturesAndTraits;
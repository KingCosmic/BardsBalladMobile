import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import requireAuth from '../components/requireAuth';

import Modals from '../modals/Modals';
import SlideOut from '../components/SlideOut';

import Characters from './Characters';
import Character from './Character';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const ViewContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.light};
`

class Home extends Component {
  // redirect if we're already logged in
  componentWillMount() {
    if (this.props.history.location.pathname === '/') this.props.history.replace('/characters')
  }

  render() {
    return (
      <Container>
        <Modals />
        <SlideOut />
        <ViewContainer>
          <Switch>
            <Route path='/characters' component={Characters} exact />
            <Route path='/characters/:characterID' component={Character} exact />
          </Switch>
        </ViewContainer>
      </Container>
    )
  }
}

export default requireAuth(Home);
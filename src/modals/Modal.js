import React, { Component } from 'react';
import styled from 'styled-components';

// import * as actions from './actions';

const Overlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .45);
  z-index: 60;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid ${props => props.theme.middleblack};
  background-color: ${props => props.theme.dark};
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2), 0 0 0 1px rgba(28, 36, 43 .6);
  overflow: auto;
  outline: none;
`

class Modal extends Component {
  onClose() {
    if (this.props.item.onClose) this.props.item.onClose();

    this.props.onClose(this.props.item);
  }
  onConfirm() {
    if (this.props.item.onConfirm) {
      this.props.item.onConfirm();
      this.props.onClose(this.props.item);
    }
  }
  render() {
    const { item: { type } } = this.props;

    if (type === 'confirmation') {
      const { text } = this.props.item;
      return (
        <Overlay>
          <Content>
            <div className="text">{text}</div>
            <div className="buttons">
              <button className="modal-button" onClick={() => this.onConfirm()}>Confirm</button>
              <button className="modal-button" onClick={() => this.onClose()}>Close</button>
            </div>
          </Content>
        </Overlay>
      )
    } else if (type === 'custom') {
      const { content } = this.props.item;
      return (
        <Overlay>
          <Content>
            {content}
          </Content>
        </Overlay>
      )
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default Modal;

/*

class CustomModalContent extends Component {
  render() {
    return (
      <div className="modal-content">Custom Modal Content</div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <button className="button" onClick={() => this.props.dispatch(actions.openModal({
          id: uuid.v4(),
          type: 'confirmation',
          text: 'Are you sure to do this?',
          onClose: () => console.log("fire at closing event"),
          onConfirm: () => console.log("fire at confirming event"),
        }))}>Open confirmation modal</button>

        <button className="button" onClick={() => this.props.dispatch(actions.openModal({
          id: uuid.v4(),
          type: 'custom',
          content: <CustomModalContent />
        }))}>Open custom modal</button>

        <ModalContainer />
      </div>
    );
  }
}

*/
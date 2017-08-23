import React, { Component } from 'react';
import ChatKeysBox from '../../components/chatKeysBox';
import ChatMessagesBox from '../../components/chatMessagesBox';

class CellPhoneContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="cellPhoneContainer">
        <ChatMessagesBox />
        <ChatKeysBox />
      </div>
      )
  }
}

export default CellPhoneContainer;

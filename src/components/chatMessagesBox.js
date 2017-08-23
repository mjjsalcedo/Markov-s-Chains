import React from 'react';

const ChatMessagesBox = (onConnect) => (
  <div className="chatMessagesBox">
    <input className="chatInput" placeholder="message your friends"/>
    <div>
    <button type="submit" className="sendButton">Send Massage</button>
    </div>
  </div>
)

export default ChatMessagesBox;
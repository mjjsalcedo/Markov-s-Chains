import React from 'react';

const ChatMessagesBox = (onConnect) => (
  <div className="chatMessagesBox">
    <textarea className="chatInput" placeholder="message your friends"></textarea>
    <button type="submit" className="sendButton">Send Message</button>
  </div>
)

export default ChatMessagesBox

import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <main className="messages">
        {this.props.messages.map((contentData, i) => {
          switch(contentData.type) {
            case "incomingMessage":
              return <Message key={i} body={contentData}/>;
            case "incomingNotification":
            console.log(contentData.content);
              return <div key={i} className="message system">{contentData.content}</div>;
      }
      })}
      </main>
      )
  }
}
export default MessageList;
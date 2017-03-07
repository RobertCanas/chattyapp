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
          return <Message key={i} body={contentData}/>;
          })
        }
        <div className="message system">
        </div>
      </main>
      )
  }
}
export default MessageList;
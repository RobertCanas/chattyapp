import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
          currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
        };
      // this.addNewMessage= this.addNewMessage.bind(this);
      this.sendMessageServer= this.sendMessageServer.bind(this);
  }

  //  addNewMessage(name, content) {

  //   // const messages = this.state.messages.concat(newMessage);

  //   this.setState({messages: messages});
  // }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    console.log('Connected to server');
    this.setAHandlerForWhenAMessageIsReceived();
  }

  sendMessageServer(name, content) {
    const newMessage = {username: name, content: content};
    this.socket.send(JSON.stringify(newMessage));
  }

  setAHandlerForWhenAMessageIsReceived() {
    const receiveMsg = (event) => {
      console.log(event.data);
      // code to handle incoming message

      const messages = this.state.messages.concat(JSON.parse(event.data));
      this.setState({messages: messages});
    };

    this.socket.onmessage = receiveMsg;

  }

  render() {
    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar user={this.state.currentUser.name} newAddedMessage={this.sendMessageServer}/>
    </div>
    );
  }
}
export default App;

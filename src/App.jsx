import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
          currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
        };
      // this.addNewMessage= this.addNewMessage.bind(this);
      this.sendMessageServer= this.sendMessageServer.bind(this);
      this.handlerNameChange= this.handlerNameChange.bind(this);
  }

  //  addNewMessage(name, content) {

  //   // const messages = this.state.messages.concat(newMessage);

  //   this.setState({messages: messages});
  // }

  componentDidMount() {
    console.log("componentDidMount <App />")
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
    console.log('Connected to server');
    };

    this.HandlerReceiveMessage();

  }

  sendMessageServer(name, content) {
    //const newMessage = {type: 'postMessage', username: name, content: content};
    console.log(this.socket);
    this.socket.send(JSON.stringify({type: 'postMessage', username: name, content: content}));
  }

  handlerNameChange(name) {
    const oldName = this.state.currentUser.name;
    if (oldName !== name) {
    this.setState({currentUser: {name: name}})
    this.socket.send(JSON.stringify({type: 'postNotification', username: name, content: `${oldName || 'Anonymous'} has changed their name to ${name}`}));
    }
  }

  HandlerReceiveMessage() {
    const receiveMsg = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      const messages = this.state.messages.concat(data);

      switch(data.type) {
        case "incomingMessage":
          this.setState({messages: messages});
          break;
        case "incomingNotification":
          this.setState({messages: messages});
          break;
        default:

          throw new Error("Unknown event type " + data.type);
      }
    };
    this.socket.onmessage = receiveMsg;

  }



  render() {
    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="user-count">user(s) online</p>
    </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar user={this.state.currentUser.name} nameChange={this.handlerNameChange} newAddedMessage={this.sendMessageServer}/>
    </div>
    );
  }
}
export default App;

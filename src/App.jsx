import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
          currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [],
          clients: 0,
          color: "#000000"
        };
      this.sendMessageServer= this.sendMessageServer.bind(this);
      this.handlerNameChange= this.handlerNameChange.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />")
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
    console.log('Connected to server');
    };

    this.handlerReceiveMessage();

  }

  sendMessageServer(name, content) {
    this.socket.send(JSON.stringify({type: 'postMessage', username: name, content: content, color: this.state.color}));
  }

  handlerNameChange(name) {
    const oldName = this.state.currentUser.name;
    if (oldName !== name) {
    this.setState({currentUser: {name: name}})
    this.socket.send(JSON.stringify({type: 'postNotification', username: name, content: `${oldName || 'Anonymous'} has changed their name to ${name}`}));
    }
  }

  handlerReceiveMessage() {
    const receiveMsg = (event) => {
      const data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);

      switch(data.type) {
        case "incomingMessage":
          this.setState({messages: messages});
          break;
        case "incomingNotification":
          this.setState({messages: messages});
          break;
        case "clientCount":
          this.setState({clients: data.clients});
          break;
        case "setColor":
          this.setState({color: data.color});
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
      <p className="user-count">{this.state.clients} user(s) online</p>
    </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar user={this.state.currentUser.name} nameChange={this.handlerNameChange} newAddedMessage={this.sendMessageServer}/>
    </div>
    );
  }
}
export default App;

import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      content: ''
    };
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.props.newAddedMessage(this.state.username, this.state.content);
    }
  }

  handleNameChange(event) {
    this.setState({username: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.user}
          onChange={this.handleNameChange.bind(this)}/>
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onKeyDown={this.handleKeyPress.bind(this)}
          onChange={this.handleContentChange.bind(this)}/>
      </footer>
    )
  }
}
export default ChatBar;
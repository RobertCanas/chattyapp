import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      content: ''
    };
  }
// condition ? firstoption:secondoption
// name ? "anonymous" : this.state.username
  handleUserChangeName(event) {
    if (event.key == 'Enter') {
      this.props.nameChange(this.state.username, this.state.content);
    }
  }

  handleKeyPressAll(event) {
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
          onKeyDown={this.handleUserChangeName.bind(this)}
          onChange={this.handleNameChange.bind(this)}/>
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onKeyDown={this.handleKeyPressAll.bind(this)}
          onChange={this.handleContentChange.bind(this)}/>
      </footer>
    )
  }
}
export default ChatBar;
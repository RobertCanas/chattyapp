import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style={color: this.props.body.color};
    const urlEx= /(https?:\/\/[^\s]+.(?:png|jpg|gif))/gi;
    const match= urlEx.exec(this.props.body.content);
    const content= this.props.body.content.replace(urlEx, "");
    let url;
    if (match) {
      url = match[0];
    }
    return (
      <div className="message">
        <span className="message-username" style={style}>{this.props.body.username}</span>
        <div className="img">
          <span className="message-content">{content}</span>
          {url ? <img src={url}/> : ""}
          </div>
        </div>
      )
  }
}
export default Message;
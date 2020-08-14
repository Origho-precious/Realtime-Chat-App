import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './chat.module.scss';
import Message from '../../components/message';
import Button from '../../components/button';
import { sendMessage } from '../../redux/actions';

class ChatPage extends Component {
  state = {
    message: "",
  };

  sendMessage = () => {
    if (this.state.message && this.props.user) {
      // Send Message to firestore db
      this.props.sendMessage(this.state.message, this.props.user.email);
      // Clear text field
      this.setState({ message: "" });
    }
  };

    formatTime(timestamp) {
        const d = new Date(timestamp * 1000);
        const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getUTCFullYear()}; ${d.getHours()}:${d.getMinutes()}`
        return date;
    }

    renderMessages = () => {
        const { messages } = this.props;

        if (messages) {
            return messages.map((message, id) => {
                return <Message
                            key={id}
                            date={this.formatTime(message.date.seconds)}
                            text={message.message}
                            sender={message.user}
                        />;
            });
        }
    };

    render() {
        this.renderMessages()
        return (
            <div className={styles.Chat}>
                <h2>Conversation:</h2>
                <div className={styles.messages}>
                    {this.props.messages ? (
                        this.renderMessages()
                    ) : (
                        <h1>No Messages yet!</h1>
                    )}
                </div>
                <div className={styles.textField}>
                <textarea
                    onChange={(e) => this.setState({ message: e.target.value })}
                    value={this.state.message}
                    placeholder="Type your message..."
                ></textarea>
                <Button click={this.sendMessage} type="button">
                    Send Message
                </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user, messages }) => {
    return {
        user,
        messages
    }
}

export default connect(mapStateToProps, { sendMessage })(ChatPage);
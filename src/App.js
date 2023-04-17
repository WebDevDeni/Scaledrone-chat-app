import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages/messages';
import Input from './components/Input/input';
import Header from './components/header/header';
import Registration from './components/registration/registration';
import ChatMemberList from './components/chat_members/chat_members';


function randomName() {
  const colors = [
    'Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple'
  ];
  const animals = [
    'lion', 'tiger', 'bear', 'elephant', 'giraffe', 'zebra'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return color + ' ' + animal;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
    members: [],
    isRegistered: false,
  }

  handleRegFormSubmit = (username) => {
    const member = { ...this.state.member };
    member.username = username;
    this.setState({ member, isRegistered: true });
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("7kerYfMaWwGaUMXb", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.isRegistered ? (
          <>
            <div className="chat__main-members">
              <ChatMemberList members={this.state.members} />
            </div>
            <Messages
              messages={this.state.messages}
              currentMember={this.state.member}
            />
            <Input
              onSendMessage={this.onSendMessage}
            />
          </>
        ) : (
          <Registration handleRegFormSubmit={this.handleRegFormSubmit} />
        )}
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;
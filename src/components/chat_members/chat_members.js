import React from "react";
import "./chat_members.css";

function ChatMemberList(props) {
  return (
    <div className="chat__members">
      <div className="chat__members-title">Online Members:</div>
      <ul>
        {props.members.map((member) => (
          <li key={member.id} className="chat__member">
            <div
              className="chat__member-avatar"
              style={{ backgroundColor: member.color }}
            >
              {member.username[0].toUpperCase()}
            </div>
            <div className="chat__member-username">{member.username}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatMemberList;

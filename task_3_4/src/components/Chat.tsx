import cross from "../assets/img/cross.svg";
import ellips from "../assets/img/ellips.svg";
import sendButton from "../assets/img/sendButton.svg";
import useStore from "../store/ChatState";
import { useState, useRef } from "react";
import {
  ChatField,
  ChatFieldBody,
  ChatFieldHeader,
  Message,
  PlayerInfo,
  TextField,
} from "./Chat.styles";

const Chat = ({ player }: { player: number }) => {
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage } = useStore((state) => ({
    messages: state.messages,
    sendMessage: state.sendMessage,
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const send = () => {
    let date = new Date();

    message.trim().length &&
      sendMessage(message, player, `${date.getHours()}: ${date.getMinutes()}`);
    setMessage("");
    scrollToBottom();
  };

  return (
    <ChatField>
      <ChatFieldHeader>
        <PlayerInfo>
          {player === 1 ? (
            <>
              <img src={cross} alt="" />
              <p>Player {player}</p>
            </>
          ) : (
            <>
              <img src={ellips} alt="" />
              <p>Player {player}</p>
            </>
          )}
        </PlayerInfo>
      </ChatFieldHeader>
      <ChatFieldBody data-player={player}>
        {messages.map((message, index) => (
          <Message
            key={index}
            length={message.message.length}
            className={`p${message.player}`}
          >
            <p>{message.message}</p>
            <span>{message.date}</span>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </ChatFieldBody>
      <TextField>
        <input
          type="text"
          value={message}
          onKeyDown={(e) => e.code === "Enter" && send()}
          onChange={(e) => setMessage(e.target.value)}
        />
        <img src={sendButton} onClick={send} alt="send button icon" />
      </TextField>
    </ChatField>
  );
};

export default Chat;

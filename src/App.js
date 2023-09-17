import React, { useState } from "react";
import "./styles.css";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "received", text: "With what can I help you today?" },
    { type: "received", text: "Hello! I am [name], [company]'s chatbot" }
  ]);

  const [inputText, setInputText] = useState("");
  const [chatVisible, setChatVisible] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const handleSendClick = () => {
    if (inputText.trim() !== "") {
      addMessage("sent", inputText); // Add the user's message first
      generateResponse(inputText); // Generate and add the response
      setInputText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission on Enter key
      handleSendClick();
    }
  };

  const addMessage = (type, text) => {
    const newMessage = { type, text };
    setMessages([...messages, newMessage]);
  };

  const generateResponse = (prompt) => {
    // Replace this logic with your actual response generation code
    if (prompt.toLowerCase().includes("hello")) {
      addMessage("received", "Hello! How can I assist you?");
    } else if (prompt.toLowerCase().includes("help")) {
      addMessage(
        "received",
        "Sure, I can help. What do you need assistance with?"
      );
    } else {
      addMessage("received", "I'm not sure how to respond to that.");
    }
  };

  return (
    <>
      <div
        id="chatbot-container"
        style={{ display: chatVisible ? "block" : "none" }}
      >
        <div id="chatbot-interface">
          <div id="chatbot-header">
            <p>Want to know something? - Let's chat</p>
          </div>
          <div id="chatbot-chat">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-messages ${
                  message.type === "sent"
                    ? "chatbot-sent-messages"
                    : "chatbot-received-messages"
                }`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div id="chatbot-footer">
            <div id="chatbot-input-container">
              <input
                type="text"
                id="chatbot-input"
                name="chatbot-input"
                placeholder="Type a command here..."
                value={inputText}
                onChange={(e) => handleInputChange(e)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div onClick={handleSendClick} id="chatbot-new-message-send-button">
              <i className="material-icons" id="send-icon">
                send
              </i>
            </div>
          </div>
        </div>
      </div>
      <div onClick={toggleChat} id="chatbot-open-container">
        <i className="material-icons" id="open-chat-button">
          {chatVisible ? <CloseIcon /> : <ChatIcon />}
        </i>
      </div>
    </>
  );
};

export default Chatbot;

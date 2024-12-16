import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, List } from "antd";
import axios from "axios";
import "../styles/MessageChat.css";

const MessageChat = () => {
  const { sellerId } = useParams(); // Satıcının ID'si
  const userId = localStorage.getItem("userId"); // Giriş yapan kullanıcı ID'si
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5181/api/Messages/${userId}/${sellerId}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Mesajlar alınırken hata oluştu:", error);
      }
    };

    fetchMessages();
  }, [userId, sellerId]);

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      const response = await axios.post("http://localhost:5181/api/Messages", {
        senderId: userId,
        receiverId: sellerId,
        content: messageText,
      });
      if (response.data.success) {
        setMessages([...messages, { senderId: userId, content: messageText }]);
        setMessageText(""); // Mesaj kutusunu temizle
      }
    } catch (error) {
      console.error("Mesaj gönderilirken hata oluştu:", error);
    }
  };

  return (
    <div className="message-chat-container">
      <div className="message-list">
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item
              className={msg.senderId === userId ? "sent-message" : "received-message"}
            >
              {msg.content}
            </List.Item>
          )}
        />
      </div>
      <div className="message-input">
        <Input
          placeholder="Mesajınızı yazın..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button type="primary" onClick={sendMessage}>
          Gönder
        </Button>
      </div>
    </div>
  );
};

export default MessageChat;

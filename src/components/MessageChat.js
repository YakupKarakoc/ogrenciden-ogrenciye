import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, List, message } from "antd";
import axios from "axios";
import "../styles/MessageChat.css";

const MessageChat = () => {
  const { sellerId } = useParams(); // Satıcının ID'si
  const userId = localStorage.getItem("userId"); // Giriş yapan kullanıcı ID'si
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Mesajları çek
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || !sellerId) {
        message.error("Kullanıcı veya satıcı ID'si eksik!");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5181/api/Messages/${userId}/${sellerId}`
        );
        if (response.data.success) {
          setMessages(response.data.messages);
        } else {
          message.error("Mesajlar alınamadı.");
        }
      } catch (error) {
        console.error("Mesajlar alınırken hata oluştu:", error);
        message.error("Mesajlar alınırken bir hata oluştu.");
      }
    };

    fetchMessages();
  }, [userId, sellerId]);

  // Mesaj gönderme
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
      } else {
        message.error("Mesaj gönderilemedi.");
      }
    } catch (error) {
      console.error("Mesaj gönderilirken hata oluştu:", error);
      message.error("Mesaj gönderilirken bir hata oluştu.");
    }
  };

  return (
    <div className="message-chat-container">
      {/* Mesaj listesi */}
      <div className="message-list">
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item
              className={
                msg.senderId === parseInt(userId)
                  ? "sent-message"
                  : "received-message"
              }
            >
              {msg.content}
            </List.Item>
          )}
        />
      </div>

      {/* Mesaj gönderme input */}
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

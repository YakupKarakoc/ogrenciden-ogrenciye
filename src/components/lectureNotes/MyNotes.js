import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartFilled,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/lectureNotess/MyNotes.css";

function MyNotes() {
  const [userNotes, setUserNotes] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5181/api/Note/User/${userId}`
        );
        setUserNotes(response.data);
      } catch (error) {
        console.error("Kullanıcı notlarını alırken hata oluştu:", error);
      }
    };
    fetchUserNotes();
  }, [userId]);

  const handleAddNoteClick = () => {
    navigate("/AddNote");
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="my-notes-updated-wrapper">
      {/* Header */}
      <header className="my-notes-updated-header">
        <div className="my-notes-updated-logo-section">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="my-notes-updated-logo"
            onClick={handleLogoClick}
          />
          <span className="my-notes-updated-logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="my-notes-updated-header-right">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="my-notes-updated-header-button"
            onClick={handleAddNoteClick}
          >
            Not Ekle
          </Button>
          <Button
            type="text"
            icon={<HeartFilled />}
            className="my-notes-updated-header-button"
          >
            Çalışılacaklar
          </Button>
         
          <Button
            type="text"
            icon={<UserOutlined />}
            className="my-notes-updated-header-button"
            onClick={handleProfileClick}
          >
            Profilim
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="my-notes-updated-header-button"
            onClick={handleLogoutClick}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* User Notes Section */}
      <div className="my-notes-updated-container">
        <h1>Notlarım</h1>
        <div className="my-notes-updated-grid">
          {userNotes.map((note) => (
            <div key={note.noteId} className="my-notes-updated-card">
              <h3>{note.subject}</h3>
              <p>{note.content}</p>
              {note.filePath && (
                <a
                  href={`http://localhost:5181${note.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF Görüntüle
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyNotes;

import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { PlusCircleOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/lectureNotess/MyNotesUnique.css";

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
    <div className="my-notes-container-unique">
      {/* Header */}
      <header className="my-notes-header-unique">
        <div className="my-notes-logo-section-unique">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="my-notes-logo-unique"
            onClick={handleLogoClick}
          />
          <span className="my-notes-logo-text-unique">Öğrenciden Öğrenciye</span>
        </div>
        <div className="my-notes-header-right-unique">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="my-notes-header-button-unique"
            onClick={handleAddNoteClick}
          >
            Not Ekle
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="my-notes-header-button-unique"
            onClick={handleProfileClick}
          >
            Profilim
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="my-notes-header-button-unique"
            onClick={handleLogoutClick}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* User Notes Section */}
      <div className="my-notes-content-unique">
        <h1 className="my-notes-title-unique">Notlarım</h1>
        <div className="my-notes-grid-unique">
          {userNotes.map((note) => (
            <div key={note.noteId} className="my-notes-card-unique">
              <h3 className="my-notes-card-title-unique">{note.subject}</h3>
              <p className="my-notes-card-content-unique">{note.content}</p>
              {note.filePath && (
                <a
                  href={`http://localhost:5181${note.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="my-notes-card-link-unique"
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

import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartFilled,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/NotPaylasim.css";

function NotPaylasim() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Arama sorgusu için state
  const navigate = useNavigate();

  const fetchUserNotes = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      message.error("Kullanıcı bilgisi bulunamadı!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5181/api/Note/user/${userId}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Kullanıcı notları alınırken hata oluştu:", error);
      message.error("Notları alırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5181/api/Note");
        setNotes(response.data);
      } catch (error) {
        console.error("Notları alırken hata oluştu:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      message.error("Arama sorgusu boş olamaz.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5181/api/Note/search?query=${encodeURIComponent(searchQuery)}`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Arama sırasında hata oluştu:", error);
      message.error("Arama sırasında bir hata oluştu.");
    }
  };

  const handleAddToFavorites = (noteId) => {
    console.log(`Note ${noteId} favorilere eklendi!`);
    // Favorilere ekleme API çağrısını buraya ekleyebilirsiniz.
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

  const handleMyNotesClick = () => {
    navigate("/mynotes");
  };

  const handleAddNoteClick = () => {
    navigate("/AddNote");
  };

  return (
    <div className="not-paylasim-wrapper">
      {/* Header */}
      <header className="not-paylasim-header">
        <div className="logo-section">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="logo"
            onClick={handleLogoClick}
          />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
          <Input
            placeholder="Aranacak dersi veya notu yazınız.."
            className="search-input"
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch} // Enter tuşuna basıldığında ara
          />
          <Button className="araara" type="primary" onClick={handleSearch}>
            Ara
          </Button>
        </div>
        <div className="header-right">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="header-button"
            onClick={handleAddNoteClick}
          >
            Not Ekle
          </Button>
          <Button
            type="text"
            icon={<HeartFilled />}
            className="header-button"
          >
            Favorilerim
          </Button>
          <Button
            type="text"
            icon={<BookOutlined />}
            className="header-button"
            onClick={handleMyNotesClick}
          >
            Notlarım
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="header-button"
            onClick={handleProfileClick}
          >
            Profilim
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="header-button"
            onClick={handleLogoutClick}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Notes Section */}
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.noteId} className="note-card">
            <h3>{note.subject}</h3>
            <p>{note.content}</p>
            {note.filePath && (
              <a
                href={`http://localhost:5181${note.filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                Notu Görmek İster misin?
              </a>
            )}
            <span className="note-uploader">Hazırlayan: {note.uploaderName}</span>
            <button
              className="favorite-button"
              onClick={() => handleAddToFavorites(note.noteId)}
            >
              Çalışılacaklara Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotPaylasim;

import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/lectureNotess/NoteFavoritePage.css";

function NoteFavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5181/api/NoteFavorite/${userId}`
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Favori notları alırken hata oluştu:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleSearchFavorites = async () => {
    if (!searchQuery.trim()) {
      message.warning("Lütfen arama yapmak için bir kelime girin.");
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:5181/api/NoteFavorite/search/${userId}`,
        {
          params: { query: searchQuery },
        }
      );
      setFavorites(response.data);
      message.success("Arama tamamlandı.");
    } catch (error) {
      if (error.response?.status === 404) {
        message.info("Arama kriterine uygun bir favori not bulunamadı.");
      } else {
        console.error("Arama sırasında bir hata oluştu:", error);
        message.error("Arama sırasında bir hata oluştu.");
      }
    }
  };
  

  const handleRemoveFromFavorites = async (noteId) => {
    try {
      await axios.delete(
        `http://localhost:5181/api/NoteFavorite/${userId}/${noteId}`
      );
      setFavorites((prev) => prev.filter((note) => note.noteId !== noteId));
      message.success("Favorilerden kaldırıldı!");
    } catch (error) {
      console.error("Favori silme işlemi sırasında hata oluştu:", error);
      message.error("Favori silme işlemi sırasında bir hata oluştu.");
    }
  };

  const handleLogoClick = () => navigate("/home");
  const handleProfileClick = () => navigate("/profile");
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="note-favorite-container">
      {/* Header */}
      <header className="note-favorite-header">
        <div className="note-favorite-logo-section">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="note-favorite-logo"
            onClick={handleLogoClick}
          />
          <span className="note-favorite-logo-text">Öğrenciden Öğrenciye</span>
          <Input
            placeholder="Favorilerimde Ara"
            className="note-favorite-search-input"
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="note-favorite-search-button" onClick={handleSearchFavorites} type="primary">
            Ara
          </Button>
        </div>
        <div className="note-favorite-header-right">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="note-favorite-header-button"
            onClick={() => navigate("/AddNote")}
          >
            Not Ekle
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="note-favorite-header-button"
            onClick={handleProfileClick}
          >
            Profilim
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="note-favorite-header-button"
            onClick={handleLogoutClick}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Notes Section */}
      <div className="note-favorite-grid">
        {favorites.map((note) => (
          <div key={note.noteId} className="note-favorite-card">
            <h3>{note.subject}</h3>
            <p className="note-favorite-content">{note.content}</p>
            {note.filePath && (
              <a
                href={`http://localhost:5181${note.filePath}`}
                target="_blank"
                rel="noreferrer"
                className="note-favorite-link"
              >
                Notu Görmek İster misin?
              </a>
            )}
            <span className="note-favorite-uploader">
              Hazırlayan: {note.uploaderName}
            </span>
            <button
              className="note-favorite-button"
              onClick={() => handleRemoveFromFavorites(note.noteId)}
            >
              <HeartFilled style={{ color: "red" }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteFavoritePage;

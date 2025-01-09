import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartFilled,
  HeartOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/lectureNotess/NotPaylasimUnique.css";

function NotPaylasim() {
  const [notes, setNotes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Arama sorgusu
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5181/api/Note");
        setNotes(response.data);
      } catch (error) {
        console.error("Notları alırken hata oluştu:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5181/api/NoteFavorite/${userId}`
        );
        setFavorites(response.data.map((favorite) => favorite.noteId));
      } catch (error) {
        console.error("Favorileri alırken hata oluştu:", error);
      }
    };

    fetchNotes();
    fetchFavorites();
  }, [userId]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      message.warning("Lütfen bir arama sorgusu girin.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5181/api/Note/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      setNotes(response.data); // Arama sonuçlarını notes state'ine aktar
      if (response.data.length === 0) {
        message.info("Aramanızla eşleşen bir not bulunamadı.");
      }
    } catch (error) {
      console.error("Arama sırasında hata oluştu:", error);
      message.error("Arama sırasında bir hata oluştu.");
    }
  };

  const handleAddToFavorites = async (noteId) => {
    try {
      if (favorites.includes(noteId)) {
        await axios.delete(
          `http://localhost:5181/api/NoteFavorite/${userId}/${noteId}`
        );
        setFavorites((prev) => prev.filter((id) => id !== noteId));
        message.success("Favorilerden kaldırıldı!");
      } else {
        await axios.post("http://localhost:5181/api/NoteFavorite", {
          userId: userId,
          noteId: noteId,
        });
        setFavorites((prev) => [...prev, noteId]);
        message.success("Favorilere eklendi!");
      }
    } catch (error) {
      console.error("Favori işlemi sırasında hata oluştu:", error);
      message.error("Favori işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="not-paylasim-container-unique">
      {/* Header */}
      <header className="not-paylasim-header-unique">
        <div className="logo-section-unique">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="logo-unique"
            onClick={() => navigate("/home")}
          />
          <span className="logo-text-unique">Öğrenciden Öğrenciye</span>
          <Input
            placeholder="Aranacak dersi veya notu yazınız.."
            className="search-input-unique"
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className="search-button-unique"
            type="primary"
            onClick={handleSearch}
          >
            Ara
          </Button>
        </div>
        <div className="header-right-unique">
       
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="header-button-unique"
            onClick={() => navigate("/AddNote")}
          >
            Not Ekle
          </Button>
          <Button
          type="text"
          icon={<SnippetsOutlined  />}
          className="header-button-unique"
          onClick={() => navigate("/my-notes")}
        >
          Notlarım
        </Button>
          <Button
            type="text"
            icon={<HeartFilled />}
            className="header-button-unique"
            onClick={() => navigate("/note-favorite-page")}
          >
            Favorilerim
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="header-button-unique"
            onClick={() => navigate("/profile")}
          >
            Profilim
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="header-button-unique"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Notes Section */}
      <div className="notes-grid-unique">
        {notes.map((note) => (
          <div key={note.noteId} className="note-card-unique">
            <h3>{note.subject}</h3>
            <p className="note-content-unique">{note.content}</p>
            {note.filePath && (
              <a
                href={`http://localhost:5181${note.filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                Notu Görmek İster misin?
              </a>
            )}
            <span className="note-uploader-unique">
              Hazırlayan: {note.uploaderName}
            </span>
            <button
              className="favorite-button-unique"
              onClick={() => handleAddToFavorites(note.noteId)}
            >
              {favorites.includes(note.noteId) ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotPaylasim;

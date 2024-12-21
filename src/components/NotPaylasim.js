import React, { useState } from "react";
import { Input, Button, Modal, Select, Upload } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartFilled,
  HeartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/NotPaylasim.css";

const { TextArea } = Input;
const { Option } = Select;

function NotPaylasim() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isNoteDetailModalOpen, setIsNoteDetailModalOpen] = useState(false);
  const [trendNotes, setTrendNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([
    "Matematik",
    "Fizik",
    "Kimya",
    "Biyoloji",
    "Tarih",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    fullContent: "",
    category: "",
    photo: null,
  });

  const maxTitleLength = 25;

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory("");
    setCustomCategory("");
    setNewNote({ title: "", description: "", fullContent: "", category: "", photo: null });
  };

  const openFavoritesModal = () => {
    setIsFavoritesModalOpen(true);
  };

  const closeFavoritesModal = () => {
    setIsFavoritesModalOpen(false);
  };

  const openNoteDetail = (note) => {
    setSelectedNote(note);
    setIsNoteDetailModalOpen(true);
  };

  const closeNoteDetail = () => {
    setIsNoteDetailModalOpen(false);
    setSelectedNote(null);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setNewNote((prev) => ({
      ...prev,
      category: value === "Diğer" ? customCategory : value,
    }));
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setNewNote((prev) => ({ ...prev, photo: info.file.originFileObj }));
    }
  };

  const handleSaveNote = () => {
    if (selectedCategory === "Diğer" && customCategory) {
      setCategories((prev) => [...prev, customCategory]);
    }

    const noteToAdd = {
      id: trendNotes.length + 1,
      title: newNote.title,
      description: newNote.description,
      fullContent: newNote.fullContent,
      category: selectedCategory === "Diğer" ? customCategory : selectedCategory,
      photo: newNote.photo,
    };

    setTrendNotes((prev) => [noteToAdd, ...prev]);
    closeModal();
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const favoriteNotes = trendNotes.filter((note) => favorites.includes(note.id));

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
            placeholder="Aranacak notu yazınız"
            className="search-input"
            allowClear
          />
        </div>
        <div className="header-right">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="header-button"
            onClick={openModal}
          >
            Not Ekle
          </Button>
          <Button
            type="text"
            icon={<HeartFilled />}
            className="header-button"
            onClick={openFavoritesModal}
          >
            Favorilerim
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

      {/* Main Content */}
      <div className="not-paylasim-content">
        <aside className="sidebar">
          <h3>Dersler</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </aside>

        <section className="trend-notlar-section">
          <h3>
            Trend Notlar <span className="emoji">🔥</span>
          </h3>
          <div className="trend-notes-list">
            {trendNotes.map((note) => (
              <div
                key={note.id}
                className="note-card"
                onClick={() => openNoteDetail(note)}
              >
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                {note.photo && <img src={URL.createObjectURL(note.photo)} alt="Note" className="note-image" />}
                <span className="note-category">{note.category}</span>
                {favorites.includes(note.id) ? (
                  <HeartFilled
                    className="favorite-icon favorited"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(note.id);
                    }}
                  />
                ) : (
                  <HeartOutlined
                    className="favorite-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(note.id);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Add Note Modal */}
      <Modal
        title="Yeni Not Ekle"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <form className="note-form">
          <label>Ders Seçiniz:</label>
          <Select
            placeholder="Bir ders seçin"
            className="note-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            {categories.map((category, index) => (
              <Option key={index} value={category}>
                {category}
              </Option>
            ))}
            <Option value="Diğer">Diğer</Option>
          </Select>

          {selectedCategory === "Diğer" && (
            <>
              <label>Yeni Ders Adı:</label>
              <Input
                placeholder="Ders adını girin"
                className="note-input"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </>
          )}

          <label>Not Başlığı (Max {maxTitleLength} karakter):</label>
          <Input
            placeholder="Not başlığını girin"
            className="note-input"
            value={newNote.title}
            onChange={(e) =>
              e.target.value.length <= maxTitleLength &&
              setNewNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <p>
            {newNote.title.length}/{maxTitleLength} karakter
          </p>

          <label>Not Açıklaması:</label>
          <Input
            placeholder="Kısa bir açıklama yazın"
            className="note-input"
            value={newNote.description}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <label>Detaylı Not:</label>
          <TextArea
            placeholder="Detaylı notunuzu buraya yazın"
            rows={4}
            className="note-textarea"
            value={newNote.fullContent}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, fullContent: e.target.value }))
            }
          />

          <label>Fotoğraf Yükle:</label>
          <Upload
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Fotoğraf Seç</Button>
          </Upload>

          <Button
            type="primary"
            className="save-note-button"
            onClick={handleSaveNote}
          >
            Kaydet
          </Button>
        </form>
      </Modal>

      {/* Note Detail Modal */}
      <Modal
        title={selectedNote?.title || "Detaylı Not"}
        visible={isNoteDetailModalOpen}
        onCancel={closeNoteDetail}
        footer={null}
      >
        <p>{selectedNote?.fullContent}</p>
        {selectedNote?.photo && (
          <img
            src={URL.createObjectURL(selectedNote.photo)}
            alt="Note"
            className="note-detail-image"
          />
        )}
      </Modal>
    </div>
  );
}

export default NotPaylasim;

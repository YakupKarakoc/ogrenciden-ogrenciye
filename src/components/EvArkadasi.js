import React, { useState } from "react";
import { Input, Button, Modal, Upload, Card, Select, Checkbox, Tag } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  SearchOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/EvArkadasi.css";

const { Meta } = Card;
const { Option } = Select;

function EvArkadasi() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [ads, setAds] = useState([
    {
      id: 1,
      address: "Kadıköy, İstanbul",
      features: "3+1, balkonlu, eşyalı",
      price: "4500 TL",
      description: "Metroya yakın, geniş ve kullanışlı.",
      photo: "/images/house1.jpeg",
      isFavorite: false,
    },
    {
      id: 2,
      address: "Bornova, İzmir",
      features: "2+1, bahçeli",
      price: "3000 TL",
      description: "Sessiz ve doğa ile iç içe bir çevre.",
      photo: "/images/house2.jpeg",
      isFavorite: false,
    },
    {
      id: 3,
      address: "Çankaya, Ankara",
      features: "1+1, metroya yakın",
      price: "2500 TL",
      description: "Minimalist yaşam tarzına uygun.",
      photo: "/images/house3.jpeg",
      isFavorite: false,
    },
  ]);

  const [favorites, setFavorites] = useState([]);

  const [newAd, setNewAd] = useState({
    address: "",
    features: "",
    price: "",
    description: "",
    roommateCriteria: "",
    photo: null,
    isFavorite: false,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setNewAd((prev) => ({ ...prev, photo: info.file.originFileObj }));
    }
  };

  const toggleFavorite = (id) => {
    const updatedAds = ads.map((ad) =>
      ad.id === id ? { ...ad, isFavorite: !ad.isFavorite } : ad
    );
    setAds(updatedAds);
    const favoriteAds = updatedAds.filter((ad) => ad.isFavorite);
    setFavorites(favoriteAds);
  };

  const openDetailModal = (ad) => {
    setSelectedAd(ad);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => setIsDetailModalOpen(false);

  const handleSaveAd = () => {
    const newAdWithId = {
      ...newAd,
      id: ads.length + 1,
      photo: newAd.photo ? URL.createObjectURL(newAd.photo) : null,
      isFavorite: false,
    };
    setAds([...ads, newAdWithId]);
    closeModal();
  };

  const navigateToFavorites = () => {
    setAds(favorites);
  };

  return (
    <div className="evarkadasi-wrapper">
      {/* Header */}
      <header className="evarkadasi-header">
        <div className="logo-section" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="header-middle">
          <Input
            placeholder="Arama yapın..."
            prefix={<SearchOutlined />}
            className="search-input"
          />
        </div>
        <div className="header-right">
          <Button
            type="primary"
            className="header-button"
            onClick={navigateToFavorites}
          >
            Favorilerim
          </Button>
          <Button
            type="primary"
            className="header-button"
            icon={<PlusCircleOutlined />}
            onClick={openModal}
          >
            İlan Ver
          </Button>
          <Button
            type="text"
            className="header-button"
            icon={<UserOutlined />}
            onClick={() => navigate("/profile")}
          >
            Profilim
          </Button>
          <Button
            type="text"
            className="header-button"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Çıkış Yap
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="evarkadasi-content">
        <div className="filter-container">
          <h3>Filtrele</h3>
          <div className="filter-group">
            <label>Şehir</label>
            <Select placeholder="Şehir seçin" style={{ width: "100%" }}>
              <Option value="istanbul">İstanbul</Option>
              <Option value="izmir">İzmir</Option>
              <Option value="ankara">Ankara</Option>
            </Select>
          </div>
          <div className="filter-group">
            <label>Fiyat Aralığı</label>
            <Input placeholder="Örneğin: 1000 - 5000" />
          </div>
          <div className="filter-group">
            <label>Oda Sayısı</label>
            <Checkbox>1+1</Checkbox>
            <Checkbox>2+1</Checkbox>
            <Checkbox>3+1</Checkbox>
          </div>
          <div className="filter-group">
            <label>Diğer Özellikler</label>
            <Checkbox>Metrobüse Yakın</Checkbox>
            <Checkbox>Balkonlu</Checkbox>
            <Checkbox>Mobilyalı</Checkbox>
          </div>
          <Button type="primary" className="apply-filter-button">
            Filtrele
          </Button>
        </div>

        <div className="ads-container">
          {ads.map((ad) => (
            <Card
              key={ad.id}
              hoverable
              cover={
                <img
                  alt="Ev Fotoğrafı"
                  src={ad.photo || "/images/default.jpg"}
                  className="ad-image"
                />
              }
              className="ad-card"
              onClick={() => openDetailModal(ad)}
            >
              <Meta
                title={`${ad.address} - ${ad.price}`}
                description={`${ad.features}`}
              />
              {ad.isFavorite ? (
                <HeartFilled
                  className="favorite-icon active"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(ad.id);
                  }}
                />
              ) : (
                <HeartOutlined
                  className="favorite-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(ad.id);
                  }}
                />
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* İlan Detay Modal */}
      <Modal
        title={selectedAd?.address}
        visible={isDetailModalOpen}
        onCancel={closeDetailModal}
        footer={null}
      >
        <img
          alt="Detaylı Ev Fotoğrafı"
          src={selectedAd?.photo}
          style={{ width: "100%", marginBottom: "10px", borderRadius: "8px" }}
        />
        <p>Fiyat: {selectedAd?.price}</p>
        <p>Özellikler: {selectedAd?.features}</p>
        <p>Açıklama: {selectedAd?.description}</p>
      </Modal>
    </div>
  );
}

export default EvArkadasi;
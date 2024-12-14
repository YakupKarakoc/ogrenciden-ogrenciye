import React, { useState } from "react";
import { Input, Button, Modal, Card, Select, Checkbox, Upload } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  HeartOutlined,
  HeartFilled,
  UploadOutlined,
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
      city: "İstanbul",
      roomCount: "3+1",
      features: ["Balkonlu", "Eşyalı"],
      price: "4500 TL",
      description: "Metroya yakın, geniş ve kullanışlı.",
      photo: "/images/house1.jpeg",
      isFavorite: false,
    },
    {
      id: 2,
      address: "Bornova, İzmir",
      city: "İzmir",
      roomCount: "2+1",
      features: ["Bahçeli"],
      price: "3000 TL",
      description: "Sessiz ve doğa ile iç içe bir çevre.",
      photo: "/images/house2.jpeg",
      isFavorite: false,
    },
    {
      id: 3,
      address: "Çankaya, Ankara",
      city: "Ankara",
      roomCount: "1+1",
      features: ["Metroya Yakın"],
      price: "2500 TL",
      description: "Minimalist yaşam tarzına uygun.",
      photo: "/images/house3.jpeg",
      isFavorite: false,
    },
  ]);

  const [newAd, setNewAd] = useState({
    address: "",
    city: "",
    roomCount: "",
    price: "",
    features: [],
    description: "",
    photo: null,
    isFavorite: false,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDetailModal = (ad) => {
    setSelectedAd(ad);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => setIsDetailModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (selectedFeatures) => {
    setNewAd((prev) => ({ ...prev, features: selectedFeatures }));
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setNewAd((prev) => ({ ...prev, photo: URL.createObjectURL(info.file.originFileObj) }));
    }
  };

  const handleSaveAd = () => {
    const newAdWithId = {
      ...newAd,
      id: ads.length + 1,
      isFavorite: false,
    };
    setAds([...ads, newAdWithId]);
    closeModal();
  };

  const navigateToFavorites = () => {
    setAds(ads.filter((ad) => ad.isFavorite));
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
        {/* Filter Section */}
        <div className="filter-container">
          <h3 className="filter-header">Filtrele</h3>
          <div className="filter-group">
            <label>Şehir</label>
            <Select placeholder="Şehir seçin" style={{ width: "100%" }}>
              <Option value="İstanbul">İstanbul</Option>
              <Option value="İzmir">İzmir</Option>
              <Option value="Ankara">Ankara</Option>
            </Select>
          </div>
          <div className="filter-group">
            <label>Fiyat Aralığı</label>
            <div className="price-range">
              <Input
                placeholder="Min"
                className="price-input"
                name="minPrice"
                onChange={handleInputChange}
              />
              <span className="price-separator">-</span>
              <Input
                placeholder="Max"
                className="price-input"
                name="maxPrice"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="filter-group">
            <label>Oda Sayısı</label>
            <Select placeholder="Oda Sayısı Seçin" style={{ width: "100%" }}>
              <Option value="1+1">1+1</Option>
              <Option value="2+1">2+1</Option>
              <Option value="3+1">3+1</Option>
            </Select>
          </div>
          <div className="filter-group">
            <label>Diğer Özellikler</label>
            <Select
              mode="multiple"
              placeholder="Özellik seçin"
              style={{ width: "100%" }}
            >
              <Option value="Balkonlu">Balkonlu</Option>
              <Option value="Eşyalı">Eşyalı</Option>
              <Option value="Bahçeli">Bahçeli</Option>
              <Option value="Deniz Manzaralı">Deniz Manzaralı</Option>
            </Select>
          </div>
        </div>

        {/* Ads Section */}
        <div className="ads-container">
          {ads.map((ad) => (
            <Card
              key={ad.id}
              hoverable
              cover={<img alt="Ev Fotoğrafı" src={ad.photo || "/images/default.jpg"} />}
              onClick={() => openDetailModal(ad)}
            >
              <Meta title={`${ad.address} - ${ad.price}`} description={`${ad.features}`} />
            </Card>
          ))}
        </div>
      </div>

      {/* İlan Ver Modal */}
      <Modal
        title="Yeni İlan Ver"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleSaveAd}>
            Kaydet
          </Button>,
        ]}
      >
        <div>
          <Input placeholder="Adres" name="address" onChange={handleInputChange} />
          <Select
            placeholder="Şehir"
            style={{ width: "100%", marginTop: "10px" }}
            onChange={(value) => setNewAd((prev) => ({ ...prev, city: value }))}
          >
            <Option value="İstanbul">İstanbul</Option>
            <Option value="İzmir">İzmir</Option>
            <Option value="Ankara">Ankara</Option>
          </Select>
          <Select
            placeholder="Oda Sayısı"
            style={{ width: "100%", marginTop: "10px" }}
            onChange={(value) => setNewAd((prev) => ({ ...prev, roomCount: value }))}
          >
            <Option value="1+1">1+1</Option>
            <Option value="2+1">2+1</Option>
            <Option value="3+1">3+1</Option>
          </Select>
          <Input
            placeholder="Fiyat (TL)"
            name="price"
            style={{ marginTop: "10px" }}
            onChange={handleInputChange}
          />
          <Select
            mode="multiple"
            placeholder="Özellik seçin"
            style={{ width: "100%", marginTop: "10px" }}
            onChange={handleFeatureChange}
          >
            <Option value="Balkonlu">Balkonlu</Option>
            <Option value="Eşyalı">Eşyalı</Option>
            <Option value="Bahçeli">Bahçeli</Option>
            <Option value="Deniz Manzaralı">Deniz Manzaralı</Option>
          </Select>
          <Upload
            name="photo"
            listType="picture"
            maxCount={1}
            style={{ marginTop: "10px" }}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Fotoğraf Yükle</Button>
          </Upload>
        </div>
      </Modal>

      {/* Detaylı Modal */}
      <Modal
        title={selectedAd?.address}
        visible={isDetailModalOpen}
        onCancel={closeDetailModal}
        footer={null}
      >
        <img alt="Ev Detayı" src={selectedAd?.photo} style={{ width: "100%", borderRadius: "10px" }} />
        <p>Fiyat: {selectedAd?.price}</p>
        <p>Oda Sayısı: {selectedAd?.roomCount}</p>
        <p>Özellikler: {selectedAd?.features.join(", ")}</p>
        <p>Açıklama: {selectedAd?.description}</p>
      </Modal>
    </div>
  );
}

export default EvArkadasi;

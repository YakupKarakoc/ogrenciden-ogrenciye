import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import { PlusCircleOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "../../styles/EsyaIlani/MyAds.css";

function MyAds() {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) throw new Error("Kullanıcı e-posta adresi bulunamadı.");

        const response = await axios.get("http://localhost:5181/api/Products/MyAds", {
          params: { sellerEmail: userEmail },
        });
        setAds(response.data);
      } catch (error) {
        message.error("İlanlar alınırken bir hata oluştu!");
      }
    };

    fetchMyAds();
  }, []);

  const handleAdClick = (adId) => {
    navigate(`/products/${adId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNewAd = () => {
    navigate("/new-ad");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="my-ads-page">
      {/* Header */}
      <header className="my-ads-header">
        <div className="header-logo-section" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <span className="header-logo-text">Öğrenciden Öğrenciye</span>
          <Input
            placeholder="Aradığınız ürün, kategori veya markayı yazınız.."
            className="header-search-input"
            allowClear
          />
        </div>
        <div className="header-buttons">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="header-button"
            onClick={handleNewAd}
          >
            İlan Ver
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="header-button"
            onClick={handleProfile}
          >
            Hesabım
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="header-button"
            onClick={handleLogout}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <h1 className="my-ads-title">İlanlarım</h1>
      <div className="ads-container">
        {ads.length === 0 ? (
          <p>Henüz bir ilan vermediniz.</p>
        ) : (
          ads.map((ad) => (
            <div
              key={ad.productId}
              className="ad-card"
              onClick={() => handleAdClick(ad.productId)}
            >
              <img src={`http://localhost:5181${ad.imagePath}`} alt={ad.title} />
              <h3>{ad.title}</h3>
              <p>{ad.price} TL</p>
              <p>{ad.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyAds;

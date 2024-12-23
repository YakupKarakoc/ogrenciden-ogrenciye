import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import { PlusCircleOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "../../styles/secondHandItems/ProductMyAds.css";

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
    <div className="product-my-ads-page">
      {/* Header */}
      <header className="product-my-ads-header">
        <div className="product-header-logo-section" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="product-logo" />
          <span className="product-header-logo-text">Öğrenciden Öğrenciye</span>
          <Input
            placeholder="İlanlarımda ara"
            className="product-header-search-input"
            allowClear
          />
        </div>
        <div className="product-header-buttons">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="product-header-button"
            onClick={handleNewAd}
          >
            İlan Ver
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="product-header-button"
            onClick={handleProfile}
          >
            Hesabım
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="product-header-button"
            onClick={handleLogout}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <h1 className="product-my-ads-title">İlanlarım</h1>
      <div className="product-ads-container">
        {ads.length === 0 ? (
          <p>Henüz bir ilan vermediniz.</p>
        ) : (
          ads.map((ad) => (
            <div
              key={ad.productId}
              className="product-ad-card"
              onClick={() => handleAdClick(ad.productId)}
            >
              <div className="product-ad-image-container">
                <img src={`http://localhost:5181${ad.imagePath}`} alt={ad.title} />
              </div>
              <div className="product-ad-details">
                <h3>{ad.title}</h3>
                <p>{ad.price} TL</p>
                <p>{ad.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyAds;

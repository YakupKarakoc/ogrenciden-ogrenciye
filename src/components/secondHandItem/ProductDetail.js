import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "../../styles/secondHandItems/ProductDetailUnique.css";

function ProductDetail() {
  const { id } = useParams(); // URL'deki ürün ID'sini al
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Ürün detaylarını çek
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5181/api/Products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Ürün detayları alınırken hata oluştu:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Yükleniyor...</div>;

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
    <div className="product-detail-unique-wrapper">
      {/* Header */}
      <header className="product-detail-unique-header">
        <div className="product-detail-unique-logo-section" onClick={handleLogoClick}>
          <img src="/images/logo.jpg" alt="Logo" className="product-detail-unique-logo" />
          <span className="product-detail-unique-logo-text">Öğrenciden Öğrenciye</span>
         
        </div>
        <div className="product-detail-unique-header-right">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="product-detail-unique-header-button"
            onClick={() => navigate("/new-ad")}
          >
            İlan Ver
          </Button>
          <Button
            type="text"
            icon={<HeartOutlined />}
            className="product-detail-unique-header-button"
            onClick={() => navigate("/favorites")}
          >
            Favorilerim
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="product-detail-unique-header-button"
            onClick={handleProfileClick}
          >
            Profilim
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="product-detail-unique-header-button"
            onClick={handleLogoutClick}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="product-detail-unique-content">
        <div className="product-detail-unique-left">
          <img
            src={`http://localhost:5181${product.imagePath}`}
            alt={product.title}
            className="product-detail-unique-image"
          />
        </div>
        <div className="product-detail-unique-right">
          <h2 className="product-detail-unique-title">{product.title}</h2>
          <p className="product-detail-unique-price">{product.price} TL</p>
          <p className="product-detail-unique-description">{product.description}</p>
          <div className="product-detail-unique-info">
            <p>
              <strong>Kategori:</strong> {product.category}
            </p>
            <p>
              <strong>Satıcı:</strong> {product.sellerName}
            </p>
            <p>
            <strong>İletişim:</strong> {product.sellerPhone || "Numara mevcut değil"}
          </p>
            <p>
              <strong>Yayınlanma Tarihi:</strong>{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button
            type="primary"
            className="product-detail-unique-contact-seller-button"
            onClick={() => navigate(`/messages/${product.sellerId}`)}
          >
            Satıcıyla İletişime Geç
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

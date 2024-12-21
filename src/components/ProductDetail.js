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
import "../styles/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

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
    <div className="product-detail-wrapper">
      {/* Header */}
      <header className="product-detail-header">
        <div className="logo-section" onClick={handleLogoClick}>
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
          <Input
            placeholder="Aradığınız ürün, kategori veya markayı yazınız.."
            className="search-input"
            allowClear
          />
        </div>
        <div className="header-right">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="header-button"
            onClick={() => navigate("/new-ad")}
          >
            İlan Ver
          </Button>
          <Button
            type="text"
            icon={<HeartOutlined />}
            className="header-button"
            onClick={() => navigate("/favorites")}
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
      <div className="product-detail-content">
        <div className="product-detail-left">
          <img
            src={`http://localhost:5181${product.imagePath}`}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-detail-right">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">{product.price} TL</p>
          <p className="product-description">{product.description}</p>
          <div className="product-info">
            <p>
              <strong>Kategori:</strong> {product.category}
            </p>
            <p>
              <strong>Satıcı:</strong> {product.sellerName}
            </p>
            <p>
              <strong>Yayınlanma Tarihi:</strong>{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button type="primary" className="contact-seller-button">
            Satıcıyla İletişime Geç
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

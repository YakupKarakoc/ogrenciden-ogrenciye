import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SecondHandItems.css";

function SecondHandItems() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]); // Favoriler listesi
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Favoriler ve ürünleri çek
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) throw new Error("Kullanıcı e-posta adresi bulunamadı.");
        const response = await axios.get("http://localhost:5181/api/Favorites", {
          params: { userEmail },
        });
        setFavorites(response.data.map((fav) => fav.product.productId)); // Favori ürün ID'leri
      } catch (error) {
        message.error("Favoriler alınırken bir hata oluştu!");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5181/api/Products");
        setProducts(response.data);
      } catch (error) {
        message.error("Ürünler alınırken hata oluştu!");
      }
    };

    fetchFavorites();
    fetchProducts();
  }, []);

  // Favoriye ekle/çıkar
  const toggleFavorite = async (productId) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      message.error("Kullanıcı e-posta adresi bulunamadı.");
      return;
    }

    try {
      if (favorites.includes(productId)) {
        // Favoriden çıkar
        await axios.delete(`http://localhost:5181/api/Favorites/${userEmail}/${productId}`);
        setFavorites((prev) => prev.filter((id) => id !== productId));
        message.success("Favorilerden kaldırıldı!");
      } else {
        // Favoriye ekle
        await axios.post("http://localhost:5181/api/Favorites", {
          userEmail,
          itemId: productId,
          itemType: "Product",
        });
        setFavorites((prev) => [...prev, productId]);
        message.success("Favorilere eklendi!");
      }
    } catch (error) {
      message.error("Favori işlemi sırasında bir hata oluştu!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleFavoritesPage = () => {
    navigate("/favorites");
  };

  const categories = [
    { icon: "📚", title: "Ders Materyalleri", items: ["Ders Kitapları", "Notlar"] },
    { icon: "💻", title: "Elektronik", items: ["Telefonlar", "Dizüstü Bilgisayarlar"] },
    { icon: "🛋️", title: "Ev ve Mobilya", items: ["Masa", "Sandalye"] },
    { icon: "👗", title: "Giyim ve Moda", items: ["Kadın Kıyafetleri", "Erkek Kıyafetleri"] },
    { icon: "🎮", title: "Spor ve Hobi", items: ["Spor Ekipmanları", "Müzik Aletleri"] },
    { icon: "📦", title: "Diğer", items: ["Evcil Hayvan Malzemeleri", "Seyahat Çantaları"] },
  ];

  return (
    <div className="second-hand-page">
      {/* Header */}
      <header className="second-hand-header">
        <div className="logo" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <Input
          placeholder="Aradığınız ürün, kategori veya markayı yazınız.."
          className="search-input"
          allowClear
        />
        <div className="header-buttons">
          <Button type="text" icon={<PlusCircleOutlined />} onClick={() => navigate("/new-ad")}>
            İlan Ver
          </Button>
          <Button type="text" icon={<UserOutlined />} onClick={handleProfile}>
            Hesabım
          </Button>
          <Button type="text" icon={<HeartOutlined />} onClick={handleFavoritesPage}>
            Favorilerim
          </Button>
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            Çıkış
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <div className="sidebar">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-title">{category.title}</h3>
            {hoveredCategory === index && (
              <div className="category-dropdown">
                <ul>
                  {category.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Product Cards */}
      <div className="ads-container">
        {products.length === 0 ? (
          <p>Henüz bir ilan bulunmuyor.</p>
        ) : (
          products.map((product) => (
            <div key={product.productId} className="ad-card">
              {favorites.includes(product.productId) ? (
                <HeartFilled
                  className="favorite-icon active"
                  onClick={() => toggleFavorite(product.productId)}
                />
              ) : (
                <HeartOutlined
                  className="favorite-icon"
                  onClick={() => toggleFavorite(product.productId)}
                />
              )}
              <div className="ad-image-container">
                <img
                  alt={product.title}
                  src={`http://localhost:5181${product.imagePath}`}
                  className="ad-image"
                />
              </div>
              <div className="ad-details">
                <div className="ad-title">{product.title}</div>
                <div className="ad-price">{product.price} TL</div>
                <div className="ad-description">{product.description}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SecondHandItems;

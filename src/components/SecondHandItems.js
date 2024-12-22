import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SecondHandItems.css";

function SecondHandItems() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleCategoryClick = (category, subCategory) => {
    if (subCategory) {
      navigate(`/category/${category}/${subCategory}`);
    } else {
      navigate(`/category/${category}`);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) throw new Error("Kullanıcı e-posta adresi bulunamadı.");
        const response = await axios.get("http://localhost:5181/api/ProductFavorite", {
          params: { userEmail },
        });
        setFavorites(response.data.map((fav) => fav.product.productId));
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      message.warning("Lütfen arama yapmak için bir kelime girin.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5181/api/Products/Search", {
        params: { query: searchQuery },
      });
      setProducts(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        message.info("Aradığınız kritere uygun ürün bulunamadı.");
      } else {
        message.error("Arama sırasında bir hata oluştu.");
      }
    }
  };
  const toggleFavorite = async (productId) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      message.error("Kullanıcı e-posta adresi bulunamadı.");
      return;
    }
  
    try {
      if (favorites.includes(productId)) {
        await axios.delete(`http://localhost:5181/api/ProductFavorite/${userEmail}/${productId}`);
        setFavorites((prev) => prev.filter((id) => id !== productId));
        message.success("Favorilerden kaldırıldı!");
      } else {
        await axios.post("http://localhost:5181/api/ProductFavorite", {
          userEmail,
          productId,
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

  const handleMyAds = () => {
    navigate("/my-ads");
  };

  const handleNewAd = () => {
    navigate("/new-ad");
  };

  const categories = [
    { icon: "📚", title: "Ders Materyalleri", items: ["Ders Kitapları", "Kırtasiye Malzemeleri"] },
    { icon: "💻", title: "Elektronik", items: ["Telefonlar", "Bilgisayar&Tablet&TV", "Beyaz Eşya", "Elektronik Gereçler"] },
    { icon: "🛋️", title: "Ev ve Mobilya", items: ["Ev Gereçleri", "Mobilya"] },
    { icon: "👗", title: "Giyim ve Moda", items: ["Kadın Kıyafetleri", "Erkek Kıyafetleri"] },
    { icon: "🎮", title: "Spor ve Hobi", items: ["Spor Ekipmanları", "Müzik Aletleri"] },
    { icon: "📦", title: "Kozmetik", items: ["Parfüm&Deodorant", "Kişisel Bakım"] },
    { icon: "📦", title: "Diğer", items: ["Ayakkabı", "Çanta"] },
  ];

  return (
    <div className="second-hand-page">
      <header className="second-hand-header">
        <div className="header-logo-section">
          <img src="/images/logo.jpg" alt="Logo" className="logo" onClick={() => navigate("/home")} />
          <span className="header-logo-text" onClick={() => navigate("/home")}>Öğrenciden Öğrenciye</span>
          <Input
            placeholder="Aradığınız ürün, kategori veya markayı yazınız.."
            className="header-search-input"
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="search-button"
            onClick={handleSearch}
          >
            Ara
          </Button>
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
          <div
            className="account-dropdown-container"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <Button type="text" icon={<UserOutlined />} className="header-button">
              Hesabım
            </Button>
            {isDropdownVisible && (
              <div className="account-dropdown">
                <div onClick={handleProfile}>Kullanıcı Bilgilerim</div>
                <div onClick={handleMyAds}>İlanlarım</div>
                <div onClick={() => navigate("/messages")}>Mesajlarım</div>
              </div>
            )}
          </div>
          <Button
            type="text"
            icon={<HeartOutlined />}
            className="header-button"
            onClick={handleFavoritesPage}
          >
            Favorilerim
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

      <div className="sidebar">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(category.title)}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-title">{category.title}</h3>
            {hoveredCategory === index && (
              <div className="category-dropdown">
                <ul>
                  {category.items.map((item, idx) => (
                    <li key={idx} onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.title, item);
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="second-ads-container">
        {products.length === 0 ? (
          <p>Henüz bir ilan bulunmuyor.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="secondhand-ad-card"
              onClick={() => navigate(`/products/${product.productId}`)}
            >
              {favorites.includes(product.productId) ? (
                <HeartFilled
                  className="favorite-icon active"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.productId);
                  }}
                />
              ) : (
                <HeartOutlined
                  className="favorite-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.productId);
                  }}
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

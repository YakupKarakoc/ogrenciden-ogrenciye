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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryItems.css";

function CategoryPageItems() {
  const { category, subCategory } = useParams(); // subCategory'yi ekledik
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showItems, setShowItems] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5181/api/Products/category/${category}/${subCategory || ""}`
        );
        setProducts(response.data);
      } catch (error) {
        message.error("\u00dcr\u00fcnler y\u00fcklenirken bir hata olu\u015ftu.");
      }
    };
    fetchProducts();
  }, [category, subCategory]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      message.warning("L\u00fctfen arama yapmak i\u00e7in bir kelime girin.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5181/api/Products/Search`,
        { params: { query: searchQuery } }
      );
      setProducts(response.data);
    } catch (error) {
      message.error("Arama s\u0131ras\u0131nda bir hata olu\u015ftu.");
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCategoryClick = (mainCategory, subCategory = null) => {
    if (subCategory) {
      navigate(`/category/${mainCategory}/${subCategory}`);
    } else {
      navigate(`/category/${mainCategory}`);
    }
  };

  const categories = [
    { icon: "\ud83d\udcda", title: "Ders Materyalleri", items: ["Ders Kitaplar\u0131", "K\u0131rtasiye Malzemeleri"] },
    { icon: "\ud83d\udcb3", title: "Elektronik", items: ["Telefonlar", "Bilgisayar&Tablet&TV", "Beyaz E\u015fya", "Elektronik Gere\u00e7ler"] },
    { icon: "\ud83d\udecb", title: "Ev ve Mobilya", items: ["Ev Gere\u00e7leri", "Mobilya"] },
    { icon: "\ud83d\udc57", title: "Giyim ve Moda", items: ["Kad\u0131n K\u0131yafetleri", "Erkek K\u0131yafetleri"] },
    { icon: "\ud83c\udfae", title: "Spor ve Hobi", items: ["Spor Ekipmanlar\u0131", "M\u00fczik Aletleri"] },
    { icon: "\ud83d\udce6", title: "Kozmetik", items: ["Parf\u00fcm&Deodorant", "Ki\u015fisel Bak\u0131m"] },
    { icon: "\ud83d\udce6", title: "Di\u011fer", items: ["Ayakkab\u0131", "\u00c7anta"] },
  ];

  return (
    <div className="page-items-container">
      <header className="page-items-header">
        <div className="header-logo-section" onClick={() => navigate("/home")}>          
          <img src="/images/logo.jpg" alt="Logo" className="logo-section-image" />
          <span className="logo-section-text">\u00d6\u011frenciden \u00d6\u011frenciye</span>
          <Input
            placeholder="Ne aram\u0131\u015ft\u0131n\0131z ?"
            className="header-search-input"
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="header-search-button"
            onClick={handleSearch}
          >
            Ara
          </Button>
        </div>
        <div className="header-action-buttons">
          <Button icon={<PlusCircleOutlined />} onClick={() => navigate("/new-ad")} className="header-button">\u0130lan Ver</Button>
          <Button icon={<UserOutlined />} onClick={() => navigate("/profile")} className="header-button">Profilim</Button>
          <Button icon={<LogoutOutlined />} onClick={() => navigate("/login")} className="header-button">\u00c7\u0131k\u0131\u015f</Button>
        </div>
      </header>

      <div className="page-items-content">
        <div className="page-items-sidebar">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="sidebar-card"
              onMouseEnter={() => setShowItems(index)}
              onMouseLeave={() => setShowItems(null)}
            >
              <div className="sidebar-icon">{cat.icon}</div>
              <h3 className="sidebar-title">{cat.title}</h3>
              {showItems === index && (
                <ul className="sidebar-items">
                  {cat.items.map((item, idx) => (
                    <li key={idx} onClick={() => handleCategoryClick(cat.title, item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="page-items-products">
          <h2 className="products-title">
            {subCategory ? `${category} > ${subCategory}` : category}
          </h2>
          <div className="products-container">
            {products.length === 0 ? (
              <p className="no-products-text">Bu kategoride hen\u00fcz \u00fcr\u00fcn bulunmuyor.</p>
            ) : (
              products.map((product) => (
                <div key={product.productId} className="product-card">
                  <img
                    src={`http://localhost:5181${product.imagePath}`}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">{product.price} TL</p>
                    <p className="product-description">{product.description}</p>
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
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPageItems;

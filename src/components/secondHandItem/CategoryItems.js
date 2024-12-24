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
import "../../styles/secondHandItems/categoryItems.css";

function CategoryItems() {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showItems, setShowItems] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5181/api/Products/category/${category}/${subCategory || ""}`
        );
        setProducts(response.data);
      } catch (error) {
        message.error("Ürünler yüklenirken bir hata oluştu.");
      }
    };

    

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

    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5181/api/Products/category/${category}/${subCategory || ""}`);
        setProducts(response.data);
      } catch (error) {
        message.error("Kategorideki ürünler alınırken bir hata oluştu.");
      }
    };

    fetchCategoryProducts();
    fetchFavorites();
    fetchProducts();
  }, [category, subCategory]);

 
  

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
      message.success("Arama tamamlandı.");
    } catch (error) {
      if (error.response?.status === 404) {
        message.info("Arama kriterine uygun bir ürün bulunamadı.");
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

  const handleCategoryClick = (mainCategory, subCategory = null) => {
    if (subCategory) {
      navigate(`/category/${mainCategory}/${subCategory}`);
    } else {
      navigate(`/category/${mainCategory}`);
    }
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
    <div className="category-items-page-container">
      <header className="category-items-page-header">
        <div
          className="category-header-logo-section"
         
        >
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="category-logo-image"
            onClick={() => navigate("/home")}
          />
          <span className="category-logo-text"  onClick={() => navigate("/home")}>Öğrenciden Öğrenciye</span>
          <Input
            placeholder="Aradığınız ürün, kategori veya markayı yazınız.."
            className="category-search-input"
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="category-search-button"
            onClick={handleSearch}
          >
            Ara
          </Button>
        </div>
        <div className="category-header-action-buttons">
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => navigate("/new-ad")}
            className="category-header-button"
          >
            İlan Ver
          </Button>
          <div
            className="category-account-dropdown-container"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <Button type="text" icon={<UserOutlined />} className="category-header-button">
              Hesabım
            </Button>
            {isDropdownVisible && (
              <div className="category-account-dropdown">
                <div onClick={() => navigate("/profile")}>Kullanıcı Bilgilerim</div>
                <div onClick={() => navigate("/my-ads")}>İlanlarım</div>
                <div onClick={() => navigate("/messages")}>Mesajlarım</div>
              </div>
            )}
          </div>
          <Button
            type="text"
            icon={<HeartOutlined />}
            className="category-header-button"
            onClick={() => navigate("/favorites")}
          >
            Favorilerim
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={() => navigate("/login")}
            className="category-header-button"
          >
            Çıkış
          </Button>
        </div>
      </header>

      <div className="category-items-page-content">
        <div className="category-items-sidebar">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-sidebar-card"
              onMouseEnter={() => setShowItems(index)}
              onMouseLeave={() => setShowItems(null)}
            >
            <div className="category-sidebar-icon">{cat.icon}</div>
              <div
                className="category-sidebar-title"
                onClick={() => handleCategoryClick(cat.title)}
              >
               {cat.title}
              </div>
              {showItems === index && (
                <ul className="category-sidebar-items">
                  {cat.items.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleCategoryClick(cat.title, item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="category-items-products">
          <h2 className="category-products-title">
            {subCategory ? `${category} -- ${subCategory}` : category}
          </h2>
          <div className="category-products-container">
            {products.length === 0 ? (
              <p className="category-no-products-text">
                Bu kategoride henüz ürün bulunmuyor.
              </p>
            ) : (
              products.map((product) => (
                <div
                  key={product.productId}
                  className="category-product-card"
                  onClick={() => navigate(`/products/${product.productId}`)}
                >
                  {favorites.includes(product.productId) ? (
                    <HeartFilled
                      className="category-favorite-icon active"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.productId);
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      className="category-favorite-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.productId);
                      }}
                    />
                  )}
                  <img
                    src={`http://localhost:5181${product.imagePath}`}
                    alt={product.title}
                    className="category-product-image"
                  />
                  <div className="category-product-info">
                    <h3 className="category-product-title">{product.title}</h3>
                    <p className="category-product-price">{product.price} TL</p>
                    <p className="category-product-description">
                      {product.description}
                    </p>
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

export default CategoryItems;

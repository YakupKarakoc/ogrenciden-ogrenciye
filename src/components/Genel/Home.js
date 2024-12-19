import React from "react";
import { Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/Genel/Home.css";

function Home() {
  const navigate = useNavigate();

  const modules = [
    {
      title: "İkinci El Eşya Alım Satım",
      image: "/images/ikincielesya.webp",
      link: "/ikincielesya",
      description: [
        "Ders kitapları, elektronik eşyalar ve kıyafetler gibi eşyaları listeleyin.",
        "Kategori ve fiyat filtreleri ile arama yapın.",
        "Yapay zeka destekli fiyat önerisi alın.",
      ],
    },
    {
      title: "Ders İlanı Verme",
      image: "/images/dersilani2.webp",
      link: "/dersilani2",
      description: [
        "Özel ders veya grup çalışmaları için ilan verin.",
        "Ders kategorisine göre arama yapılabilir.",
        "Eğitim hizmetleri için geniş bir öğrenci kitlesine ulaşın.",
      ],
    },
    {
      title: "Ders Notu Paylaşma",
      image: "/images/notpaylasim.webp",
      link: "/notpaylasim",
      description: [
        "Ders notlarınızı paylaşarak diğer öğrencilere yardımcı olun.",
        "1-5 yıldız arasında puanlama sistemi ile notlarınızı değerlendirin.",
        "Yüksek puan alan notlar 'Trend Notlar' bölümünde öne çıkar.",
      ],
    },
    {
      title: "Ev Arkadaşı Bulma",
      image: "/images/evarkadasi.webp",
      link: "/evarkadasi",
      description: [
        "Profil analizi ile benzer karakterdeki kişilerle eşleşin.",
        "Ev arkadaşı arayışınızı duyurmak için ilan oluşturun.",
        "İlgilenenlerle doğrudan iletişim kurun.",
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <header className="home-header">
        <div className="logo-section" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="header-buttons">
          <Button
            type="default"
            icon={<UserOutlined />}
            onClick={handleProfile}
            className="header-button"
          >
            Hesabım
          </Button>
          <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="header-button"
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Modül Kartları */}
      <div className="modules-container">
        {modules.map((mod, index) => (
          <div
            key={index}
            className="module-card"
            onClick={() => navigate(mod.link)}
          >
            <img src={mod.image} alt={mod.title} className="module-image" />
            <h2 className="module-title">{mod.title}</h2>
            <ul className="module-description">
              {mod.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect } from "react";
import { Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

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
      link: "/survey",
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

  const handleModuleClick = (link) => {
    if (link === "/survey") {
      // Ev Arkadaşı Bulma'ya tıklanınca sayfayı yenile ve sonra modüle git
      sessionStorage.setItem("homeReloaded", "true");
      window.location.href = link; // Hem yenile hem de modüle git
    } else {
      navigate(link); // Diğer modüller için doğrudan yönlendirme
    }
  };

  useEffect(() => {
    const homeReloaded = sessionStorage.getItem("homeReloaded");
    if (homeReloaded === "true") {
      sessionStorage.removeItem("homeReloaded");
    }
  }, []);

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <header className="home-header">
        <div className="home-logo-section" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="home-logo" />
          <span className="home-logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="home-header-buttons">
          <Button
            type="default"
            icon={<UserOutlined />}
            onClick={handleProfile}
            className="home-header-button"
          >
            Hesabım
          </Button>
          <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="home-header-button"
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Modül Kartları */}
      <div className="home-modules-container">
        {modules.map((mod, index) => (
          <div
            key={index}
            className="home-module-card"
            onClick={() => handleModuleClick(mod.link)}
          >
            <img src={mod.image} alt={mod.title} className="home-module-image" />
            <h2 className="home-module-title">{mod.title}</h2>
            <ul className="home-module-description">
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

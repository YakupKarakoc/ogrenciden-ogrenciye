import React from "react";
import { Input, Button, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined, PlusCircleOutlined, SearchOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/EvArkadasi/EvArkadasi.css";

function EvArkadasi() {
  const navigate = useNavigate();

  const accountMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate("/profile")}>Kullanıcı Bilgilerim</Menu.Item>
      <Menu.Item onClick={() => navigate("/myads")}>İlanlarım</Menu.Item>
      <Menu.Item onClick={() => navigate("/messages")}>Mesajlarım</Menu.Item>
    </Menu>
  );

  return (
    <div className="evarkadasi-wrapper">
      {/* Header */}
      <header className="evarkadasi-header">
        <div className="logo-section" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="header-middle">
          <Input
            placeholder="Aradığınız ürünü, kategori veya markayı yazın..."
            prefix={<SearchOutlined />}
            className="search-input"
          />
        </div>
        <div className="header-right">
          <Button
            className="header-button"
            onClick={() => navigate("/favorites")}
          >
            <HeartOutlined /> Favorilerim
          </Button>
          <Button
            className="header-button"
            onClick={() => navigate("/add")}
          >
            <PlusCircleOutlined /> İlan Ver
          </Button>
          <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
            <Button className="header-button">
              <UserOutlined /> Hesabım
            </Button>
          </Dropdown>
          <Button
            className="header-button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <LogoutOutlined /> Çıkış
          </Button>
        </div>
      </header>

      {/* Alt Kısım (Henüz Boş Bırakıldı) */}
      <div className="evarkadasi-content">
        {/* Burada tasarımlar adım adım yapılacak */}
      </div>
    </div>
  );
}

export default EvArkadasi;

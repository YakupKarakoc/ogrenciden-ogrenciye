import React, { useState } from "react";
import { Input, Button, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/UniqueEvArkadasi.css"

function UniqueEvArkadasi() {
  const navigate = useNavigate();

  const accountMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate("/profile")}>Kullanıcı Bilgilerim</Menu.Item>
      <Menu.Item onClick={() => navigate("/my-ads")}>İlanlarım</Menu.Item>
      <Menu.Item onClick={() => navigate("/messages")}>Mesajlarım</Menu.Item>
    </Menu>
  );

  return (
    <div className="unique-evarkadasi-wrapper">
      <header className="unique-evarkadasi-header">
        <div className="unique-logo-section" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="unique-logo" />
          <span className="unique-logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="unique-header-middle">
          <Input
            placeholder="Aradığınız ilanı yazın..."
            prefix={<SearchOutlined />}
            className="unique-search-input"
          />
        </div>
        <div className="unique-header-right">
          <Button
            type="primary"
            className="unique-header-button"
            icon={<PlusCircleOutlined />}
            onClick={() => navigate("/new-ad")}
          >
            İlan Ver
          </Button>
          <Dropdown overlay={accountMenu} placement="bottomCenter" arrow>
            <Button
              type="text"
              className="unique-header-button"
              icon={<UserOutlined />}
            >
              Hesabım
            </Button>
          </Dropdown>
          <Button
            type="text"
            className="unique-header-button"
            icon={<HeartOutlined />}
            onClick={() => navigate("/favorites")}
          >
            Favorilerim
          </Button>
          <Button
            type="text"
            className="unique-header-button"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Çıkış
          </Button>
        </div>
      </header>

      <div className="unique-evarkadasi-content">
        <div className="unique-ads-container">
          <p>Henüz bir ilan bulunmuyor.</p>
        </div>
      </div>
    </div>
  );
}

export default UniqueEvArkadasi;

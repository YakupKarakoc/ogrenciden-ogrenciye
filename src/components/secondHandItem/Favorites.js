import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { LogoutOutlined, UserOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/secondHandItems/FavoritesPage.css";

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Arama sorgusu
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async (query = "") => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail) {
                throw new Error("Kullanıcı e-posta adresi bulunamadı.");
            }

            const response = await axios.get(`http://localhost:5181/api/ProductFavorite`, {
                params: { userEmail, query }, // Arama sorgusu parametre olarak gönderiliyor
            });

            if (response.data.length === 0 && query) {
                message.warning("Bu ürün favorilerinizde yok. Tüm favoriler gösteriliyor.");
                fetchFavorites(); // Tüm favorileri yeniden yükle
                return;
            }

            setFavorites(response.data);
        } catch (error) {
            message.error("Favoriler alınırken bir hata oluştu!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleProfile = () => {
        navigate("/profile");
    };

    const handleSearch = () => {
        fetchFavorites(searchQuery); // Arama butonuna basıldığında favoriler güncellenir
    };

    const removeFavorite = async (productId) => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            message.error("Kullanıcı e-posta adresi bulunamadı.");
            return;
        }

        try {
            await axios.delete(`http://localhost:5181/api/ProductFavorite/${userEmail}/${productId}`);
            setFavorites((prev) => prev.filter((fav) => fav.product.productId !== productId));
            message.success("Favorilerden kaldırıldı!");
        } catch (error) {
            message.error("Favori kaldırma sırasında bir hata oluştu!");
        }
    };

    return (
        <div className="favorites-page-wrapper">
            {/* Header */}
            <header className="favorites-page-header">
                <div className="favorites-header-logo-section" onClick={() => navigate("/home")}>
                    <img src="/images/logo.jpg" alt="Logo" className="favorites-logo" />
                    <span className="favorites-header-logo-text">Öğrenciden Öğrenciye</span>
                </div>
                <div className="favorites-header-search-container">
                    <Input
                        placeholder="Favorilerimde ara"
                        className="favorites-header-search-input"
                        allowClear
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Ara
                    </Button>
                </div>
                <div className="favorites-header-buttons">
                    <Button
                        type="text"
                        icon={<UserOutlined />}
                        className="favorites-header-button"
                        onClick={handleProfile}
                    >
                        Hesabım
                    </Button>
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        className="favorites-header-button"
                        onClick={handleLogout}
                    >
                        Çıkış
                    </Button>
                </div>
            </header>

            {/* Title */}
            <h1 className="favorites-page-title">Favorilerim</h1>

            {/* Favorites Grid */}
            <div className="favorites-grid-container">
                {favorites.length === 0 ? (
                    <p>Henüz favori eklenmemiş.</p>
                ) : (
                    favorites.map((fav) => (
                        <div key={fav.favoriteId} className="favorites-card" onClick={() => navigate(`/products/${fav.product.productId}`)}>
                            <HeartFilled
                                className="favorites-card-icon active"
                                onClick={() => removeFavorite(fav.product.productId)}
                            />
                            <div className="favorites-card-image-container">
                                <img
                                    src={`http://localhost:5181${fav.product.imagePath}`}
                                    alt={fav.product.title}
                                    className="favorites-card-image"
                                />
                            </div>
                            <div className="favorites-card-details">
                                <h3 className="favorites-card-title">{fav.product.title}</h3>
                                <p className="favorites-card-price">{fav.product.price} TL</p>
                                <p className="favorites-card-description">{fav.product.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FavoritesPage;

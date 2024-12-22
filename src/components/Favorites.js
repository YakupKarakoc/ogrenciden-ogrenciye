import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { LogoutOutlined, UserOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Favorites.css";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const userEmail = localStorage.getItem("userEmail");
                if (!userEmail) {
                    throw new Error("Kullanıcı e-posta adresi bulunamadı.");
                }

                const response = await axios.get(`http://localhost:5181/api/ProductFavorite`, {
                    params: { userEmail },
                });
                setFavorites(response.data);
            } catch (error) {
                message.error("Favoriler alınırken bir hata oluştu!");
            }
        };

        fetchFavorites();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleProfile = () => {
        navigate("/profile");
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
        <div className="favorites-page">
            {/* Header */}
            <header className="favorites-header">
                <div className="header-logo-section" onClick={() => navigate("/home")}>
                    <img src="/images/logo.jpg" alt="Logo" className="logo" />
                    <span className="header-logo-text">Öğrenciden Öğrenciye</span>
                </div>
                <Input
                    placeholder="Aradığınız ürün, kategori veya markayı yazınız.."
                    className="header-search-input"
                    allowClear
                />
                <div className="header-buttons">
                    <Button
                        type="text"
                        icon={<UserOutlined />}
                        className="header-button"
                        onClick={handleProfile}
                    >
                        Hesabım
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

            {/* Title */}
            <h1 className="favorites-title">Favorilerim</h1>

            {/* Favorites Grid */}
            <div className="favorites-container">
                {favorites.length === 0 ? (
                    <p>Henüz favori eklenmemiş.</p>
                ) : (
                    favorites.map((fav) => (
                        <div key={fav.favoriteId} className="favorite-card">
                            <HeartFilled
                                className="favorite-icon active"
                                onClick={() => removeFavorite(fav.product.productId)}
                            />
                            <div className="favorite-image-container">
                                <img
                                    src={`http://localhost:5181${fav.product.imagePath}`}
                                    alt={fav.product.title}
                                    className="favorite-image"
                                />
                            </div>
                            <div className="favorite-details">
                                <h3 className="favorite-title">{fav.product.title}</h3>
                                <p className="favorite-price">{fav.product.price} TL</p>
                                <p className="favorite-description">{fav.product.description}</p>
                                <p className="favorite-seller">Satıcı: {fav.product.sellerName}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Favorites;

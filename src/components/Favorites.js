import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
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
      
            const response = await axios.get(`http://localhost:5181/api/Favorites`, {
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

    return (
        <div className="favorites-page">
            <header className="favorites-header">
                <h1>Favorilerim</h1>
                <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    Çıkış
                </Button>
            </header>
            <div className="favorites-container">
                {favorites.length === 0 ? (
                    <p>Henüz favori eklenmemiş.</p>
                ) : (
                    favorites.map((fav) => (
                        <div key={fav.favoriteId} className="favorite-card">
                            <h3>Favori ID: {fav.itemId}</h3>
                            <p>Tip: {fav.itemType}</p>
                            <p>Eklenme Tarihi: {new Date(fav.addedDate).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Favorites;

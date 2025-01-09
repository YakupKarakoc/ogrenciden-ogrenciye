import React, { useState, useEffect } from "react";
import { Input, Button, message, Select } from "antd";
import { UserOutlined, LogoutOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/houseMates/UniqueEvArkadasi.css";

const { Option } = Select;

function UniqueEvArkadasi() {
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [filters, setFilters] = useState({
        city: "",
        roomCount: "",
        minPrice: "",
        maxPrice: "",
    });

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get("http://localhost:5181/api/RoommateAds/All");
                setAds(response.data);
            } catch (error) {
                message.error("İlanlar alınırken bir hata oluştu!");
            }
        };
        fetchAds();
    }, []);

    const applyFilters = async () => {
        try {
            const params = {};

            // Yalnızca doldurulan filtreleri ekle
            if (filters.city) params.city = filters.city;
            if (filters.roomCount) params.roomCount = filters.roomCount;
            if (filters.minPrice) params.minPrice = filters.minPrice;
            if (filters.maxPrice) params.maxPrice = filters.maxPrice;

            // API isteği
            const response = await axios.get("http://localhost:5181/api/RoommateAds/Search", { params });
            setAds(response.data);
        } catch (error) {
            message.error("Filtreleme sırasında bir hata oluştu!");
        }
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        // Harf kontrolü: Sadece harflerin kabul edilmesini sağlar
        if (/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]*$/.test(value) || value === "") {
            setFilters({ ...filters, city: value });
        }
    };

    return (
        <div className="unique-evarkadasi-wrapper">
            {/* Header */}
            <header className="unique-evarkadasi-header">
                <div className="unique-logo-section" onClick={() => navigate("/home")}>
                    <img src="/images/logo.jpg" alt="Logo" className="unique-logo" />
                    <span className="unique-logo-text">Öğrenciden Öğrenciye</span>
                </div>
                <div className="unique-header-right">
                    <Button
                        type="primary"
                        className="unique-header-button"
                        icon={<PlusCircleOutlined />}
                        onClick={() => navigate("/newroommatead")}
                    >
                        İlan Ver
                    </Button>
                    <Button
                        type="text"
                        className="unique-header-button"
                        icon={<UserOutlined />}
                        onClick={() => navigate("/profile")} // Hesabım butonuna tıklanıldığında profile yönlendir
                    >
                        Hesabım
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

            {/* Content */}
            <div className="unique-evarkadasi-content">
                {/* Filters Section */}
                <aside className="filter-section">
                    <h3>Filtrele</h3>
                    <Input
                        placeholder="Şehir"
                        value={filters.city}
                        onChange={handleCityChange} // Şehir girişine harf kontrolü eklendi
                    />
                    <Select
                        placeholder="Oda Sayısı"
                        value={filters.roomCount || undefined}
                        onChange={(value) => setFilters({ ...filters, roomCount: value })}
                        style={{ width: "100%", marginBottom: "10px" }}
                    >
                        <Option value="1+1">1+1</Option>
                        <Option value="2+1">2+1</Option>
                        <Option value="3+1">3+1</Option>
                        <Option value="4+1">4+1</Option>
                    </Select>
                    <Input
                        type="number"
                        placeholder="Min Fiyat"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="Max Fiyat"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                    <Button type="primary" onClick={applyFilters}>
                        Filtrele
                    </Button>
                </aside>

                {/* Ads Section */}
                <main className="ads-section">
                    {ads.length === 0 ? (
                        <p>Henüz bir ilan bulunmuyor.</p>
                    ) : (
                        <table className="ads-table">
                            <thead>
                                <tr>
                                    <th>İlan Başlığı</th>
                                    <th>Metrekare</th>
                                    <th>Oda Sayısı</th>
                                    <th>Fiyat</th>
                                    <th>İlan Tarihi</th>
                                    <th>Şehir / İlçe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads.map((ad) => (
                                    <tr key={ad.adId} onClick={() => navigate(`/roommatead/${ad.adId}`)}>
                                        <td>
                                            <div className="ad-title-cell">
                                                <img
                                                    src={ad.imagePath || "/images/default.jpg"}
                                                    alt={ad.title}
                                                    className="ad-thumbnail"
                                                />
                                                <span>{ad.title}</span>
                                            </div>
                                        </td>
                                        <td>{ad.squareMeters} m²</td>
                                        <td>{ad.roomCount}</td>
                                        <td>{ad.rentPrice} TL</td>
                                        <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {ad.city}, {ad.district}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </main>
            </div>
        </div>
    );
}

export default UniqueEvArkadasi;

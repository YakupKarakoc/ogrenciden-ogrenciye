import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin, message, Button } from "antd";
import "../../styles/houseMates/EvIlaniDetayi.css";

function EvIlaniDetayi() {
    const { id } = useParams(); // Rotadan id'yi al
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5181/api/RoommateAds/${id}`);
                setAd(response.data);
                setLoading(false);
            } catch (error) {
                message.error("İlan detayları alınırken bir hata oluştu!");
                setLoading(false);
            }
        };

        fetchAdDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <Spin tip="Yükleniyor..." />
            </div>
        );
    }

    if (!ad) {
        return <p>İlan bulunamadı!</p>;
    }

    return (
        <div className="ev-ilani-detayi-wrapper">
            <header className="detail-header">
                <h1>{ad.title}</h1>
                <Button onClick={() => navigate("/uniqueevarkadasi")}>Geri Dön</Button>
            </header>
            <div className="detail-content">
                <img
                    src={ad.imagePath || "/images/default.jpg"}
                    alt="Ev Resmi"
                    className="detail-image"
                />
                <div className="detail-info">
                    <p>
                        <strong>İlan Sahibi:</strong> {ad.uploaderName}
                    </p>
                    <p>
                        <strong>İletişim:</strong> {ad.uploaderPhone}
                    </p>
                    <p>
                        <strong>Açıklama:</strong> {ad.description}
                    </p>
                    <p>
                        <strong>Şehir / İlçe:</strong> {ad.city}, {ad.district}
                    </p>
                    <p>
                        <strong>Oda Sayısı:</strong> {ad.roomCount}
                    </p>
                    <p>
                        <strong>Metrekare:</strong> {ad.squareMeters} m²
                    </p>
                    <p>
                        <strong>Fiyat:</strong> {ad.rentPrice} TL
                    </p>
                    <p>
                        <strong>Cinsiyet Tercihi:</strong> {ad.genderPreference}
                    </p>
                </div>
            </div>
            <footer className="detail-footer">
                <Button
                    type="primary"
                    onClick={() => navigate(`/messages/${ad.adId}`)}
                >
                    Ev Sahibine Ulaş
                </Button>
            </footer>
        </div>
    );
}

export default EvIlaniDetayi;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, message } from "antd";


function EvIlaniDetayi() {
    const { id } = useParams(); // Get the ID from the route
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
        return <Spin tip="Yükleniyor..." />;
    }

    if (!ad) {
        return <p>İlan bulunamadı!</p>;
    }

    return (
        <div className="evilani-detayi-wrapper">
            <h1>{ad.title}</h1>
            <div className="ad-details">
                <img src={ad.imagePath || "/images/default.jpg"} alt="Ev Resmi" className="ad-image" />
                <div className="ad-info">
                    <p><strong>Açıklama:</strong> {ad.description}</p>
                    <p><strong>Şehir / İlçe:</strong> {ad.city}, {ad.district}</p>
                    <p><strong>Oda Sayısı:</strong> {ad.roomCount}</p>
                    <p><strong>Metrekare:</strong> {ad.squareMeters} m²</p>
                    <p><strong>Fiyat:</strong> {ad.rentPrice} TL</p>
                    <p><strong>Cinsiyet Tercihi:</strong> {ad.genderPreference}</p>
                </div>
            </div>
        </div>
    );
}

export default EvIlaniDetayi;

import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import "../../styles/houseMates/recommendations.css";

const { Meta } = Card;

function Recommendations({ userId }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Hata durumunu kontrol etmek için

  useEffect(() => {
    fetch(`/api/RoommateAds/Recommended?userId=${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Önerilen ilanlar alınırken bir hata oluştu!");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success === false && data.message) {
          setError(data.message); // Backend'den gelen hata mesajını sakla
        } else if (Array.isArray(data)) {
          setAds(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Önerilen ilanlar alınırken bir hata oluştu!");
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return (
      <div className="recommendations-wrapper">
        <h2>Önerilen İlanlar</h2>
        <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
          {error}
        </p>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="recommendations-wrapper">
        <h2>Önerilen İlanlar</h2>
        <p style={{ textAlign: "center" }}>Önerilen ilan bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="recommendations-wrapper">
      <h2>Sizin İçin Önerilen İlanlar</h2>
      <div className="ads-container">
        {ads.map((ad) => (
          <Card
            key={ad.adId}
            hoverable
            cover={
              <img
                alt="Ev Fotoğrafı"
                src={ad.imagePath || "/images/default.jpg"}
              />
            }
          >
            <Meta
              title={ad.title}
              description={`${ad.city}, ${ad.district} - ${ad.rentPrice} TL`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;

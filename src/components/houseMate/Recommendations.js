import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/houseMates/recommendations.css";

const { Meta } = Card;

function Recommendations({ userId }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          setError(data.message);
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
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="recommendations-wrapper">
        <h2>Önerilen İlanlar</h2>
        <p className="no-ads-message">Önerilen ilan bulunamadı.</p>
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
            onClick={() => navigate(`/roommatead/${ad.adId}`)}
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

import React, { useEffect, useState } from "react";
import { Card } from "antd";

const { Meta } = Card;

function Recommendations({ userId }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch(`/api/roommatead/recommendations/${userId}`)
      .then((res) => res.json())
      .then((data) => setAds(data))
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div className="recommendations-wrapper">
      <h2>Sizin İçin Önerilen İlanlar</h2>
      <div className="ads-container">
        {ads.map((ad) => (
          <Card
            key={ad.id}
            hoverable
            cover={
              <img
                alt="Ev Fotoğrafı"
                src={ad.photo || "/images/default.jpg"}
              />
            }
          >
            <Meta title={`${ad.address}`} description={ad.price} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;

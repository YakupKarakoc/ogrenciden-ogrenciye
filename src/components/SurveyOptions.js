import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/SurveyOptions.css";

const { Title } = Typography;

function SurveyOptions() {
  const navigate = useNavigate();

  return (
    <div className="survey-options-wrapper">
      <div className="left-side">
        <Title level={2} className="survey-title">
          Önerilen İlanlar
        </Title>
        <Button
          type="primary"
          size="large"
          className="option-button"
          onClick={() => navigate("/recommendations")}
        >
          Git
        </Button>
      </div>
      <div className="right-side">
        <Title level={2} className="survey-title">
          Bütün İlanlar
        </Title>
        <Button
          type="default"
          size="large"
          className="option-button"
          onClick={() => navigate("/uniqueEvArkadasi")}
        >
          Git
        </Button>
      </div>
    </div>
  );
}

export default SurveyOptions;

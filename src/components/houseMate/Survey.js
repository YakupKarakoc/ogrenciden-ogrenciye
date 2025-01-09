import React, { useState, useEffect } from "react";
import { Button, Slider, Form, Row, Col, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/houseMates/Survey.css";

const { Title, Text } = Typography;

function Survey({ userId }) {
  const navigate = useNavigate();

  // Varsayılan state
  const defaultAnswers = {
    question1: 3,
    question2: 3,
    question3: 3,
    question4: 3,
    question5: 3,
    question6: 3,
    question7: 3,
    question8: 3,
    question9: 3,
    question10: 3,
  };

  const [answers, setAnswers] = useState(defaultAnswers);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await fetch(`/api/usersurvey/${userId}`);
        if (!response.ok) {
          throw new Error("Anket verileri alınamadı.");
        }
        const data = await response.json();
  
        // Gelen verileri state'e aktar
        setAnswers({
          question1: data.question1 ?? 3,
          question2: data.question2 ?? 3,
          question3: data.question3 ?? 3,
          question4: data.question4 ?? 3,
          question5: data.question5 ?? 3,
          question6: data.question6 ?? 3,
          question7: data.question7 ?? 3,
          question8: data.question8 ?? 3,
          question9: data.question9 ?? 3,
          question10: data.question10 ?? 3,
        });
      } catch (error) {
        console.error("Anket yükleme hatası:", error);
        message.error("Anket yüklenirken bir hata oluştu. Varsayılan değerler kullanılacak.");
      } finally {
        setIsLoading(false);
      }
    };
  
    // Yeni bir kullanıcı için state sıfırlama ve veri çekme
    if (userId) {
      setAnswers(defaultAnswers);
      setIsLoading(true);
      fetchSurveyData();
    }
  }, [userId]);
  

  const handleSliderChange = (value, question) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    fetch(`/api/usersurvey/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...answers }),
    })
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
        throw new Error("Sunucu hatası meydana geldi.");
      })
      .then((data) => {
        message.success(data || "Anket başarıyla kaydedildi!");
        navigate("/survey-options");
      })
      .catch((error) => {
        console.error("Sunucu Hatası:", error);
        message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Anket verileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="survey-wrapper">
      <div className="survey-header">
        <Title level={2}>Ev Arkadaşı Tercihlerinizi Belirleyin</Title>
        <Text>1 - Katılmıyorum, 5 - Çok Katılıyorum</Text>
      </div>

      <Form layout="vertical" className="survey-form">
        <Row gutter={[24, 24]}>
          {/* Sol Sütun */}
          <Col span={12}>
            <Form.Item label="Sigara dumanından rahatsız olur musunuz?">
              <Slider
                min={1}
                max={5}
                value={answers.question1}
                onChange={(value) => handleSliderChange(value, "question1")}
              />
            </Form.Item>
            <Form.Item label="Evcil hayvanlarla yaşamaya uygun musunuz?">
              <Slider
                min={1}
                max={5}
                value={answers.question2}
                onChange={(value) => handleSliderChange(value, "question2")}
              />
            </Form.Item>
            <Form.Item label="Düzenli misiniz?">
              <Slider
                min={1}
                max={5}
                value={answers.question3}
                onChange={(value) => handleSliderChange(value, "question3")}
              />
            </Form.Item>
            <Form.Item label="Gece geç saatlere kadar uyanık kalmayı tercih eder misiniz?">
              <Slider
                min={1}
                max={5}
                value={answers.question4}
                onChange={(value) => handleSliderChange(value, "question4")}
              />
            </Form.Item>
            <Form.Item label="Paylaşımlı alanlarda rahatsız olur musunuz?">
              <Slider
                min={1}
                max={5}
                value={answers.question5}
                onChange={(value) => handleSliderChange(value, "question5")}
              />
            </Form.Item>
          </Col>

          {/* Sağ Sütun */}
          <Col span={12}>
            <Form.Item label="Eve sık sık arkadaşlarınızı getirir misiniz?">
              <Slider
                min={1}
                max={5}
                value={answers.question6}
                onChange={(value) => handleSliderChange(value, "question6")}
              />
            </Form.Item>
            <Form.Item label="Ev işlerine katkıda bulunur musunuz?">
              <Slider
                min={1}
                max={5}
                value={answers.question7}
                onChange={(value) => handleSliderChange(value, "question7")}
              />
            </Form.Item>
            <Form.Item label="Sessiz bir ortamda çalışmayı tercih eder misiniz?">
              <Slider
                min={1}
                max={5}
                value={answers.question8}
                onChange={(value) => handleSliderChange(value, "question8")}
              />
            </Form.Item>
            <Form.Item label="Yemek yapmayı sever misiniz?">
              <Slider
                min={1}
                max={5}
                value={answers.question9}
                onChange={(value) => handleSliderChange(value, "question9")}
              />
            </Form.Item>
            <Form.Item label="Evde temizlik işlerini sever misiniz?">
              <Slider
                min={1}
                max={5}
                value={answers.question10}
                onChange={(value) => handleSliderChange(value, "question10")}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Kaydet Butonu */}
        <div className="save-button-container">
          <Button type="primary" size="large" onClick={handleSubmit}>
            Kaydet ve Devam Et
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Survey;

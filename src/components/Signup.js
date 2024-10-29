import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(""); // Telefon numarası eklendi
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      message.error("Şifreler eşleşmiyor!");
      return;
    }

    if (!email.endsWith(".edu.tr")) {
      message.error("Lütfen geçerli bir .edu.tr uzantılı e-posta adresi girin!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5181/api/Auth/register",
        {
          email,
          firstName,
          lastName,
          phoneNumber: phone, // Telefon numarası eklendi
          password,
          gender,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        message.success("Başarıyla kayıt olundu!");
        navigate("/login");
      } else {
        message.error("Kayıt başarısız!");
      }
    } catch (error) {
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const isFormValid = email && firstName && lastName && phone && password && confirmPassword && gender;

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="header">
          <img src="/images/logo.jpg" alt="Logo" className="signup-logo" />
          <h2 className="signup-title">Kayıt Ol</h2>
        </div>
        <Form layout="vertical" onFinish={handleSignup}>
          <div className="form-row">
            <Form.Item label={<span className="bold-label">Ad</span>} required>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Adınızı girin"
                className="input-field"
              />
            </Form.Item>
            <Form.Item label={<span className="bold-label">Soyad</span>} required>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Soyadınızı girin"
                className="input-field"
              />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item label={<span className="bold-label">E-posta</span>} required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresinizi girin"
                className="input-field"
              />
            </Form.Item>
            <Form.Item label={<span className="bold-label">Telefon</span>} required>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon numaranızı girin"
                className="input-field"
              />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item label={<span className="bold-label">Şifre</span>} required>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                className="input-field"
              />
            </Form.Item>
            <Form.Item label={<span className="bold-label">Şifre Doğrulama</span>} required>
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifrenizi doğrulayın"
                className="input-field"
              />
            </Form.Item>
          </div>
          <Form.Item label={<span className="bold-label">Cinsiyet</span>} required>
            <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender} className="radio-group">
              <Radio value="Erkek">Erkek</Radio>
              <Radio value="Kadın">Kadın</Radio>
              <Radio value="Diğer">Belirtmek istemiyorum</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-button" disabled={!isFormValid}>
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;

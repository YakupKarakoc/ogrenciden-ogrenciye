import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (firstName.length < 2) {
      message.error("Ad en az 2 karakter uzunluğunda olmalıdır!");
      return;
    }

    if (lastName.length < 2) {
      message.error("Soyad en az 2 karakter uzunluğunda olmalıdır!");
      return;
    }

    if (password.length < 7) {
      message.error("Şifre en az 7 karakter uzunluğunda olmalıdır!");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Şifreler eşleşmiyor!");
      return;
    }

    if (!email.endsWith(".edu.tr")) {
      message.error("Lütfen geçerli bir .edu.tr uzantılı e-posta adresi girin!");
      return;
    }

    if (phone.length < 10) {
      message.error("Telefon numarası 10 haneli olmalıdır!");
      return;
    }

    if (!phone.startsWith("5")) {
      message.error("Telefon numarası 5 ile başlamalıdır!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5181/api/Auth/register",
        {
          email,
          firstName,
          lastName,
          phoneNumber: phone,
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

  const isFormValid =
    email &&
    firstName &&
    lastName &&
    phone &&
    password &&
    confirmPassword &&
    gender;

  const handlePhoneChange = (e) => {
    let input = e.target.value;

    if (!input.startsWith("5")) {
      message.error("Telefon numarası 5 ile başlamalıdır!");
    }

    input = input.replace(/\D/g, "").substring(0, 10);

    if (input.length >= 7) {
      input = input.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1-$2-$3-$4");
    } else if (input.length >= 4) {
      input = input.replace(/^(\d{3})(\d{3})$/, "$1-$2");
    } else if (input.length >= 3) {
      input = input.replace(/^(\d{3})$/, "$1-");
    }

    setPhone(input);
  };

  const handleNameChange = (setter, value) => {
    if (/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]*$/.test(value) || value === "") {
      setter(value);
    } else {
      message.error("Ad ve soyad sadece harf içerebilir!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-header">
          <img src="/images/logo.jpg" alt="Logo" className="signup-logo" />
          <h2 className="signup-title">Kayıt Ol</h2>
        </div>
        <Form layout="vertical" onFinish={handleSignup}>
          <div className="signup-form-row">
            <Form.Item
              label={<span className="signup-bold-label">Ad</span>}
              required
              className="signup-form-item"
            >
              <Input
                value={firstName}
                onChange={(e) => handleNameChange(setFirstName, e.target.value)}
                placeholder="Adınızı girin"
                className="signup-input-field"
              />
            </Form.Item>
            <Form.Item
              label={<span className="signup-bold-label">Soyad</span>}
              required
              className="signup-form-item"
            >
              <Input
                value={lastName}
                onChange={(e) => handleNameChange(setLastName, e.target.value)}
                placeholder="Soyadınızı girin"
                className="signup-input-field"
              />
            </Form.Item>
          </div>
          <div className="signup-form-row">
            <Form.Item
              label={<span className="signup-bold-label">E-posta</span>}
              required
              className="signup-form-item"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresinizi girin"
                className="signup-input-field"
              />
            </Form.Item>
            <Form.Item
              label={<span className="signup-bold-label">Telefon</span>}
              required
              className="signup-form-item"
            >
              <Input
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Telefon numaranızı girin"
                className="signup-input-field"
              />
            </Form.Item>
          </div>
          <div className="signup-form-row">
            <Form.Item
              label={<span className="signup-bold-label">Şifre</span>}
              required
              className="signup-form-item"
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                className="signup-input-field"
              />
            </Form.Item>
            <Form.Item
              label={<span className="signup-bold-label">Şifre Doğrulama</span>}
              required
              className="signup-form-item"
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifrenizi doğrulayın"
                className="signup-input-field"
              />
            </Form.Item>
          </div>
          <Form.Item
            label={<span className="signup-bold-label">Cinsiyet</span>}
            required
            className="signup-form-item"
          >
            <Radio.Group
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              className="signup-radio-group"
            >
              <Radio value="Erkek">Erkek</Radio>
              <Radio value="Kadın">Kadın</Radio>
              <Radio value="Diğer">Belirtmek istemiyorum</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-button"
              disabled={!isFormValid}
            >
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;

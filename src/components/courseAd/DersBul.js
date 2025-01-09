import React, { useState } from "react";
import { Input, Button, Modal, Form, DatePicker, TimePicker } from "antd";
import { PlusCircleOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/courseAds/DersBul.css";

const DersBul = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]); // Dummy ads state
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const handlePostAd = (values) => {
    const startTime = values.startTime.format("HH:mm");
    const endTime = values.endTime.format("HH:mm");

    if (startTime >= endTime) {
      alert("Başlangıç saati, bitiş saatinden önce olmalıdır.");
      return;
    }

    const newAd = {
      title: values.title,
      description: values.description,
      date: values.date.format("YYYY-MM-DD"),
      startTime,
      endTime,
      price: values.price,
    };

    setAds([newAd, ...ads]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="dersbul-container">
      <header className="dersbul-header">
        <div className="dersbul-header-logo-section">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="dersbul-logo-image"
            onClick={() => navigate("/home")}
          />
          <span className="dersbul-logo-text" onClick={() => navigate("/home")}>
            Öğrenciden Öğrenciye
          </span>
        </div>
        <div className="dersbul-header-action-buttons">
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="dersbul-header-button"
          >
            İlan Ver
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="dersbul-header-button"
            onClick={() => navigate("/profile")}
          >
            Hesabım
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="dersbul-header-button"
            onClick={() => navigate("/login")}
          >
            Çıkış
          </Button>
        </div>
      </header>

      <div className="ads-container">
        {ads.length === 0 ? (
          <p className="no-ads-text">Henüz bir ilan bulunmuyor.</p>
        ) : (
          ads.map((ad, index) => (
            <div key={index} className="ad-card">
              <h3>{ad.title}</h3>
              <p><strong>Açıklama:</strong> {ad.description}</p>
              <p><strong>Tarih:</strong> {ad.date}</p>
              <p>
                <strong>Saat:</strong> {ad.startTime} - {ad.endTime}
              </p>
              <p><strong>Ücret:</strong> {ad.price} TL</p>
            </div>
          ))
        )}
      </div>

      <Modal
        title="Ders İlanı Ver"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handlePostAd}>
          <Form.Item
            label="İlan Başlığı"
            name="title"
            rules={[{ required: true, message: "Lütfen ilan başlığını girin." }]}
          >
            <Input placeholder="İlan başlığını yazın" />
          </Form.Item>
          <Form.Item
            label="Açıklama"
            name="description"
            rules={[{ required: true, message: "Lütfen bir açıklama girin." }]}
          >
            <Input.TextArea rows={3} placeholder="Ders ile ilgili açıklama" />
          </Form.Item>
          <Form.Item
            label="Tarih"
            name="date"
            rules={[{ required: true, message: "Lütfen tarihi seçin." }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)}
            />
          </Form.Item>
          <Form.Item
            label="Başlangıç Saati"
            name="startTime"
            rules={[{ required: true, message: "Lütfen başlangıç saatini seçin." }]}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
          <Form.Item
            label="Bitiş Saati"
            name="endTime"
            rules={[{ required: true, message: "Lütfen bitiş saatini seçin." }]}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
          <Form.Item
            label="Ücret (TL)"
            name="price"
            rules={[{ required: true, message: "Lütfen ücreti girin." }]}
          >
            <Input type="number" placeholder="Ücret" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              İlanı Yayınla
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DersBul;

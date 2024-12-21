import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddNote.css";

function AddNote() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [file, setFile] = useState(null); // Sadece dosya verisi için state
  const uploaderId = localStorage.getItem("userId");
  const uploaderEmail = localStorage.getItem("userEmail");

  // Form gönderme işlemi
  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("UploaderId", uploaderId);
    formData.append("Subject", values.courseName);
    formData.append("Content", values.description);
    if (file) {
      formData.append("File", file); // Doğrudan dosyayı ekliyoruz
    } else {
      message.error("Lütfen bir dosya yükleyin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5181/api/Note", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("Not başarıyla eklendi!");
        navigate("/notpaylasim");
      }
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      message.error("Not ekleme sırasında bir hata oluştu!");
    }
  };

  // Dosya yükleme işlemi
  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      setFile(info.fileList[0].originFileObj); // Doğrudan dosyayı state'e ekliyoruz
    } else {
      setFile(null); // Dosya yükleme iptal edilirse state'i temizliyoruz
    }
  };

  return (
    <div className="add-note-wrapper">
      <h1>Yeni Not Ekle</h1>
      <Form
        form={form}
        layout="vertical"
        className="add-note-form"
        onFinish={handleFormSubmit}
      >
        {/* Notu Ekleyen */}
        <Form.Item label="Notu Ekleyen">
          <Input value={uploaderEmail} disabled className="input-disabled" />
        </Form.Item>

        {/* Ders Adı */}
        <Form.Item
          label="Ders Adı"
          name="courseName"
          rules={[{ required: true, message: "Ders adı gereklidir!" }]}
        >
          <Input placeholder="Ders adını giriniz" />
        </Form.Item>

        {/* Not Açıklaması */}
        <Form.Item
          label="Not Açıklaması"
          name="description"
          rules={[{ required: true, message: "Açıklama gereklidir!" }]}
        >
          <Input.TextArea rows={4} placeholder="Kısa bir açıklama giriniz" />
        </Form.Item>

        {/* Dosya Yükleme */}
        <Form.Item
          label="Not Dosyası (PDF)"
          name="file"
          rules={[{ required: true, message: "PDF dosyası gereklidir!" }]}
        >
          <Upload
            accept=".pdf"
            maxCount={1}
            beforeUpload={() => false} // Dosya yükleme işlemini manuel yapıyoruz
            onChange={handleFileChange} // Dosya değişimini işliyoruz
          >
            <Button icon={<UploadOutlined />}>PDF Yükle</Button>
          </Upload>
        </Form.Item>

        {/* Kaydet Butonu */}
        <Button type="primary" htmlType="submit" className="submit-button">
          Notu Kaydet
        </Button>
      </Form>
    </div>
  );
}

export default AddNote;

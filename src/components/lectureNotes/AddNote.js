import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/lectureNotess/AddNoteUnique.css";

function AddNote() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [file, setFile] = useState(null); // Yüklenen dosya için state
  const uploaderId = localStorage.getItem("userId");
  const uploaderEmail = localStorage.getItem("userEmail");

  // Form gönderimi
  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("UploaderId", uploaderId);
    formData.append("Subject", values.courseName);
    formData.append("Content", values.description);
    if (file) {
      formData.append("File", file);
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
      setFile(info.fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="add-note-container-unique">
      <h1 className="add-note-title-unique">Yeni Not Ekle</h1>
      <Form
        form={form}
        layout="vertical"
        className="add-note-form-unique"
        onFinish={handleFormSubmit}
      >
        {/* Notu Ekleyen */}
        <Form.Item label="Notu Ekleyen">
          <Input value={uploaderEmail} disabled className="add-note-input-disabled-unique" />
        </Form.Item>

        {/* Ders Adı */}
        <Form.Item
          label="Ders Adı"
          name="courseName"
          rules={[{ required: true, message: "Ders adı gereklidir!" }]}
        >
          <Input
            placeholder="Ders adını giriniz"
            className="add-note-input-unique"
          />
        </Form.Item>

        {/* Not Açıklaması */}
        <Form.Item
          label="Not Açıklaması"
          name="description"
          rules={[{ required: true, message: "Açıklama gereklidir!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Kısa bir açıklama giriniz"
            className="add-note-textarea-unique"
          />
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
            beforeUpload={() => false}
            onChange={handleFileChange}
            className="add-note-upload-unique"
          >
            <Button
              icon={<UploadOutlined />}
              className="add-note-upload-button-unique"
            >
              PDF Yükle
            </Button>
          </Upload>
        </Form.Item>

        {/* Kaydet Butonu */}
        <Button
          type="primary"
          htmlType="submit"
          className="add-note-submit-button-unique"
        >
          Notu Kaydet
        </Button>
      </Form>
    </div>
  );
}

export default AddNote;

import React, { useState } from "react";
import { Input, Button, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/NewRoommateAd.css";

const { Option } = Select;

function NewRoommateAd() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        city: "",
        district: "",
        squareMeters: "",
        rentPrice: "",
        roomCount: "",
        furnishing: "",
        genderPreference: "",
        image: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSelectChange = (value, name) => {
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            message.error("Kullanıcı bilgisi eksik.");
            return;
        }

        const formData = new FormData();
        formData.append("userId", userId);
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            await axios.post("http://localhost:5181/api/RoommateAds/AddWithImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            message.success("İlan başarıyla eklendi!");
            navigate("/uniqueevarkadasi"); // Redirect to the UniqueEvArkadasi page
        } catch (error) {
            message.error("İlan ekleme sırasında bir hata oluştu.");
        }
    };

    return (
        <div className="new-roommate-ad-page">
            <h1>Yeni Ev Arkadaşı İlanı Ekle</h1>
            <form className="new-roommate-ad-form">
                <div className="form-row">
                    <label>Başlık:</label>
                    <Input name="title" placeholder="Başlık" value={form.title} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Açıklama:</label>
                    <Input.TextArea name="description" placeholder="Açıklama" value={form.description} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Şehir:</label>
                    <Input name="city" placeholder="Şehir" value={form.city} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>İlçe:</label>
                    <Input name="district" placeholder="İlçe" value={form.district} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Metrekare:</label>
                    <Input name="squareMeters" type="number" placeholder="Metrekare" value={form.squareMeters} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Kira Ücreti:</label>
                    <Input name="rentPrice" type="number" placeholder="Kira Ücreti (TL)" value={form.rentPrice} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Oda Sayısı:</label>
                    <Select
                        placeholder="Oda Sayısı"
                        value={form.roomCount}
                        onChange={(value) => handleSelectChange(value, "roomCount")}
                    >
                        <Option value="1+1">1+1</Option>
                        <Option value="2+1">2+1</Option>
                        <Option value="3+1">3+1</Option>
                        <Option value="4+1">4+1</Option>
                    </Select>
                </div>
                <div className="form-row">
                    <label>Eşyalı mı?:</label>
                    <Select
                        placeholder="Eşyalı mı?"
                        value={form.furnishing}
                        onChange={(value) => handleSelectChange(value, "furnishing")}
                    >
                        <Option value="Eşyalı">Eşyalı</Option>
                        <Option value="Eşyasız">Eşyasız</Option>
                    </Select>
                </div>
                <div className="form-row">
                    <label>Arkadaş Tercihi:</label>
                    <Select
                        placeholder="Cinsiyet Tercihi"
                        value={form.genderPreference}
                        onChange={(value) => handleSelectChange(value, "genderPreference")}
                    >
                        <Option value="Erkek">Erkek</Option>
                        <Option value="Kadın">Kadın</Option>
                        <Option value="Farketmez">Farketmez</Option>
                    </Select>
                </div>
                <div className="form-row">
                    <label>Fotoğraf:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <Button type="primary" onClick={handleSubmit}>
                    İlan Ekle
                </Button>
            </form>
        </div>
    );
}

export default NewRoommateAd;

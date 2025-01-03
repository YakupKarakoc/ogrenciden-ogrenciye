import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import "../styles/Profile.css";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const email = localStorage.getItem('userEmail'); // localStorage'den email alınıyor

  useEffect(() => {
    // Profil bilgilerini almak için istek gönderiyoruz
    axios.get(`http://localhost:5181/api/Auth/profile/${email}`)
      .then(response => {
        if (response.data.success) {
          setProfileInfo(response.data.data);
        } else {
          console.error('Profil bilgileri alınamadı:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Profil bilgileri alınırken hata oluştu:', error);
      });
  }, [email]);

  // Kullanıcı bilgileri yüklendiyse göster, yoksa "Yükleniyor..." göster
  if (!profileInfo) return <div>Yükleniyor...</div>;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSave = () => {
    if (!profileInfo.phoneNumber && !newPassword) {
      message.error("Lütfen telefon numarası veya şifre alanlarından en az birini doldurun!");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      message.error('Şifreler eşleşmiyor. Lütfen kontrol edin.');
      return;
    }
    axios.put('http://localhost:5181/api/Auth/profile/update', {
      email: profileInfo.email,       // Zorunlu
      phoneNumber: profileInfo.phoneNumber || null, // Opsiyonel
      newPassword: newPassword || null // Opsiyonel
    })
      .then(response => {
        if (response.data.success) {
          message.success('Profil başarıyla güncellendi!');
          setIsEditing(false);
        } else {
          message.error(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
        message.error('Profil güncelleme sırasında bir hata oluştu.');
      });
    
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/images/logo.jpg" alt="Logo" className="profile-logo" />
        <h2 className="profile-header-title">KULLANICI BİLGİLERİ</h2>
      </div>
      <div className="profile-info">
        <label className="profile-label">Ad:</label>
        <p className="profile-text">{profileInfo.firstName}</p>

        <label className="profile-label">Soyad:</label>
        <p className="profile-text">{profileInfo.lastName}</p>

        <label className="profile-label">E-Posta:</label>
        <p className="profile-text">{profileInfo.email}</p>

        <label className="profile-label">Cinsiyet:</label>
        <p className="profile-text">{profileInfo.gender}</p>

        <label className="profile-label">Telefon Numarası:</label>
        {isEditing ? (
          <input
            type="tel"
            name="phoneNumber"
            value={profileInfo.phoneNumber || ''}
            onChange={handleChange}
            className="profile-input"
          />
        ) : (
          <p className="profile-text">{profileInfo.phoneNumber}</p>
        )}

        {isEditing && (
          <>
            <label className="profile-label">Yeni Şifre:</label>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="profile-input"
            />

            <label className="profile-label">Şifreyi Onayla:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="profile-input"
            />
          </>
        )}
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="profile-save-button">Kaydet</button>
            <button onClick={handleEditClick} className="profile-cancel-button">İptal</button>
          </>
        ) : (
          <button onClick={handleEditClick} className="profile-edit-button">Düzenle</button>
        )}
      </div>
    </div>
  );
};

export default Profile;

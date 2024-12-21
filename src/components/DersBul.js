import React, { useState } from 'react';
import { Calendar } from 'antd'; // Ant Design Calendar
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/DersBul.css';

const DersBul = () => {
  const classData = {
    1: ['Mat', 'Fen Bilgisi', 'Türkçe', 'Sosyal Bilgiler'],
    2: ['Matematik', 'Fizik', 'Kimya', 'Biyoloji'],
    3: ['Matematik', 'Edebiyat', 'Coğrafya', 'Tarih'],
    4: ['Matematik', 'Felsefe', 'Kimya', 'Psikoloji'],
  };

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [role, setRole] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [statusMessages, setStatusMessages] = useState([]);

  const handleClassChange = (event) => {
    const selected = event.target.value;
    setSelectedClass(selected);
    setSelectedSubject('');
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSessionTypeChange = (event) => {
    setSessionType(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    const selectedDateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : 'Belirtilmedi';

    const newStatus = `Seans Bilgisi:
      İsim: ${name}
      Sınıf: ${selectedClass}
      Ders: ${selectedSubject}
      Rol: ${role}
      Seans Türü: ${sessionType}
      Tarih: ${selectedDateStr}
      Başlangıç Saati: ${startTime}
      Bitiş Saati: ${endTime}
      Telefon Numarası: ${phoneNumber}`;

    setStatusMessages((prevMessages) => [
      ...prevMessages,
      { message: newStatus, isTeacher: role === 'Öğretici' },
    ]);
  };

  const handleDeleteMessage = (index) => {
    setStatusMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="logo-section">
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="header-right">
          <Link to="/home" className="home-login-button">Home</Link>
          <Link to="/login" className="home-login-button">Login</Link>
        </div>
      </div>

      {/* Main content */}
      <div className="container">
        {/* Phone number input */}
        <div>
          <label htmlFor="phone">Telefon Numaranızı Girin:</label>
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>

        {/* Name input */}
        <div>
          <label htmlFor="name">İsim ve Soyisim:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        {/* Class Selection */}
        <div>
          <label htmlFor="class">Sınıf Seçin: </label>
          <select id="class" value={selectedClass} onChange={handleClassChange}>
            <option value="">Sınıf Seçin</option>
            <option value="1">1. Sınıf</option>
            <option value="2">2. Sınıf</option>
            <option value="3">3. Sınıf</option>
            <option value="4">4. Sınıf</option>
          </select>
        </div>

        {/* Subject Selection */}
        {selectedClass && (
          <div>
            <label htmlFor="subject">Ders Seçin: </label>
            <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Ders Seçin</option>
              {classData[selectedClass].map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Role Selection */}
        {selectedSubject && (
          <div>
            <label htmlFor="role">Rol Seçin: </label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="">Rol Seçin</option>
              <option value="Öğrenci">Öğrenci</option>
              <option value="Öğretici">Öğretici</option>
            </select>
          </div>
        )}

        {/* Session Type Selection */}
        {role && (
          <div>
            <label htmlFor="sessionType">Seans Türü Seçin: </label>
            <select id="sessionType" value={sessionType} onChange={handleSessionTypeChange}>
              <option value="">Seans Türü Seçin</option>
              <option value="Konu Anlatımı">Çok kişili Konu Anlatımı</option>
              <option value="Özel Ders">Özel Ders</option>
            </select>
          </div>
        )}

        {/* Date Picker */}
        {role && sessionType && (
          <div>
            <label htmlFor="date">Tarih Seçin:</label>
            <Calendar
              onSelect={handleDateChange}
              fullscreen={false}
              className="antd-calendar"
            />
          </div>
        )}

        {/* Time Inputs */}
        {selectedDate && (
          <>
            <div>
              <label htmlFor="startTime">Başlangıç Saati:</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
            <div>
              <label htmlFor="endTime">Bitiş Saati:</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button onClick={handleSubmit}>Gönder</button>

        {/* Status Messages */}
        <ul>
          {statusMessages.map((status, index) => (
            <li key={index} className={status.isTeacher ? 'teacher-status' : ''}>
              <div>{status.message}</div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteMessage(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DersBul;

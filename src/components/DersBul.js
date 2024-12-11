import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DersBul = () => {
  const classData = {
    1: ["Matematik", "Fen Bilgisi", "Türkçe", "Sosyal Bilgiler"],
    2: ["Matematik", "Fizik", "Kimya", "Biyoloji"],
    3: ["Matematik", "Edebiyat", "Coğrafya", "Tarih"],
    4: ["Matematik", "Felsefe", "Kimya", "Psikoloji"],
  };

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [role, setRole] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [statusMessages, setStatusMessages] = useState([]);

  const handleClassChange = (event) => {
    const selected = event.target.value;
    setSelectedClass(selected);
    setSelectedSubject("");
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

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = () => {
    const selectedDateStr = selectedDate
      ? new Date(selectedDate).toLocaleDateString()
      : "Belirtilmedi";

    const newStatus = `Seans Bilgisi:
      Sınıf: ${selectedClass}
      Ders: ${selectedSubject}
      Rol: ${role}
      Seans Türü: ${sessionType}
      Tarih: ${selectedDateStr}
      Başlangıç Saati: ${startTime}
      Bitiş Saati: ${endTime}
      Telefon Numarası: ${phoneNumber}`;

    setStatusMessages((prevMessages) => [...prevMessages, newStatus]);
  };

  return (
    <div>
      <h1>Okul Ders Listesi ve Öğrenci Seçenekleri</h1>

      {/* Telefon numarası girişi */}
      <div>
        <label htmlFor="phone">Telefon Numaranızı Girin:</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>

      {/* Sınıf Seçimi */}
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

      {/* Ders Seçimi */}
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

      {/* Rol Seçimi */}
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

      {/* Seans Türü Seçimi */}
      {role && (
        <div>
          <label htmlFor="sessionType">Seans Türü Seçin: </label>
          <select id="sessionType" value={sessionType} onChange={handleSessionTypeChange}>
            <option value="">Seans Türü Seçin</option>
            <option value="Tek kişilik soru çözümü">Tek kişilik soru çözümü</option>
            <option value="Çoklu katılım ders anlatımı">
              Çoklu katılım ders anlatımı
            </option>
          </select>
        </div>
      )}

      {/* Saat Seçimi */}
      {sessionType && (
        <div>
          <label htmlFor="start-time">Başlangıç Saati:</label>
          <input
            type="time"
            id="start-time"
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <br />
          <label htmlFor="end-time">Bitiş Saati:</label>
          <input
            type="time"
            id="end-time"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
      )}

      {/* Durumu Yazdır */}
      {startTime && endTime && sessionType && (
        <button onClick={handleSubmit}>Durumu Yazdır</button>
      )}

      {/* Durumları Göster */}
      {statusMessages.length > 0 && (
        <div>
          <h3>Yazdırılan Durumlar:</h3>
          <ul>
            {statusMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DersBul;

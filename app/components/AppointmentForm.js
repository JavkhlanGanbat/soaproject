'use client';
import React, { useState, useEffect } from 'react';
import styles from './AppointmentForm.module.css';

// Mock data for dropdowns
const doctors = [
  { id: 1, name: 'Dr. Smith', department: 'General Medicine' },
  { id: 2, name: 'Dr. Johnson', department: 'Cardiology' },
  { id: 3, name: 'Dr. Williams', department: 'Pathology' },
  { id: 4, name: 'Dr. Miller', department: 'Immunology' },
  { id: 5, name: 'Dr. Davis', department: 'Neurology' },
];

const patients = [
  { id: 'P-1001', name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john.doe@example.com' },
  { id: 'P-1002', name: 'Jane Brown', phone: '+1 (555) 234-5678', email: 'jane.brown@example.com' },
  { id: 'P-1003', name: 'Robert Wilson', phone: '+1 (555) 345-6789', email: 'robert.wilson@example.com' },
  { id: 'P-1004', name: 'Emily Davis', phone: '+1 (555) 456-7890', email: 'emily.davis@example.com' },
  { id: 'P-1005', name: 'Michael Johnson', phone: '+1 (555) 567-8901', email: 'michael.johnson@example.com' },
];

export default function AppointmentForm({ appointment, onSave, onCancel }) {
  const isEditing = !!appointment;
  
  const initialFormData = appointment ? { ...appointment } : {
    patientId: '',
    patientName: '',
    phone: '',
    email: '',
    doctor: '',
    department: '',
    date: '',
    time: '',
    reason: '',
    status: 'confirmed'
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Update patient data when patient changes
  useEffect(() => {
    if (formData.patientId) {
      const patient = patients.find(p => p.id === formData.patientId);
      if (patient) {
        setSelectedPatient(patient);
        setFormData(prev => ({
          ...prev,
          patientName: patient.name,
          phone: patient.phone,
          email: patient.email
        }));
      }
    }
  }, [formData.patientId]);
  
  // Update doctor data when doctor changes
  useEffect(() => {
    if (formData.doctor) {
      const doctor = doctors.find(d => d.name === formData.doctor);
      if (doctor) {
        setSelectedDoctor(doctor);
        setFormData(prev => ({
          ...prev,
          department: doctor.department
        }));
      }
    }
  }, [formData.doctor]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientId) newErrors.patientId = 'Өвчтөн сонгох шаардлагатай';
    if (!formData.doctor) newErrors.doctor = 'Эмч сонгох шаардлагатай';
    if (!formData.date) newErrors.date = 'Огноо сонгох шаардлагатай';
    if (!formData.time) newErrors.time = 'Цаг сонгох шаардлагатай';
    if (!formData.reason) newErrors.reason = 'Шалтгаан оруулах шаардлагатай';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>{isEditing ? 'Үзлэг Засах' : 'Шинэ Үзлэг'}</h2>
        <button className={styles.closeButton} onClick={onCancel}>×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formColumn}>
            <div className={styles.formSection}>
              <h3>Өвчтөний Мэдээлэл</h3>
              
              <div className={styles.formField}>
                <label htmlFor="patientId">Өвчтөн</label>
                <select 
                  id="patientId"
                  name="patientId"
                  value={formData.patientId} 
                  onChange={handleChange}
                  className={errors.patientId ? styles.errorField : ''}
                >
                  <option value="">Өвчтөн Сонгох</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.id})
                    </option>
                  ))}
                </select>
                {errors.patientId && <p className={styles.errorText}>{errors.patientId}</p>}
              </div>
              
              {selectedPatient && (
                <div className={styles.patientInfo}>
                  <p><strong>Утас:</strong> {selectedPatient.phone}</p>
                  <p><strong>Имэйл:</strong> {selectedPatient.email}</p>
                </div>
              )}
            </div>
            
            <div className={styles.formSection}>
              <h3>Эмчийн Мэдээлэл</h3>
              
              <div className={styles.formField}>
                <label htmlFor="doctor">Эмч</label>
                <select 
                  id="doctor"
                  name="doctor"
                  value={formData.doctor} 
                  onChange={handleChange}
                  className={errors.doctor ? styles.errorField : ''}
                >
                  <option value="">Эмч Сонгох</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} ({doctor.department})
                    </option>
                  ))}
                </select>
                {errors.doctor && <p className={styles.errorText}>{errors.doctor}</p>}
              </div>
              
              {selectedDoctor && (
                <div className={styles.doctorInfo}>
                  <p><strong>Тасаг:</strong> {selectedDoctor.department}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.formColumn}>
            <div className={styles.formSection}>
              <h3>Цаг Захиалгын Дэлгэрэнгүй</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label htmlFor="date">Огноо</label>
                  <input 
                    type="date" 
                    id="date"
                    name="date"
                    value={formData.date} 
                    onChange={handleChange}
                    className={errors.date ? styles.errorField : ''}
                  />
                  {errors.date && <p className={styles.errorText}>{errors.date}</p>}
                </div>
                
                <div className={styles.formField}>
                  <label htmlFor="time">Цаг</label>
                  <input 
                    type="time" 
                    id="time"
                    name="time"
                    value={formData.time} 
                    onChange={handleChange}
                    className={errors.time ? styles.errorField : ''}
                  />
                  {errors.time && <p className={styles.errorText}>{errors.time}</p>}
                </div>
              </div>
              
              <div className={styles.formField}>
                <label htmlFor="reason">Ирэх Шалтгаан</label>
                <textarea 
                  id="reason"
                  name="reason"
                  value={formData.reason} 
                  onChange={handleChange}
                  rows="3"
                  className={errors.reason ? styles.errorField : ''}
                />
                {errors.reason && <p className={styles.errorText}>{errors.reason}</p>}
              </div>
              
              <div className={styles.formField}>
                <label htmlFor="status">Төлөв</label>
                <select 
                  id="status"
                  name="status"
                  value={formData.status} 
                  onChange={handleChange}
                >
                  <option value="confirmed">Баталгаажсан</option>
                  <option value="waiting">Хүлээж буй</option>
                  <option value="completed">Дууссан</option>
                  <option value="cancelled">Цуцлагдсан</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Цуцлах
          </button>
          <button type="submit" className={styles.saveButton}>
            {isEditing ? 'Үзлэг Шинэчлэх' : 'Үзлэг Үүсгэх'}
          </button>
        </div>
      </form>
    </div>
  );
}

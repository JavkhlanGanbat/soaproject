'use client';
import React, { useState } from 'react';
import styles from './AppointmentSection.module.css';
import AppointmentForm from './AppointmentForm';

// Enhanced appointment data with status and additional details
const upcomingAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    patientId: 'P-1001',
    time: '10:00 AM',
    date: 'May 21, 2024',
    reason: 'General Checkup',
    doctor: 'Dr. Smith',
    department: 'General Medicine',
    status: 'confirmed',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com'
  },
  {
    id: 2,
    patientName: 'Jane Brown',
    patientId: 'P-1002',
    time: '11:30 AM',
    date: 'May 21, 2024',
    reason: 'Follow-up',
    doctor: 'Dr. Johnson',
    department: 'Cardiology',
    status: 'waiting',
    phone: '+1 (555) 234-5678',
    email: 'jane.brown@example.com'
  },
  {
    id: 3,
    patientName: 'Robert Wilson',
    patientId: 'P-1003',
    time: '2:15 PM',
    date: 'May 21, 2024',
    reason: 'Blood Test',
    doctor: 'Dr. Williams',
    department: 'Pathology',
    status: 'completed',
    phone: '+1 (555) 345-6789',
    email: 'robert.wilson@example.com'
  },
  {
    id: 4,
    patientName: 'Emily Davis',
    patientId: 'P-1004',
    time: '3:30 PM',
    date: 'May 21, 2024',
    reason: 'Vaccination',
    doctor: 'Dr. Miller',
    department: 'Immunology',
    status: 'cancelled',
    phone: '+1 (555) 456-7890',
    email: 'emily.davis@example.com'
  }
];

export default function AppointmentSection() {
  const [appointments, setAppointments] = useState(upcomingAppointments);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Filter appointments based on status
  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(appointment => appointment.status === filterStatus);
  
  // Change appointment status
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, status: newStatus} : appointment
    ));
  };
  
  // Handle form submission for new/edited appointments
  const handleSaveAppointment = (appointmentData) => {
    if (appointmentData.id) {
      // Update existing appointment
      setAppointments(appointments.map(appointment => 
        appointment.id === appointmentData.id ? appointmentData : appointment
      ));
    } else {
      // Add new appointment with auto-generated id
      setAppointments([
        ...appointments, 
        { ...appointmentData, id: appointments.length + 1 }
      ]);
    }
    setShowForm(false);
    setSelectedAppointment(null);
  };
  
  // Open form to edit appointment
  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  };

  return (
    <div className={styles.appointmentSection}>
      <div className={styles.header}>
        <h2>Өнөөдрийн Цаг Захиалгууд</h2>
        <div className={styles.headerControls}>
          <div className={styles.filterControls}>
            <label htmlFor="statusFilter">Шүүлт:</label>
            <select 
              id="statusFilter" 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Бүх Цаг Захиалгууд</option>
              <option value="confirmed">Баталгаажсан</option>
              <option value="waiting">Хүлээж буй</option>
              <option value="completed">Дууссан</option>
              <option value="cancelled">Цуцлагдсан</option>
            </select>
          </div>
          <button 
            className={styles.addButton} 
            onClick={() => {
              setSelectedAppointment(null);
              setShowForm(true);
            }}
          >
            + Шинэ Үзлэг
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className={styles.formOverlay}>
          <AppointmentForm 
            appointment={selectedAppointment} 
            onSave={handleSaveAppointment} 
            onCancel={() => {
              setShowForm(false);
              setSelectedAppointment(null);
            }}
          />
        </div>
      )}
      
      <div className={styles.appointmentList}>
        {filteredAppointments.length === 0 && (
          <div className={styles.noAppointments}>
            Сонгосон шүүлтээр цаг захиалга олдсонгүй.
          </div>
        )}
        
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className={`${styles.appointmentCard} ${styles[appointment.status]}`}>
            <div className={styles.timeInfo}>
              <div className={styles.time}>{appointment.time}</div>
              <div className={styles.date}>{appointment.date}</div>
              <div className={styles.statusBadge}>
                {appointment.status === 'confirmed' ? 'Баталгаажсан' : 
                 appointment.status === 'waiting' ? 'Хүлээж буй' :
                 appointment.status === 'completed' ? 'Дууссан' : 'Цуцлагдсан'}
              </div>
            </div>
            <div className={styles.appointmentDetails}>
              <h3>{appointment.patientName}</h3>
              <p className={styles.patientId}>ID: {appointment.patientId}</p>
              <p className={styles.reason}>{appointment.reason}</p>
              <p className={styles.doctor}>{appointment.doctor} • {appointment.department}</p>
              <div className={styles.contactInfo}>
                <span className={styles.phone}>{appointment.phone}</span>
                <span className={styles.email}>{appointment.email}</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button 
                className={styles.actionButton} 
                onClick={() => handleEditAppointment(appointment)}
              >
                Засах
              </button>
              {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                <>
                  <button 
                    className={`${styles.actionButton} ${styles.completeButton}`}
                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                  >
                    Дууссан
                  </button>
                  <button 
                    className={`${styles.actionButton} ${styles.cancelButton}`}
                    onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  >
                    Цуцлах
                  </button>
                </>
              )}
              {appointment.status === 'cancelled' && (
                <button 
                  className={`${styles.actionButton} ${styles.rescheduleButton}`}
                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                >
                  Дахин Товлох
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

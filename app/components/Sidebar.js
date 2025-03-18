'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const menuItems = [
  { name: 'Хяналтын Самбар', icon: '📊', path: '/' },
  { name: 'Өвчтөнүүд', icon: '👥', path: '/patients' },
  { name: 'Эмч нар', icon: '👨‍⚕️', path: '/doctors' },
  { name: 'Цаг Захиалга', icon: '📅', path: '/appointments' },
  { name: 'Төлбөр Тооцоо', icon: '💰', path: '/billing' },
  { name: 'Тайлан', icon: '📈', path: '/reports' },
  { name: 'Тохиргоо', icon: '⚙️', path: '/settings' },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Хяналтын Самбар');
  
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>МУИС эмнэлэг</h2>
        <p>Эмнэлгийн Систем</p>
      </div>
      <nav className={styles.navigation}>
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.name} 
              className={activeItem === item.name ? styles.active : ''}
              onClick={() => setActiveItem(item.name)}
            >
              <Link href={item.path}>
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>DR</div>
          <div>
            <p>Др. Батаа</p>
            <small>Админ</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

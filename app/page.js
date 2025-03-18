import Sidebar from './components/Sidebar';
import AppointmentSection from './components/AppointmentSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <h1>Эмнэлгийн Хяналтын Самбар</h1>
          <div className={styles.headerActions}>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Хайх..." />
            </div>
            <div className={styles.notifications}>🔔</div>
          </div>
        </header>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Нийт Өвчтөн</h3>
            <p className={styles.statValue}>1,254</p>
            <p className={styles.statChange}>Өмнөх сараас +5%</p>
          </div>
          <div className={styles.statCard}>
            <h3>Өнөөдрийн Цаг Захиалга</h3>
            <p className={styles.statValue}>28</p>
            <p className={styles.statChange}>Өчигдрөөс +3</p>
          </div>
          <div className={styles.statCard}>
            <h3>Боломжтой Эмч</h3>
            <p className={styles.statValue}>12</p>
            <p className={styles.statChange}>1 чөлөөтэй</p>
          </div>
          <div className={styles.statCard}>
            <h3>Нийт Орлого</h3>
            <p className={styles.statValue}>$12,436</p>
            <p className={styles.statChange}>Өмнөх долоо хоногоос +12%</p>
          </div>
        </div>
        
        <div className={styles.contentGrid}>
          <div className={styles.mainSection}>
            <AppointmentSection />
          </div>
          
          <div className={styles.sideSection}>
            <div className={styles.quickActions}>
              <h2>Түргэн Үйлдлүүд</h2>
              <div className={styles.actionButtons}>
                <button className={styles.actionButton}>
                  <span className={styles.actionIcon}>👥</span>
                  <span>Өвчтөн Нэмэх</span>
                </button>
                <button className={styles.actionButton}>
                  <span className={styles.actionIcon}>📅</span>
                  <span>Цаг Товлох</span>
                </button>
                <button className={styles.actionButton}>
                  <span className={styles.actionIcon}>📝</span>
                  <span>Тайлан Үүсгэх</span>
                </button>
                <button className={styles.actionButton}>
                  <span className={styles.actionIcon}>💊</span>
                  <span>Эм Захиалах</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

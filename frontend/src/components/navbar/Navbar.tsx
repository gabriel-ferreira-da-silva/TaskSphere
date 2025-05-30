import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { User } from '../../interfaces/user.interface';

export function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do localStorage:', error);
    }
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/tasklist', label: 'listar Tarefas' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">TaskSphere</Link>
      </div>

      <div className={styles.holder}>
        <ul className={styles.navLinks}>
          {navItems.map(({ path, label }) => (
            <li key={path} className={location.pathname === path ? styles.active : ''}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>

        {user && (
          <div className={styles.userInfo}>
            <span className={styles.username}>{"@" + user.name}</span>
          </div>
        )}

      </div>
    </nav>
  );
}

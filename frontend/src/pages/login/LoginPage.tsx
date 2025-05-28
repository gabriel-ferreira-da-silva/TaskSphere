import { useState } from 'react';
import { AuthService } from '../../services/Auth.service';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

const authService = new AuthService();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log(data)
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleLogin}>
      <h2 className={styles.title}>Login</h2>

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button
        className={styles.button}
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <div className={styles.loadingWrapper}>
            <span className={styles.spinner}></span>
            Entrando...
          </div>
        ) : (
          'Entrar'
        )}
      </button>

      {loading && (
        <div className={styles.overlay}>
          <div className={styles.loader}></div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.registerLink}>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </form>
  );
}

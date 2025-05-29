import { useState } from 'react';
import { AuthService } from '../../services/Auth.service';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import logo from '../../assets/logo.svg';

const authService = new AuthService();

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(email, name, password);
      alert('Cadastro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleRegister}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <h2 className={styles.title}>Cadastro</h2>

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
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
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
            Registrando...
          </div>
        ) : (
          'Registrar'
        )}
      </button>

      {loading && (
        <div className={styles.overlay}>
          <div className={styles.loader}></div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.loginLink}>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </form>
  );
}

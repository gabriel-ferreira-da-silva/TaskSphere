import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectService } from '../../../services/Project.service';
import styles from './AddCollaboratorPage.module.css';

const projectService = new ProjectService();

export default function AddCollaboratorPage() {
  const { projectId } = useParams();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!projectId) {
        setError('ID do projeto não encontrado.');
        return;
      }

      await projectService.addCollaborator(projectId, { userId: email });
      setSuccess('Colaborador adicionado com sucesso!');
      setEmail('');
    } catch (err) {
      setError('Erro ao adicionar colaborador.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Adicionar Colaborador</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email">Email do colaborador:</label>
        <input
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <button type="submit">Adicionar</button>
      </form>

      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={() => navigate(`/project/${projectId}`)}>Voltar</button>
    </div>
  );
}

import { useState } from 'react';
import { ProjectService } from '../../../services/Project.service';
import styles from './createProject.module.css';
import { useNavigate } from 'react-router-dom';

const projectService = new ProjectService();

interface Project {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  creatorId: string;
}

export default function CreateProjectPage() {
  const [project, setProject] = useState<Project>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    creatorId: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await projectService.create(project);
      alert('Projeto criado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao criar projeto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Criar Projeto</h2>

      <input
        className={styles.input}
        name="name"
        placeholder="Nome do projeto"
        value={project.name}
        onChange={handleChange}
        required
      />

      <textarea
        className={styles.textarea}
        name="description"
        placeholder="Descrição"
        value={project.description}
        onChange={handleChange}
        rows={4}
        required
      />

      <label className={styles.label}>Data de Início</label>
      <input
        className={styles.input}
        type="date"
        name="startDate"
        value={project.startDate}
        onChange={e => setProject({ ...project, startDate: e.target.value })}
        required
      />

      <label className={styles.label}>Data de Término</label>
      <input
        className={styles.input}
        type="date"
        name="endDate"
        value={project.endDate}
        onChange={e => setProject({ ...project, endDate: e.target.value })}
        required
      />

      <label className={styles.label}>ID do Criador</label>
      <input
        className={styles.input}
        name="creatorId"
        placeholder="ID do Criador"
        value={project.creatorId}
        onChange={handleChange}
        required
      />

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Projeto'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

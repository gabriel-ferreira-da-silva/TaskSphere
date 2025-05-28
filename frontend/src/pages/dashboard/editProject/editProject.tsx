import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectService } from '../../../services/Project.service';
import styles from '../createProject/createProject.module.css';

const projectService = new ProjectService();

interface Project {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  creatorId: string;
}

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getOne(id!);
        setProject({
          ...data,
          startDate: data.startDate.slice(0, 10), // format yyyy-MM-dd
          endDate: data.endDate.slice(0, 10),
        });
      } catch (err) {
        setError('Erro ao carregar projeto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await projectService.update(id!, project!);
      alert('Projeto atualizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao atualizar projeto.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className={styles.loading}>Carregando...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!project) return null;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Editar Projeto</h2>

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
        onChange={handleChange}
        required
      />

      <label className={styles.label}>Data de Término</label>
      <input
        className={styles.input}
        type="date"
        name="endDate"
        value={project.endDate}
        onChange={handleChange}
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

      <button className={styles.button} type="submit" disabled={submitting}>
        {submitting ? 'Salvando...' : 'Salvar Alterações'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

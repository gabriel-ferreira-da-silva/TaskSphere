import { useEffect, useState } from 'react';
import { ProjectService } from '../../services/Project.service';
import styles from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  creatorId: string;
}

const projectService = new ProjectService();

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (err) {
        setError('Erro ao carregar projetos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = () => {
    navigate('/dashboard/create');
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Seus Projetos</h1>

      <button className={styles.createButton} onClick={handleCreateProject}>
        Criar Novo Projeto
      </button>

      {loading ? (
        <p className={styles.loading}>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : projects.length === 0 ? (
        <p className={styles.empty}>Nenhum projeto encontrado.</p>
      ) : (
        <div className={styles.cardGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{project.name}</h2>
              <p className={styles.cardDescription}>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

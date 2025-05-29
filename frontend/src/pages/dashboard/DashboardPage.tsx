import { useEffect, useState } from 'react';
import { ProjectService } from '../../services/Project.service';
import styles from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom';
import { AddCardButton } from '../../components/AddCardButton/AddCardButton';
import { ProjectCard } from '../../components/ProjectCardButton/ProjectCard';

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
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setError('Usuário não encontrado.');
          return;
        }

        const user = JSON.parse(storedUser);
        const data = await projectService.getByUserId(user.id);
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

      <div className={styles.cardHolder}>
        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : projects.length === 0 ? (
          <p className={styles.empty}>Nenhum projeto encontrado.</p>
        ) : (
          <div className={styles.cardGrid}>
              <AddCardButton onClick={handleCreateProject} text={"novo projeto"}/>

              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  endDate={project.endDate}
                  description={project.description}
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
            </div>
        )}
      </div>
    </div>
  );
}

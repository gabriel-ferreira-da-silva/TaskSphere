import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskService } from '../../services/Task.service';
import { ProjectService } from '../../services/Project.service';
import styles from './ProjectPage.module.css';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pendente' | 'em andamento' | 'concluída';
  projectId: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
}

const taskService = new TaskService();
const projectService = new ProjectService();

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        if (!projectId) {
          setError('Projeto não especificado.');
          return;
        }

        const [projectData, taskData] = await Promise.all([
          projectService.getOne(projectId),
          taskService.getByProjectId(projectId),
        ]);

        setProject(projectData);
        setTasks(taskData);
      } catch (err) {
        setError('Erro ao carregar dados do projeto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndTasks();
  }, [projectId]);

  const handleAddTask = () => {
    navigate(`/project/${projectId}/tasks/create`);
  };

  return (
    <div className={styles.projectContainer}>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : project ? (
        <>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.description}>{project.description}</p>

          <button className={styles.createButton} onClick={handleAddTask}>
            Adicionar Nova Tarefa
          </button>

          {tasks.length === 0 ? (
            <p className={styles.empty}>Nenhuma tarefa cadastrada.</p>
          ) : (
            <div className={styles.cardGrid}>
              {tasks.map((task) => (
                <div key={task.id} className={styles.card}>
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                  <p>Status: <strong>{task.status}</strong></p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className={styles.error}>Projeto não encontrado.</p>
      )}
    </div>
  );
}

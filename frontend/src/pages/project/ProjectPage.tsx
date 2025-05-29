import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskService } from '../../services/Task.service';
import { ProjectService } from '../../services/Project.service';
import { Task } from '../../interfaces/task.interface';
import { Project } from '../../interfaces/project.interface';
import { User } from '../../interfaces/user.interface';
import { CollaboratorsPanel } from './collaboratorsPanel.tsx/CollaboratorsPanel';
import styles from './ProjectPage.module.css';
import { AddCardButton } from '../../components/AddCardButton/AddCardButton';


const taskService = new TaskService();
const projectService = new ProjectService();

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [collaborators, setCollaborators] = useState<User[]>([]);
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

        const [projectData, taskData, userData] = await Promise.all([
          projectService.getOne(projectId),
          taskService.getByProjectId(projectId),
          projectService.getCollaborators(projectId)
        ]);

        setProject(projectData);
        setTasks(taskData);
        setCollaborators(userData);

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

  const handleEditProject = () => {
    if (projectId) {
      navigate(`/dashboard/edit/${projectId}`);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectId) return;

    const confirm = window.confirm("Tem certeza que deseja excluir este projeto?");
    if (!confirm) return;

    try {
      await projectService.remove(projectId);
      alert('Projeto excluído com sucesso.');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir o projeto.');
    }
  };


  return (
  <div className={styles.projectContainer}>
    {loading ? (
      <p>Carregando...</p>
    ) : error ? (
      <p className={styles.error}>{error}</p>
    ) : project ? (
      <>
        <div className={styles.titleHolder}>
          <h1 className={styles.title}>{project.name}</h1>
          <div className={styles.buttonsHolder}>
            <button onClick={handleEditProject}>Editar Projeto</button>
            <button className={styles.excludeButton} onClick={handleDeleteProject}>Excluir Projeto</button>
          </div>

        </div>
        <p className={styles.description}>{project.description}</p>
        <p className={styles.description}>{project.endDate}</p>

        
        <CollaboratorsPanel collaborators={collaborators} />

        <AddCardButton onClick={handleAddTask} text='nova tarefa'/>

        {tasks.length === 0 ? (
          <p className={styles.empty}>Nenhuma tarefa cadastrada.</p>
        ) : (
          <div className={styles.cardGrid}>
            {tasks.map((task) => (
              <div
                key={task.id}
                className={styles.card}
                onClick={() => navigate(`/tasks/${task.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <h2>{task.title}</h2>
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

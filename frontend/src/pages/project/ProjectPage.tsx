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
import { TaskCard } from '../../components/TaskCard/TaskCard';

const taskService = new TaskService();
const projectService = new ProjectService();

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loggedUser, setLoggedUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

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
          projectService.getCollaborators(projectId),
        ]);

        setProject(projectData);
        setTasks(taskData);
        setCollaborators(userData);
        setLoggedUser(JSON.parse(localStorage.getItem("user")));
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

  const filteredTasks = tasks.filter((task) => {
    const matchesName = task.title.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesDate = dateFilter ? task.endDate?.startsWith(dateFilter) : true;
    return matchesName && matchesStatus && matchesDate;
  });

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
              {project.creatorId === loggedUser?.id ? (
                <div>
                  <button onClick={handleEditProject}>Editar Projeto</button>
                  <button className={styles.excludeButton} onClick={handleDeleteProject}>
                    Excluir Projeto
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <p className={styles.description}>{project.description}</p>
          <p className={styles.description}>{project.endDate}</p>

          <div className={styles.mainPanel}>
          
            <div className={styles.taskMainPanel}>

              <div className={styles.filters}>
                <input
                  type="text"
                  placeholder="Filtrar por nome"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">Todos os status</option>
                  <option value="todo">Pendente</option>
                  <option value="in_progress">Em andamento</option>
                  <option value="done">Concluída</option>
                </select>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>

              <h1 className={styles.title2}>Tarefas</h1>


              {filteredTasks.length === 0 ? (
                <div>
                  <AddCardButton onClick={handleAddTask} text="nova tarefa" />
                  <p className={styles.empty}>Nenhuma tarefa encontrada com os filtros aplicados.</p>
                </div>
              ) : (
                <div className={styles.cardGrid}>
                  <AddCardButton onClick={handleAddTask} text="nova tarefa" />
                  {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onClick={() => navigate(`/tasks/${task.id}`)} />
                  ))}
                </div>
              )}

            </div>

            <div className={styles.collaboratorsPanel}>
              <h1 className={styles.title2}>Colaboradores</h1>
              <CollaboratorsPanel collaborators={collaborators} />
            </div>

          </div>
            

        </>
      ) : (
        <p className={styles.error}>Projeto não encontrado.</p>
      )}
    </div>
  );
}

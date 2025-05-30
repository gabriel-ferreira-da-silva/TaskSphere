import { useEffect, useState } from 'react';
import { TaskService } from '../../../services/Task.service';
import { ProjectService } from '../../../services/Project.service';
import { UserService } from '../../../services/User.service';
import { Task } from '../../../interfaces/task.interface';
import { Project } from '../../../interfaces/project.interface';
import { User } from '../../../interfaces/user.interface';
import styles from './ListTaskPage.module.css';

const taskService = new TaskService();
const projectService = new ProjectService();
const userService = new UserService();

export default function ListTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [filterProjectId, setFilterProjectId] = useState('');
  const [filterUserId, setFilterUserId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTaskName, setFilterTaskName] = useState('');  // novo filtro

  useEffect(() => {
    async function fetchData() {
      const [allTasks, allProjects, allUsers] = await Promise.all([
        taskService.getAll(),
        projectService.getAll(),
        userService.getAll(),
      ]);
      setTasks(allTasks);
      setProjects(allProjects);
      setUsers(allUsers);
    }

    fetchData();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterProjectId ? task.projectId === filterProjectId : true) &&
      (filterUserId ? task.responsibleId === filterUserId : true) &&
      (filterStatus ? task.status === filterStatus : true) &&
      (filterTaskName ? task.title.toLowerCase().includes(filterTaskName.toLowerCase()) : true)
    );
  });

  return (
    <div className={styles.container}>
      <h1>Lista de Tarefas</h1>

      <div className={styles.filters}>

        {/* filtro texto para nome da tarefa */}
        <input
          type="text"
          placeholder="Buscar por nome da tarefa"
          value={filterTaskName}
          onChange={(e) => setFilterTaskName(e.target.value)}
          className={styles.input}
        />

        <select value={filterProjectId} onChange={(e) => setFilterProjectId(e.target.value)}>
          <option value="">Todos os Projetos</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>

        <select value={filterUserId} onChange={(e) => setFilterUserId(e.target.value)}>
          <option value="">Todos os Responsáveis</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="todo">Pendente</option>
          <option value="in_progress">Em andamento</option>
          <option value="done">Concluída</option>
        </select>
      </div>

      <div className={styles.taskList}>
        {filteredTasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <h3>{task.title}</h3>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Projeto:</strong> {projects.find(p => p.id === task.projectId)?.name || 'N/A'}</p>
            <p><strong>Responsável:</strong> {users.find(u => u.id === task.responsibleId)?.name || 'N/A'}</p>
          </div>
        ))}
        {filteredTasks.length === 0 && <p>Nenhuma tarefa encontrada com os filtros selecionados.</p>}
      </div>
    </div>
  );
}

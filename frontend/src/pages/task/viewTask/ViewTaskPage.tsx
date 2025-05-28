import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskService } from '../../../services/Task.service';
import styles from './ViewTask.module.css';

const taskService = new TaskService();

export enum Status {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}

interface Task {
  id: string;
  title: string;
  status: Status;
  dueDate: string; // assume que vem como ISO string
  imageUrl: string;
  projectId: string;
  creatorId: string;
}

export default function ViewTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      try {
        const data = await taskService.getOne(taskId);
        setTask(data);
      } catch (err) {
        setError('Erro ao carregar tarefa.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) return <p className={styles.loading}>Carregando tarefa...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!task) return <p className={styles.error}>Tarefa não encontrada.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{task.title}</h2>

      <p><strong>Status:</strong> {translateStatus(task.status)}</p>
      <p><strong>Data de entrega:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>

      {task.imageUrl && (
        <div className={styles.imageContainer}>
          <img src={task.imageUrl} alt="Imagem da tarefa" className={styles.image} />
        </div>
      )}

      <p><strong>ID do Projeto:</strong> {task.projectId}</p>
      <p><strong>Criador:</strong> {task.creatorId}</p>

      <button className={styles.button} onClick={() => navigate(`/projects/${task.projectId}`)}>
        Voltar para Projeto
      </button>
    </div>
  );
}

function translateStatus(status: Status): string {
  switch (status) {
    case Status.todo: return 'A Fazer';
    case Status.in_progress: return 'Em Progresso';
    case Status.done: return 'Concluída';
    default: return status;
  }
}

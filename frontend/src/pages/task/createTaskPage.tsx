import { useState } from 'react';
import { TaskService } from '../../services/Task.service';
import styles from './createTask.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const taskService = new TaskService();

export enum Status {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}


interface Task {
  title: string;
  status: Status;
  dueDate: string;
  imageUrl: string;
  projectId: string;
  creatorId: string;
}

export default function CreateTaskPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task>({
    title: '',
    status: Status.todo,
    dueDate: '',
    imageUrl: '',
    projectId: projectId || '',
    creatorId: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('Usuário não está logado.');
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      task.creatorId = user.id;

      await taskService.create({
        ...task,
        dueDate: new Date(task.dueDate), 
      });

      alert('Tarefa criada com sucesso!');
      navigate(`/projects/${projectId}`);
    } catch (err) {
      setError('Erro ao criar tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Criar Tarefa</h2>

      <input
        className={styles.input}
        name="title"
        placeholder="Título da tarefa"
        value={task.title}
        onChange={handleChange}
        required
      />

      <label className={styles.label}>Status</label>
      <select
        className={styles.select}
        name="status"
        value={task.status}
        onChange={handleChange}
        required
      >
        <option value={Status.todo}>A Fazer</option>
        <option value={Status.in_progress}>Em Progresso</option>
        <option value={Status.done}>Concluída</option>
      </select>

      <label className={styles.label}>Data de entrega</label>
      <input
        className={styles.input}
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />

      <input
        className={styles.input}
        name="imageUrl"
        placeholder="URL da imagem (opcional)"
        value={task.imageUrl}
        onChange={handleChange}
      />

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Tarefa'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

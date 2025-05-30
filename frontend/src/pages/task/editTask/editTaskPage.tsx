import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskService } from '../../../services/Task.service';
import styles from './editTaskPage.module.css';

const taskService = new TaskService();

export enum Status {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}

export default function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Status>(Status.todo);
  const [dueDate, setDueDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      try {
        const task = await taskService.getOne(taskId);
        setTitle(task.title);
        setStatus(task.status);
        setDueDate(task.dueDate.slice(0, 10));
        setImageUrl(task.imageUrl);
      } catch {
        setError('Erro ao carregar tarefa.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) return;

    try {
      await taskService.update(taskId, {
        title,
        status,
        dueDate,
        imageUrl,
      });
      navigate(`/tasks/${taskId}`);
    } catch {
      setError('Erro ao atualizar tarefa.');
    }
  };

  if (loading) return <p className={styles.loading}>Carregando tarefa...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Editar Tarefa</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          placeholder="Digite o título da tarefa"
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={e => setStatus(e.target.value as Status)}
        >
          <option value={Status.todo}>A Fazer</option>
          <option value={Status.in_progress}>Em Progresso</option>
          <option value={Status.done}>Concluída</option>
        </select>

        <label htmlFor="dueDate">Data de entrega:</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />

        <label htmlFor="imageUrl">URL da imagem (opcional):</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>Salvar</button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate(`/tasks/${taskId}`)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

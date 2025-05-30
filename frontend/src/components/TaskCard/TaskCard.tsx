import styles from './TaskCard.module.css';
import { Task } from '../../interfaces/task.interface';

interface ProjectCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: ProjectCardProps) {
  const formattedDate = new Date(task.dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.card} onClick={onClick}>
      <img src={task.imageUrl} className={styles.cardImage} alt={task.title} />
      
      <div className={styles.taskContent}>
        <h2 className={styles.cardTitle}>{task.title}</h2>
        <p className={styles.cardDate}>Prazo: {formattedDate}</p>
      </div>
    </div>
  );

}

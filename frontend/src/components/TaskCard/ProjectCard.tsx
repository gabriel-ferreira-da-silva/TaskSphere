import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  name: string;
  description: string;
  endDate: string;
  onClick: () => void;
}

export function ProjectCard({ name, description, endDate, onClick }: ProjectCardProps) {
  const formattedDate = new Date(endDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.card} onClick={onClick}>
      <h2 className={styles.cardTitle}>{name}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardDate}>Prazo: {formattedDate}</p>
    </div>
  );
}

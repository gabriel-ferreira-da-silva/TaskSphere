import styles from './AddCardButton.module.css';

interface AddCardButtonProps {
  onClick: () => void;
  text: string;
}

export function AddCardButton({ onClick, text }: AddCardButtonProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <span className={styles.text}>{text}</span>
    </div>
  );
}

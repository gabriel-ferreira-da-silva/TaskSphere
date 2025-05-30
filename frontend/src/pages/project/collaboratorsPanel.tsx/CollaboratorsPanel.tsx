import React from 'react';
import { User } from '../../../interfaces/user.interface';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CollaboratorsPanel.module.css';

interface CollaboratorsPanelProps {
  collaborators: User[];
  onRemove: (userId: string) => void;
}

export function CollaboratorsPanel({ collaborators, onRemove }: CollaboratorsPanelProps) {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const handleAddCollaborator = () => {
    if (projectId) {
      navigate(`/project/${projectId}/collaborators/add`);
    }
  };

  return (
    <div className={styles.panel}>
      <h3>Colaboradores</h3>

      {collaborators.length === 0 ? (
        <p>Nenhum colaborador encontrado.</p>
      ) : (
        <div className={styles.cardContainer}>
          {collaborators.map(user => (
            <div key={user.id} className={styles.card}>
              <div>
                <strong>{user.name}</strong>
                <p>{user.email}</p>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => onRemove(user.id)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <button className={styles.addButton} onClick={handleAddCollaborator}>
        Adicionar Colaborador
      </button>
    </div>
  );
}

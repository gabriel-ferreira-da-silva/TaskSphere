import React from 'react';
import { User } from '../../../interfaces/user.interface';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CollaboratorsPanel.module.css';

interface CollaboratorsPanelProps {
  collaborators: User[];
}

export function CollaboratorsPanel({ collaborators }: CollaboratorsPanelProps) {
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
        <ul className={styles.list}>
          {collaborators.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <button className={styles.addButton} onClick={handleAddCollaborator}>
        Adicionar Colaborador
      </button>
    </div>
  );
}

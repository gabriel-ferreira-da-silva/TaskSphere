import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectService } from '../../../services/Project.service';
import { UserService } from '../../../services/User.service';
import { RandomUserService } from '../../../services/RandomUser.service';
import { User } from '../../../interfaces/user.interface';
import styles from './AddCollaboratorPage.module.css';

const projectService = new ProjectService();
const userService = new UserService();
const randomUserService = new RandomUserService();

export default function AddCollaboratorPage() {
  const { projectId } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsers = await userService.getAll();
        setUsers(allUsers);
      } catch (err) {
        setError('Erro ao carregar usuários.');
      }
    }

    async function fetchSuggestions() {
      try {
        const randomUsers = await randomUserService.getUsers(5);
        setSuggestedUsers(randomUsers);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUsers();
    fetchSuggestions();
  }, []);

  const handleSelectSuggestedUser = async (user: User) => {
    setError('');
    setSuccess('');

    try {
      if (!projectId) {
        setError('Projeto inválido.');
        return;
      }

      const createdUser = await userService.create(user);

      await projectService.addCollaborator(projectId, { userId: createdUser.id });

      setSuccess(`Usuário ${createdUser.name} adicionado com sucesso!`);
    } catch (err) {
      console.error(err);
      setError('Erro ao adicionar usuário sugerido.');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!projectId || !selectedUserId) {
        setError('Dados inválidos.');
        return;
      }

      await projectService.addCollaborator(projectId, { userId: selectedUserId });
      setSuccess('Colaborador adicionado com sucesso!');
      setSelectedUserId('');
    } catch (err) {
      setError('Erro ao adicionar colaborador.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Adicionar Colaborador Interno</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="user">Selecione um usuário:</label>
        <select
          id="user"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
        >
          <option value="" disabled>Selecione...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <button type="submit">Adicionar</button>
      </form>

      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <h2>Sugestões de Colaboradores externos (RandomUser)</h2>
      <div className={styles.suggestions}>
        {suggestedUsers.map((user, index) => (
          <div key={index} className={styles.card}>
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
            <button onClick={() => handleSelectSuggestedUser(user)}>Selecionar</button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate(`/projects/${projectId}`)}>Voltar</button>
    </div>
  );
}

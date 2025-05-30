# 🧠 TaskSphere

**TaskSphere** é uma aplicação web moderna de gerenciamento de tarefas com autenticação de usuários, criação de projetos colaborativos e controle de acesso por permissões. O sistema é composto por:

- **Frontend**: React + Vite (hospedado no Vercel)
- **Backend**: NestJS + Prisma ORM (hospedado no Render)
- **Banco de Dados**: MySQL (Railway)

---

## 🔗 Links

- 🖥️ Frontend: [https://task-sphere-eight.vercel.app](https://task-sphere-eight.vercel.app)
- ⚙️ Backend API: [https://tasksphere-deploy.onrender.com](https://tasksphere-deploy.onrender.com)

---

## ⚙️ Funcionalidades

- Registro e login de usuários com JWT
- Criação de projetos e tarefas
- Adição de colaboradores a projetos
- Controle de permissões por projeto
- Proteção de rotas com autenticação
- UI responsiva e moderna

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- MySQL ou Railway DB
- Docker (opcional)

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/tasksphere.git
cd tasksphere
```

## 2. Instalar dependências

# Backend
```
cd backend
npm install
```

# Frontend
```
cd frontend
npm install
```

## 3. Configurar variáveis de ambiente
📦 Backend - .env

DATABASE_URL=mysql://usuario:senha@host:porta/nome_do_banco
JWT_SECRET=uma_chave_secreta_segura

🌐 Frontend - .env

VITE_API_URL=https://tasksphere-deploy.onrender.com

## 4. Executar localmente

# Backend
```
cd backend
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

# Frontend
```
cd ../frontend
npm run dev
```


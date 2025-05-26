// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Cria usuários
  const passwordHash = await bcrypt.hash('123456', 10)
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: passwordHash,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: passwordHash,
    },
  })

  // Cria projeto
  const project = await prisma.project.create({
    data: {
      name: 'Projeto Inicial',
      description: 'Este é um projeto de teste.',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      creatorId: user1.id,
      collaborators: {
        connect: [{ id: user2.id }],
      },
    },
  })

  // Cria tarefa
  await prisma.task.create({
    data: {
      title: 'Criar estrutura inicial',
      status: 'todo',
      dueDate: new Date('2025-12-31'),
      imageUrl: 'https://via.placeholder.com/150',
      projectId: project.id,
      creatorId: user2.id,
    },
  })

  console.log('✅ Seed concluído com sucesso.')
}

main()
  .catch((e) => {
    console.error('❌ Seed falhou:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

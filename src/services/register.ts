import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

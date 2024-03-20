import { UserRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceReponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceReponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

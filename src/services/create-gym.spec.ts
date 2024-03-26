import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })
  it('should be able to create Gym', async () => {
    const { gym } = await sut.execute({
      title: 'React Gym',
      description: '',
      phone: '',
      latitude: -5.800648,
      longitude: -35.217532,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

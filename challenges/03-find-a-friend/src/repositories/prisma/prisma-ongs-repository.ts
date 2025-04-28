import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../ongs-repository'

export class PrismaOrgsRepository implements OrganizationsRepository {
  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: {
        email,
      },
    })

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}

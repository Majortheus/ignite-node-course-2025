import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../ongs-repository'

export class InMemoryOrgsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((org) => org.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((org) => org.email === email)

    if (!organization) {
      return null
    }
    return organization
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      responsible_name: data.responsible_name,
      email: data.email,
      zipCode: data.zipCode,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      complement: data.complement ?? null,
      number: data.number,
      street: data.street,
      whatsapp: data.whatsapp,
      password: data.password,
    }

    this.items.push(organization)

    return organization
  }
}

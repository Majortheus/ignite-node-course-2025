import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(organization: Prisma.OrganizationCreateInput): Promise<Organization>
}

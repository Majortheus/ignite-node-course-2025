export class OrgDoesntExistsError extends Error {
  constructor() {
    super("Organization doesn't exists.")
  }
}

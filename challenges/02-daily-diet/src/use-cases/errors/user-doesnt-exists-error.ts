export class UserDoesntExistsError extends Error {
  constructor() {
    super("User doesn't exists.")
  }
}

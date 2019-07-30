export class EnvironmentError extends Error {
  public readonly name = 'EnvironmentError'
  public readonly message = 'it should be set environment variables'
}

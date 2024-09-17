import { AuthToken } from "./dtos/auth/authToken.ts";

export class AuthStorage {
  static setToken(token: AuthToken) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  static getToken(): AuthToken | null {
    const token = localStorage.getItem("token");
    return !token ? null : JSON.parse(<string>localStorage.getItem("token"));
  }

  static isToken(): boolean {
    return AuthStorage.getToken() !== null;
  }
}

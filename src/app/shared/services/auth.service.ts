export class AuthService {

  private isAuthenticate = false;

  login() {
    this.isAuthenticate = true;
  }

  logout() {
    this.isAuthenticate = false;
    window.localStorage.clear(); // очистка localStorage при выходе из системы
  }

  isLoggedIn(): boolean {
    return this.isAuthenticate;
  }
}

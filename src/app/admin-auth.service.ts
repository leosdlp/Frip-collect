import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private users: { username: string; password: string }[] = [
    { username: 'admin', password: 'password' },
  ];

  constructor() {}

  isAdmin(): boolean {
    try {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        if (currentUser && currentUser.username) {
          return currentUser.username === 'admin';
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return false;
  }

  isLoggedIn(): boolean {
    const currentUserString = localStorage.getItem('currentUser');
    return !!currentUserString;
  }

  register(username: string, password: string): boolean {
    const existingUser = this.users.find((user) => user.username === username);
    if (existingUser && username === 'admin') {
      return false;
    }
    this.users.push({ username, password });
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  deleteUser(username: string, password: string): boolean {
    const userIndex = this.users.findIndex(
      (u) => u.username === username && u.password === password
    );
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      localStorage.removeItem('currentUser');
      return true;
    } else {
      return false;
    }
  }



  modifierUsername(nouveauNom: string): boolean {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        currentUser.username = nouveauNom;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    return false;
  }

  modifierPassword(nouveauMdp: string): boolean {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
          const currentUser = JSON.parse(currentUserString);
          currentUser.password = nouveauMdp;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          return true;
      }
      return false;
  }

}

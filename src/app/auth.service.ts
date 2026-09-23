import { Injectable } from '@angular/core';

interface StoredUser {
  email: string;
  password: string;
  fullName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userStorageKey = 'zomato-user';

  saveUser(user: StoredUser): void {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  login(email: string, password: string): boolean {
    const storedUser = localStorage.getItem(this.userStorageKey);

    if (!storedUser) {
      return false;
    }

    try {
      const user = JSON.parse(storedUser) as StoredUser;
      return user.email === email && user.password === password;
    } catch {
      localStorage.removeItem(this.userStorageKey);
      return false;
    }
  }

  getUserName(): string {
    const storedUser = localStorage.getItem(this.userStorageKey);

    if (!storedUser) {
      return 'Guest';
    }

    try {
      return (JSON.parse(storedUser) as StoredUser).fullName;
    } catch {
      return 'Guest';
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly baseUrl: string = environment.serverUrl + '/api/userinfo';

    constructor(private readonly http: HttpClient) {}
    getAllUsers(): Observable<unknown> {
        return this.http.get<unknown>(`${this.baseUrl}/allUsers`);
    }

    getUserByEmail(email: string): unknown {
        return this.http.post<unknown>(`${this.baseUrl}/getUser`, { email });
    }

    modifyUser(email: string, newPlace: unknown): unknown {
        return this.http.put<unknown>(`${this.baseUrl}`, { email, newPlace });
    }

    addUser(userData: unknown): unknown {
        return this.http.post<unknown>(`${this.baseUrl}/create`, userData);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${environment.baseUrl}/login`;
    return this.httpClient
      .post(url, { username, password }, { responseType: 'json' })
      .pipe(
        map((data) => this.setTokenLocalStorage(data)),
        catchError((err) => {
          this.removeTokenLocalStorage();
          throw 'Falha ao efetuar login';
        })
      );
  }

  public getToken(): string | null {
    return localStorage.getItem(environment.token);
  }

  private setTokenLocalStorage(response: any) {
    const { type, token, _ } = response;
    localStorage.setItem(environment.token, token);
  }

  private removeTokenLocalStorage(): void{
    localStorage.removeItem(environment.token)
  }
}

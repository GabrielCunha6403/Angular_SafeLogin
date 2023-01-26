import { LoginService } from './login/login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const meuToken = this.loginService.getToken();

    // se estiver logado, token terá valor

    if(meuToken !== null){
      const authRequest = req.clone({setHeaders: {'Authorization' : `Bearer ${meuToken}`}});

      return next.handle(authRequest);
    }

    return next.handle(req);

  }

}

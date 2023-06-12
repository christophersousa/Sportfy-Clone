import { CanMatchFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';


export const authGuard: CanMatchFn = (route, segments) => {
  const token = localStorage.getItem('token')
  if(!token) {
    return notAuth();
  }
  // else if(isTokenExpired(token)) {
  //   return notAuth();
  // }


  return new Promise(async (resolve, reject) => {
    const service = new SpotifyService();
    const userCreated = await service.inicializar()
    if(userCreated) {
      resolve(true);
    }else{
      resolve(notAuth());
    }
  })

  return true;
};

const notAuth = () => {
  localStorage.removeItem('token');
  const router = new Router();
  return router.parseUrl('/login');
}

const isTokenExpired = (token: string) => {
  const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
  console.log(expiry);
  return expiry * 1000 > Date.now();
}

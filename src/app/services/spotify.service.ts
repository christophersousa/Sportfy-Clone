import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() {

  }

  obeterUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`
    const scopes = `scopes=${SpotifyConfiguration.scopes.join('%20')}&`
    const responseTypes = `response_type=token&show_dialog=true`
    return authEndpoint + clientId + redirectUrl + scopes + responseTypes
  }
}

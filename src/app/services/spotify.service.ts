import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/IUser';
import { SpotifyUser } from '../common/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotify: Spotify.SpotifyWebApiJs;
  user: IUser | undefined;

  constructor() {
    this.spotify = new Spotify()
  }

  async inicializar() {
    if(!!this.user){
      return true
    }
    const token = localStorage.getItem('token') || '';

    if(!token){
      return false
    }

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUser();
      return !!this.user;
    } catch (error) {
      return false;
    }
  }

  async obterSpotifyUser(){
    const userInfor = await  this.spotify.getMe().then((spotifyUser) =>{
      this.user = SpotifyUser(spotifyUser);
    });
    console.log(this.user);
  }

  obeterUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`
    const responseTypes = `response_type=token&show_dialog=true`
    return authEndpoint + clientId + redirectUrl + scopes + responseTypes
  }

  obertTokenUrlCallback(){
    if(!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&')
    return params[0].split('=')[1]
  }

  definirAccessToken(token: string){
    this.spotify.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}

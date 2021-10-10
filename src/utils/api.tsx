import { BASE_URL } from "./constants";
import { getCookie } from "./utils";

class Api {
  baseUrl: string;
  constructor(options: { baseUrl: string }) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(response: Response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ошибка: ${response.status}`));
  }

  getIngredients() {
    return fetch(`${this.baseUrl}/ingredients`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
      },
    }).then((response) => this._getResponseData(response));
  }

  makeOrder(ingredients: Array<string>) {
    return fetch(`${this.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    }).then((response) => this._getResponseData(response));
  }

  login(email: string, password: string) {
    return fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => this._getResponseData(response));
  }

  register(name: string, email: string, password: string) {
    console.log(name, email, password);
    return fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((response) => this._getResponseData(response));
  }

  refreshToken() {
    return fetch(`${this.baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie('refreshToken'),
      }),
    }).then((response) => this._getResponseData(response));
  }

  logout() {
    return fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie('refreshToken'),
      }),
    }).then((response) => this._getResponseData(response));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
      },
    }).then((response) => this._getResponseData(response));
  }

  updateUserInfo(name:string, email:string, password:string) {
    return fetch(`${this.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        name, email, password,
      }),
    }).then((response) => this._getResponseData(response));
  }

  requestResetPassword(email: string) {
    return fetch(`${this.baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }).then((response) => this._getResponseData(response));
  }

  resetPassword(password: string, token: string) {
    return fetch(`${this.baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    }).then((response) => this._getResponseData(response));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;

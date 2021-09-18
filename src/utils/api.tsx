import { BASE_URL } from "./constants";
import { setCookie, getCookie } from "./utils";

class Api {
  baseUrl: any;
  constructor(options: { baseUrl: any }) {
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

  makeOrder(ingredients: any) {
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
    }).then((response) => {
      let authToken;
      // Ищем интересующий нас заголовок
      response.headers.forEach((header) => {
        if (header.indexOf("Bearer") === 0) {
          // Отделяем схему авторизации от "полезной нагрузки токена",
          // Стараемся экономить память в куках (доступно 4кб)
          authToken = header.split("Bearer ")[1];
        }
      });
      if (authToken) {
        // Сохраняем токен в куку token
        setCookie("token", authToken, {});
      }
      return this._getResponseData(response);
    });
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
        token: "",
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
        token: "",
      }),
    }).then((response) => this._getResponseData(response));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
      },
    }).then((response) => this._getResponseData(response));
  }

  requestResetPassword(email: string) {
    return fetch(`${this.baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        email,
      }),
    }).then((response) => this._getResponseData(response));
  }

  resetPassword(password: string, token: string) {
    console.log('reset')
    return fetch(`${this.baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
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

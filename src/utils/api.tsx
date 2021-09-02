import {BASE_URL} from './constants';

class Api {
  baseUrl: any;
  constructor(options: { baseUrl: any; }) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getIngredients() {
    return fetch(`${this.baseUrl}/ingredients`, {
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  makeOrder(ingredients:any) {
    return fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        ingredients: ingredients,
      })
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;
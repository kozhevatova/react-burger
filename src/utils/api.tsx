import {BASE_URL} from './constants';

class Api {
  baseUrl: any;
  constructor(options: { baseUrl: any; }) {
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
        'Content-Type' : 'application/json'
      }
    }).then((response) => this._getResponseData(response));
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
    }).then((response) => this._getResponseData(response));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;
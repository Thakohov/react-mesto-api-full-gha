class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  createCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => this._checkResponse(res));
  }
}

const optionsApi = {
  url: "https://api.eldar.student.nomoredomainsmonster.ru",
  headers: {
    "Content-Type": "application/json",
    authorization: "",
  },
};

const api = new Api(optionsApi);

export default api;

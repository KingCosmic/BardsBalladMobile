import decode from 'jwt-decode';

class ApiService {
  // Initializing important variables
  constructor() {
    this.domain = 'https://api.bardsballad.com' // API server domain

    this.fetch = this.fetch.bind(this)
    this.loadCharacters = this.loadCharacters.bind(this)
    this.loadCharacter = this.loadCharacter.bind(this)
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this);
    this.getProfile = this.getProfile.bind(this)
  }

  updateCharacter(id, data) {
    return this.fetch(`${this.domain}/characters/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        data
      })
    }).then(res => {
      return Promise.resolve(res)
    })
  }

  createCharacter() {
    return this.fetch(`${this.domain}/characters/create`, {
      method: 'POST'
    }).then(res => {
      return Promise.resolve(res)
    })
  }

  loadCharacters() {
    return this.fetch(`${this.domain}/characters`, {
      method: 'GET'
    }).then(res => {
      return Promise.resolve(res)
    })
  }

  loadCharacter(id) {
    return this.fetch(`${this.domain}/characters/${id}`, {
      method: 'GET'
    }).then(res => {
      return Promise.resolve(res)
    })
  }

  login(email, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      this.setToken(res.token) // Setting the token in localStorage
      return Promise.resolve(res);
    })
  }

  signup(email, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      this.setToken(res.token) // Setting the token in localStorage
      return Promise.resolve(res);
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      else
        return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }


  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      console.log(response)
      var error = new Error(response)
      error.response = response
      throw error
    }
  }
}

export default new ApiService();
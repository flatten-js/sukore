import axiosBase from 'axios'

class Twitter {
  constructor(uri) {
    this.axios = this._create(uri)
  }

  _create(uri) {
    return axiosBase.create({
      baseURL: uri,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json'
    })
  }

  get(url, params) {
    params = this._params(params)
    return this.axios(url, { params })
  }

  _params(params) {
    Object.keys(params)
      .map(key => [key, this._camelToSnake(key)])
      .forEach(([old, _new]) => {
        if (old === _new) return
        Object.defineProperty(params, _new,
          Object.getOwnPropertyDescriptor(params, old))
        delete params[old];
      })
    return params
  }

  _camelToSnake(str) {
    return str.replace(/([A-Z])/g, s => `_${s.charAt(0).toLowerCase()}`)
  }
}

export const twitter = new Twitter('/api/twitter/')

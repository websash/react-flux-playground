import 'whatwg-fetch'

const API_ROOT = process.env.API_ROOT || 'http://localhost:3000/api/'

const utils = {
  handleStatus(response) {
    return new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
        // window.setTimeout(() => resolve(response), Math.random() * 2000 + 5000)
      } else {
        reject(new Error(response.statusText))
      }
    })
  },
  handleJSON(response) {
    return response.json()
  }
}

function fetchData(url) {
  return fetch(url).then(utils.handleStatus).then(utils.handleJSON)
}

export function getProducts() {
  return fetchData(API_ROOT + 'catalog.json')
}

export async function getCategories() {
  return fetchData(API_ROOT + 'categories.json')
}

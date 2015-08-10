import 'whatwg-fetch';

const API_ROOT = process.env.API_ROOT || 'http://localhost:3000/api/';

export const utils = {
  handleStatus(response) {
    return new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
        // window.setTimeout(() => resolve(response), Math.random() * 2000 + 3000);
      } else {
        reject(new Error(response.statusText));
      }
    });
  },
  handleJSON(response) {
    return response.json()
  }
}


export function getProducts() {
  return fetch(API_ROOT + 'catalog.json');
}

// export function getProduct(id) {
//   return fetch(`${API_ROOT}/product/${id}`);
// }

export function getCategories() {
  return fetch(API_ROOT + 'categories.json');
}

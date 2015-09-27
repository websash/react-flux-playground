import { Dispatcher } from 'flux'

const appDispatcher = new Dispatcher()

export function register(callback) {
  return appDispatcher.register(callback)
}

export function waitFor(ids) {
  return appDispatcher.waitFor(ids)
}

export function dispatch(actionType, actionPayload = {}) {

  if (!actionType) throw new Error('No action type specified')

  if (process.env.NODE_ENV !== 'production') {
    if (actionPayload.error) {
      console.error(actionType, actionPayload.error)
    } else {
      console.log(actionType, actionPayload)
    }
  }

  appDispatcher.dispatch({type: actionType, ...actionPayload})
}

export default appDispatcher

export const getOnLine = win => {
  if (!win) return true
  return win.navigator.onLine
}

export const CHANGE = '@@online-status/CHANGE'

export const change = online => ({ type: CHANGE, payload: online })

export const reducer = (state = getOnLine(window), { type, payload }) => {
  if (type === CHANGE) {
    return payload
  }
  return state
}

export const defaultCreateEventListener = ({ dispatch, getState }) => e => {
  const onLine = getOnLine(e.target)
  const { online: current } = getState()
  if (current !== onLine) {
    dispatch(change(onLine))
  }
}

const createEnhancer = ({ createEventListener = defaultCreateEventListener } = {}) => createStore => (...args) => {
  const store = createStore(...args)
  if (window) {
    const listener = createEventListener(store)
    ;['online', 'offline'].forEach(event => window.addEventListener(event, listener))
  }
  return store
}

export default createEnhancer

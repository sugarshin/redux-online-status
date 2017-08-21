const getOnLine = () => {
  if (!window) return true
  return window.navigator.onLine
}

export default getOnLine

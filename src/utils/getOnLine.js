const getOnLine = () => {
  if (typeof window === 'undefined') return true
  return window.navigator.onLine
}

export default getOnLine

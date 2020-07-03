export const set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const get = key => window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : ''

export const remove = key => {
  window.localStorage.removeItem(key)
}
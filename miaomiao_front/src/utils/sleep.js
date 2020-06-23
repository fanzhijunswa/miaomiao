export const sleep = () => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve()
    }, 2000)
  })
}
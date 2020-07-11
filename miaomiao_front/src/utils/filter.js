export let actorFilter = function (item) {
  if (!item) return ''
  return item.length ? item.join('、') : '未知'
}

export let birthdayFilter = function (val) {
  if (!val) return ''
  const date = new Date(val)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()
  return `${year}-${month}-${day}`
}

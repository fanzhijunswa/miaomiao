export let actorFilter = function (item) {
  if (!item) return ''
  return item.length ? item.join('、') : '未知'
}

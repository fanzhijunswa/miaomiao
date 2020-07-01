class Highdash {
  forEach (arr, fn) {
    if (!arr.length || !fn) return
    let [i, len] = [0, arr.length]
    do {
      fn(arr[i], i)
    } while (++i < len)
  }
}

const __ = new Highdash()

const arr = []
__.forEach(arr, (item, index) => {
  console.log(item)
})
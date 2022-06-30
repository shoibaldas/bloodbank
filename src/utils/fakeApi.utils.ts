export const delay = async (time: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, time)
  })
}

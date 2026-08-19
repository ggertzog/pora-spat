export const isNumberCheck = (string: string | undefined) => {
  if (string === undefined) {
    return false
  }
  if (isNaN(Number(string))) {
    return false
  }
  return true
}
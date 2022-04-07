const maskNumber = (number) => {
  number = number
    .replace(/[^\d]/g, '')
    .trim()
  return number
}

export default {
  maskNumber
}

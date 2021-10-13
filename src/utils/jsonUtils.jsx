export const IsJsonString = (jsonString) => {
  try {
    JSON.parse(jsonString)

  }
  catch (e) {
    return false
  }
  return true
}
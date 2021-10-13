export function getRectangleCoordinates(object, canvasWidth, canvasHeight, currentPageOriginalHeight, currentPageOriginalWidth, canvasMarginLeft, currentPageOriginalRotationAngle) {
  let coefficientY = 0
  let coefficientX = 0

  if(currentPageOriginalRotationAngle == 270 || currentPageOriginalRotationAngle == 90){
    coefficientY = canvasHeight / currentPageOriginalWidth
    coefficientX = canvasWidth / currentPageOriginalHeight
  }
  else {
    coefficientY = canvasHeight / currentPageOriginalHeight
    coefficientX = canvasWidth / currentPageOriginalWidth
  }
  
  //console.log('RotationAngle: ' + currentPageOriginalRotationAngle)

  if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "rectangle") {
    return getRectangleFieldCoordinates(object, coefficientX, coefficientY, canvasMarginLeft)
  } else if (object["objectType"] == "table") {
    return getRectangleTableCoordinates(object, coefficientX, coefficientY, canvasMarginLeft)
  }
}

export function getOriginalRectangleCoordinates(object, currentPageOriginalWidth, currentPageOriginalHeight, currentPageOriginalRotationAngle){
  if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "rectangle") {
    return getOriginalRectangleFieldCoordinates(object)
  } else if (object["objectType"] == "table") {
    return getOriginalRectangleTableCoordinates(object)
  }
}

function getRectangleFieldCoordinates(object, coefficientX, coefficientY, canvasMarginLeft) {
  const width     = object["fieldProperties"]["rectangle"][2] * coefficientX
  const height    = object["fieldProperties"]["rectangle"][3] * coefficientY
  const topLeftX  = object["fieldProperties"]["rectangle"][0] * coefficientX + canvasMarginLeft
  const topLeftY  = object["fieldProperties"]["rectangle"][1] * coefficientY

  return {
    width, height, topLeftX, topLeftY
  }
}

function getRectangleTableCoordinates(object, coefficientX, coefficientY, canvasMarginLeft) {
  const width     = (object["tableProperties"]["right"] - object["tableProperties"]["left"]) * coefficientX
  const height    = (object["tableProperties"]["end"]["y"] - object["tableProperties"]["start"]["y"]) * coefficientY
  const topLeftX  = object["tableProperties"]["left"] * coefficientX + canvasMarginLeft
  const topLeftY  = object["tableProperties"]["start"]["y"] * coefficientY

  return {
    width, height, topLeftX, topLeftY
  }
}

function getOriginalRectangleFieldCoordinates(object) {
  const width     = object["fieldProperties"]["rectangle"][2]
  const height    = object["fieldProperties"]["rectangle"][3]
  const topLeftX  = object["fieldProperties"]["rectangle"][0]
  const topLeftY  = object["fieldProperties"]["rectangle"][1]

  return {
    width, height, topLeftX, topLeftY
  }
}

function getOriginalRectangleTableCoordinates(object) {
  const width     = (object["tableProperties"]["right"] - object["tableProperties"]["left"])
  const height    = (object["tableProperties"]["end"]["y"] - object["tableProperties"]["start"]["y"])
  const topLeftX  = object["tableProperties"]["left"]
  const topLeftY  = object["tableProperties"]["start"]["y"]

  return {
    width, height, topLeftX, topLeftY
  }
}

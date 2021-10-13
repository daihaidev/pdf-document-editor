import React, { Component } from 'react'

import Rectangle from './elements/Rectangle'

export function generateRectangleField(objects, data) {
  var amount = 1
  objects.forEach((object) => {
    if (object["fieldProperties"] && object["fieldProperties"]["fieldType"] == "rectangle") {
      amount += 1
    }
  })

  return {
    "id": Date.now(),
    "objectType": "field",
    "name": "Rectangle" + amount,
    "fieldProperties": {
      "fieldType": "rectangle",
      "rectangle": [
        data["topLeftCornerX"],
        data["topLeftCornerY"],
        data["width"],
        data["height"]
      ],
      "pageIndex": data["page"]
    }
  }
}

export function generateRectangleTable(objects, data) {
  var amount = 1
  objects.forEach((object) => {
    if (object["objectType"] == "table") {
      amount += 1
    }
  })

  return {
    "id": Date.now(),
    "objectType": "table",
    "name": "Table" + amount,
    "tableProperties": {
      "start": {
        "y": data["topLeftCornerY"],
        "pageIndex": data["page"],
        "expression": null
      },
      "end": {
        "y": data["topLeftCornerY"] + data["height"],
        "pageIndex": data["page"],
        "expression": null
      },
      "left": data["topLeftCornerX"],
      "right": data["topLeftCornerX"] + data["width"]
    }
  }
}

export function generateStaticField(objects, data) {
  var amount = 1
  objects.forEach((object) => {
    if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "static") {
      amount += 1
    }
  })

  return {
    "id": Date.now(),
    "objectType": "field",
    "name": "StaticValue" + amount,
    "fieldProperties": {
      "fieldType": "static"
    }
  }
}

export function generateTextSearchField(objects) {
  var amount = 1
  objects.forEach((object) => {
    if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "macros") {
      amount += 1
    }
  })

  return {
    "id": Date.now(),
    "objectType": "field",
    "name": "TextSearch" + amount,
    "fieldProperties": {
      "fieldType": "macros",
      "expression": "",
      "dataType": "string"
    }
  }
}

export function generateSearchBasedTable(objects) {
  var amount = 1
  objects.forEach((object) => {
    if (object["objectType"] == "table" && object["tableType"] == "searchBased") {
      amount += 1
    }
  })

  return {
    "id": Date.now(),
    "objectType": "table",
    "tableType": "searchBased",
    "name": "SearchBasedTable" + amount,
    "tableProperties": JSON.stringify({
      "start": {
        "expression": "{{AnySymbol}}",
        "regex": true
      },
      "end": {
        "expression": "{{EndOfPage}}",
        "regex": true
      },
      "row": {
        "expression": "{{LineStart}}{{Spaces}}(?<Column1>{{SentenceWithSingleSpaces}}){{Spaces}}(?<Column2>{{SentenceWithSingleSpaces}})(?<Column3>{{Anything}}){{LineEnd}}",
        "regex": true
      },
      "columns": [
        {
          "name": "Column1",
          "dataType": "string"
        },
        {
          "name": "Column2",
          "dataType": "string"
        },
        {
          "name": "Column3",
          "dataType": "string"
        }
      ]
    }, null, 2)
  }
}

export function generateGridCellField(objects, data) {
  var amount = 1
  objects.forEach((object) => {
    if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "structure") {
      amount += 1
    }
  })

  return {
    "id": Date.now(),
    "objectType": "field",
    "name": "GridCell" + amount,
    "fieldProperties": {
      "fieldType": "structure",
      "pageIndex": data["page"],
      "structureCoordinates": {
        "x": 0,
        "y": 0
      }
    }
  }
}

export function drawRectangleElements(objects, page) {
  var elements = []
  if(objects && objects.length) {
    objects.forEach((object) => {
      const rectangle = object["fieldProperties"] && object["fieldProperties"]["fieldType"] == "rectangle" && object["fieldProperties"]["pageIndex"] == page - 1
      const table     = object["objectType"] == "table" && !object["tableType"] && object["tableProperties"]["start"]["pageIndex"] == page - 1
      const visibleTable = table && (object["tableProperties"]["right"] || object["tableProperties"]["end"]["y"])
  
      if (rectangle || visibleTable) {
        elements.push(<Rectangle key={object["id"]} templateObject={object} />)
      }
    })
  }

  return elements
}

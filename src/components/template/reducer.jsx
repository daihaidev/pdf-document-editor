import actionTypes from '../../constants/actionTypes'

const initialState = {
  templateVersion: 4,
  templatePriority: 0,
  culture: "en-US",
  objects: [],
  oldObjects: [],
  templateName: "",
  timestamp: undefined,
  options: {
    ocrMode: "auto",
    ocrLanguage: "eng"
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TEMPLATES:
    case actionTypes.SET_TEMPLATE:
      return action.template
    case actionTypes.RESET_TEMPLATE:
      return initialState
    case actionTypes.ADD_TEMPLATE_OBJECT:
      return {
        ...state,
        objects: [...state.objects, action.object],
        oldObjects: state.objects
      }
    case actionTypes.DELETE_TEMPLATE_OBJECT:
      return {
        ...state,
        objects: state.objects.filter(obj => obj.id != action.id),
        oldObjects: state.objects
      }

    case actionTypes.CHANGE_TEMPLATE_PRIORITY:
      return {
        ...state,
        templatePriority: action.templatePriority
      }
    case actionTypes.CHANGE_TEMPLATE_CULTURE:
      return {
        ...state,
        culture: action.culture
      }
    case actionTypes.CHANGE_TEMPLATE_OCR_MODE:
      return {
        ...state,
        options: {
          ...state.options,
          ocrMode: action.ocrMode
        }
      }
    case actionTypes.CHANGE_TEMPLATE_OCR_LANGUAGE:
      return {
        ...state,
        options: {
          ...state.options,
          ocrLanguage: action.ocrLanguage
        }
      }

    case actionTypes.CHANGE_TEMPLATE_NAME:
      return {
        ...state,
        templateName: action.templateName
      }
    case actionTypes.CHANGE_TEMPLATE_TIMESTAMP:
      return {
        ...state,
        templateName: action.timestamp
      }
    case actionTypes.CHANGE_OBJECT_NAME:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            const objectWithSameName = state.objects.find(object => object.name === action.name)
            let potentialName = action.name
            if (objectWithSameName) {
              let duplicated = true
              let count = 1
              while (duplicated) {
                potentialName = action.name + `(${count})`
                let duplicatedObject = state.objects.find(object => object.name === potentialName)
                if (duplicatedObject) {
                  count++
                  continue
                }
                else {
                  duplicated = false
                }
              }
            }

            return { ...item, name: potentialName }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_RECTANGLE_FIELD_COORDINATES:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                rectangle: [action.x, action.y, item["fieldProperties"]["rectangle"][2], item["fieldProperties"]["rectangle"][3]]
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_RECTANGLE_FIELD_SIZES:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                rectangle: [item["fieldProperties"]["rectangle"][0], item["fieldProperties"]["rectangle"][1], action.width, action.height]
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_RECTANGLE_TABLE_COORDINATES:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              tableProperties: {
                ...item["tableProperties"],
                right: item["tableProperties"]["right"] + (action.x - item["tableProperties"]["left"]),
                left: action.x,
                start: {
                  ...item["tableProperties"]["start"],
                  y: action.y
                },
                end: {
                  ...item["tableProperties"]["end"],
                  y: item["tableProperties"]["end"]["y"] + (action.y - item["tableProperties"]["start"]["y"])
                }
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_RECTANGLE_TABLE_SIZES:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              tableProperties: {
                ...item["tableProperties"],
                right: item["tableProperties"]["left"] + action.width,
                end: {
                  ...item["tableProperties"]["end"],
                  y: item["tableProperties"]["start"]["y"] + action.height
                }
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_TABLE_ROW_MERGING_RULE:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              tableProperties: {
                ...item["tableProperties"],
                rowMergingRule: action.rowMergingRule
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_OBJECT_DATA_TYPE:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                dataType: action.dataType,
                dateFormat: action.dataType == "date" ? "" : undefined
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_OBJECT_EXPRESSION:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                expression: action.expression
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_OBJECT_DATE_FORMAT:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                dateFormat: action.dateFormat
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_OBJECT_COALESCING_WITH:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            let fieldProperties = item["fieldProperties"] || {};
            if (!action.targetObjectId) {
              delete fieldProperties.coalesceWith;
            }
            else {
              fieldProperties = {
                ...fieldProperties,
                coalesceWith: action.targetObjectId
              }
            }
            return {
              ...item,
              fieldProperties
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_SEARCH_BASED_TABLE_PROPERTIES:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              tableProperties: action.tableProperties
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_GRID_CELL_FIELD_COLUMN:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                structureCoordinates: {
                  ...item["fieldProperties"]["structureCoordinates"],
                  x: action.x
                }
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.CHANGE_GRID_CELL_FIELD_ROW:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                structureCoordinates: {
                  ...item["fieldProperties"]["structureCoordinates"],
                  y: action.y
                }
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.INSERT_MACROS_INTO_OBJECT:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            if (item.objectType === 'table' && item.tableType === 'searchBased') {
              return {
                ...item,
                tableProperties: { ...JSON.parse(item.tableProperties), additionalMacro: action.macros }
              }
            }
            else {
              return {
                ...item,
                fieldProperties: {
                  ...item["fieldProperties"],
                  expression: (item["fieldProperties"]["expression"] || "") + action.macros
                }
              }
            }

          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
      return {
        ...state,
        objects: state.objects.map((item, index) => {
          if (item.id == action.id) {
            return {
              ...item,
              fieldProperties: {
                ...item["fieldProperties"],
                regex: action.regex
              }
            }
          } else {
            return item
          }
        }),
        oldObjects: state.objects
      }
    case actionTypes.UNDO_OBJECTS_CHANGES:
      return {
        ...state,
        objects: state.oldObjects
      }
    default:
      return state
  }
}

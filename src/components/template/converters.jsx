import yamljs from "yamljs"

export function yamlToTemplate(yaml) {
  const json = yamljs.parse(yaml)
  if(json.objects && json.objects.length > 0 ){
    json.objects = json.objects.map(obj => {
      if (obj.fieldProperties) {
        return {
          ...obj,
          objectType: "field"
        }
      } else if (obj.tableProperties) {
        return {
          ...obj,
          objectType: "table"
        }
      }
    })
  }

  return json
}

// converting template code if it is yaml or similar
export function convertTemplateCode(code) {
  // check if we have JSON or YML inside the code
  if(code !== undefined && code.length > 0){
    code = code.trim()
    
    if(code.startsWith('{')){
      // if we have json so nothing to do      
    }
    else {
      // probably we have YML as input
      // first we need to convert code from YML to JSON
      code = yamlToTemplate(code)
    }
  }

  try {
    // if it is string with json
    code = JSON.parse(code)

    if(code !== undefined){
      code = setMissingIds(code)
    }

    return code
  }
  catch(e) {
    // if it is JSON object then we need to stringify it first
    code = JSON.stringify(code, null, 2)

    if(code !== undefined){
      code = JSON.parse(code)
      code = setMissingIds(code)
    }

    return code
  }
}

// setting missing .id for every object if any
// this .id is used for object selection in UI
function setMissingIds(code) {
  if (code["templateVersion"] && code["objects"]) {
    code["objects"].map((object, index) => {
      if (object["id"] === undefined || object["id"] === 0) {
        object["id"] = Date.now() + index
      }

      return object
    });
  }

  return code
}

export function templateToYaml(data) {
  return yamljs.stringify(data)
}

export function templateToJSON(data) {
  return JSON.stringify(data, null, 2)
}
import React from 'react'
import { Combobox } from 'react-widgets';

export default class StaticValueFieldOptions extends React.Component {
  constructor(props) {
    super(props)
  }

  selectCoalescingObject = (e) => {
    this.props.changeObjectCoalescingObject(this.props.object.id, e.value)
  }

  render() {
    const fieldProperties = this.props.object["fieldProperties"]

    const filteredObjects = this.props.objects.filter((objectItem => objectItem.id !== this.props.object.id)).map(objectItem => (
      { value: objectItem.name, text: objectItem.name }
    ))

    const noneCoalescing = [{ text: '--none--', value: '' }]

    const targetObjects = noneCoalescing.concat(filteredObjects)

    return (
      <div className="object-options-body">
        <div className="form-group row">
          <label htmlFor="objectNameField" className="col-sm-5 col-form-label">Name</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="objectNameField"
              placeholder="Name"
              value={this.props.object.name}
              onChange={(e) => this.props.changeObjectName(this.props.object.id, e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-5 col-form-label">Type</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value="Static Field"
              disabled={true}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="objectValueField" className="col-sm-5 col-form-label">Value</label>
          <div className="col-sm-7">
            <textarea
              className="form-control"
              name="objectExpressionField"
              id="objectExpressionField"
              cols="30" rows="2"
              value={this.props.object.fieldProperties.expression}
              onChange={(e) => this.props.changeObjectExpression(this.props.object.id, e.target.value)}
            >
            </textarea>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="objectDataTypeField" className="col-sm-5 col-form-label">Coalescing with</label>
          <div className="col-sm-7">
            <Combobox
              dropDown
              className="mB-10 custom-combobox"
              onChange={this.selectCoalescingObject}
              value={this.props.object.fieldProperties.coalesceWith}
              valueField="value"
              placeholder="Select target"
              textField="text"
              data={targetObjects}
              messages={{ emptyList: 'There is no object' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

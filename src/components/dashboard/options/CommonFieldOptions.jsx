import React from 'react'
import { Combobox } from 'react-widgets'


export default class TextSearchFieldOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedDateFormat: "custom"
    }
  }

  selectDateFormat = (e) => {
    this.props.changeObjectDateFormat(this.props.object.id, e.value || e)
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
          <label htmlFor="objectNameField" className="col-sm-4 col-form-label">Name</label>
          <div className="col-sm-8">
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

        {this.props.children}

        <div className="form-group row">
          <label htmlFor="objectDataTypeField" className="col-sm-4 col-form-label">Data type</label>
          <div className="col-sm-8">
            <select
              name="objectDataTypeField"
              id="objectDataTypeField"
              value={this.props.object.fieldProperties.dataType}
              onChange={(e) => this.props.changeObjectDataType(this.props.object.id, e.target.value)}
              className="form-control"
            >
              <option value="string">String</option>
              <option value="date">Date</option>
              <option value="integer">Integer</option>
              <option value="decimal">Decimal or Currency</option>
            </select>
          </div>
        </div>
        {
          this.props.object.fieldProperties.dataType == "date" &&
          <div className="form-group row">
            <div className="col-sm-12">
              <Combobox
                dropDown
                className="mB-10 dashboard-combobox"
                onChange={this.selectDateFormat}
                value={this.props.object.fieldProperties.dateFormat}
                valueField="value"
                placeholder="Date Format"
                textField="text"
                data={[
                  { value: 'auto-mdy', text: 'Auto-MDY' },
                  { value: 'auto-dmy', text: 'Auto-DMY' },
                  { value: 'auto-ymd', text: 'Auto-YMD' }
                ]}
              />
            </div>
          </div>
        }
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

import React from 'react'
import classNames from 'classnames'
import BootstrapTable from 'react-bootstrap-table-next'

export default class RunTemplateResultGrid extends React.Component {
  render() {
    const {objects} = this.props

    const fieldColumns = [{
      dataField: 'name',
      text: 'Field',
      sort: true
    }, {
      dataField: 'value',
      text: 'Value',
      sort: true
    }];
    const fields = objects.filter(obj => obj["objectType"] == "field")

    const tables = objects.filter(obj => obj["objectType"] == "table").map(table => {
      const columns = Object.keys(table["rows"][0]).map(key => {
        return {
          dataField: key,
          text: key,
          sort: true
        }
      })
      const data = table["rows"].map(row => {
        var rowData = {}
        for (let [key, value] of Object.entries(row)) {
          rowData[key] = value["value"]
        }
        rowData["key"] = Date.now()

        return rowData
      })

      return (
        <div className="run-template-result-grid-table">
          <h3 className="mB-10">{table["name"]}</h3>
          <BootstrapTable keyField='key' data={data} columns={columns} />
        </div>
      )
    })

    const fieldsClassNames = classNames("run-template-result-grid-fields", {hidden: fields.length == 0})

    return (
      <div className="run-template-result-grid">
        <div className={fieldsClassNames}>
          <h3 className="mB-10">Fields</h3>
          <BootstrapTable keyField='name' data={ fields } columns={ fieldColumns } />
        </div>
        {tables}
      </div>
    );
  }
}

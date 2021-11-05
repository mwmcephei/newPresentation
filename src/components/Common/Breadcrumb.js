import React, { useState } from "react"
import PropTypes from "prop-types"
import { Row, Col, BreadcrumbItem } from "reactstrap"
import { Link, withRouter, useHistory } from "react-router-dom"

const Breadcrumb = props => {
  const history = useHistory()
  const [currentName, setCurrentName] = useState(props.currentMeasure.title)

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4>
          <div className="page-title-right">
            <div className="input-group input-group">
              <select
                className="form-select form-select-sm"
                value={"hallo"}
                onChange={e => {
                  //onChangeMonth(e.target.value)
                  //   console.log(e)
                  history.push("/measureReports/" + e.target.value)
                }}
              >
                {props.measures && props.measures.map(measure => {
                  return <option key={measure._id} value={measure._id}>{measure.title} {measure.name.length > 20 ? measure.name.substring(0, 20) + "..." : measure.name}</option>
                })}
              </select>
              {/* <div className="input-group-append"> */}
              <label className="input-group-text">Measure</label>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}



export default withRouter(Breadcrumb)

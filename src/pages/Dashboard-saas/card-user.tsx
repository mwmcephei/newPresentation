import React, { ReactElement, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"
import CSS from 'csstype';
import { getCircle, allianzBlue, structureNumberForDisplay } from "../../globalVars"



type overviewPropType = {
  overallProgress: number,
  kpiProgress: number,
  budget: number,
  numberOfMeasures: number,
  signal: number,
}


function CardUser(props: overviewPropType): ReactElement {
  const overallProgress_style: CSS.Properties = {
    width: props.overallProgress + "%",
    background: allianzBlue
  };
  const kpiProgress_style: CSS.Properties = {
    width: props.kpiProgress + "%",
    background: allianzBlue
  };



  const checkForDecimals = (input: number): number => {
    const inputAsString = input + ""
    if (inputAsString.includes(".")) {
      return parseFloat(input.toFixed(1))
    } else {
      return input
    }
  }


  return (
    <div>
      <Card style={{ height: "400px" }}>
        <CardBody>
          <CardTitle className="mb-1">IT Security Initiative</CardTitle>
          <h6 className="card-subtitle mb-3 ">HY2 2021</h6>
          <Row>
            <div className="text-lg-center mt-4 mt-4  ">
              <Row>
                <Col xs="4">
                  <div className="text-center">
                    <p className=" mb-2">
                      Total Measures
                          </p>
                    <div className="mt-3">
                      <h5 className="mb-0"> {props.numberOfMeasures} </h5>
                    </div>
                  </div>
                </Col>
                <Col xs="4">
                  <div >
                    <p className=" mb-2 text-center">
                      Approved Budget
                          </p>
                    <div className="text-center mt-3">
                      <h5 className="mb-2 align-self-center"> {structureNumberForDisplay(props.budget, true)} kEUR</h5>
                    </div>
                  </div>
                </Col>
                <Col xs="4" className="">
                  <div className="text-center">
                    <p className=" mb-2">
                      Overall Status
                          </p>
                    <div className="text-center ">
                      <div className="justify-content-center mx-auto">
                        {getCircle(props.signal, 20)}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="py-2">
                        <h5 className="font-size-14">
                          Overall Progress <span className="float-end">{checkForDecimals(props.overallProgress)}%</span>
                        </h5>
                        <div className="progress animated-progess progress-sm">
                          <div
                            className="progress-bar "
                            role="progressbar"
                            style={overallProgress_style}
                            aria-valuenow={checkForDecimals(props.overallProgress)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="py-2">
                        <h5 className="font-size-14">
                          KPI Progress <span className="float-end">{checkForDecimals(props.kpiProgress)}%</span>
                        </h5>
                        <div className="progress animated-progess progress-sm">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={kpiProgress_style}
                            aria-valuenow={checkForDecimals(props.kpiProgress)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Row>
            </div>
          </Row>
        </CardBody>
      </Card >
    </div>
  )
}

export default CardUser

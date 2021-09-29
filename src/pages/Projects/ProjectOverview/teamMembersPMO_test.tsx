import React, { ReactElement } from "react"
import PropTypes from "prop-types"
import { Button, Card, CardBody, CardTitle, Col, Container, Popover, PopoverBody, PopoverHeader, Table } from "reactstrap"
import { Link } from "react-router-dom"



const TeamMembers = (props): ReactElement => {




  return (


    <Card style={{ height: "380px" }}>
      <CardBody>
        <CardTitle className="mb-4">Team</CardTitle>

        <div className="table-responsive pt-4">
          <Table className="table align-middle table-nowrap">
            <tbody className="">

              <tr >
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      Ralf
                    </div>
                    <div>
                      Schneider
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: "#435fe3", color: "white" }}
                    >
                      PMO / Head
                        </Link>
                  </div>
                </td>
              </tr>

              <tr >
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      Marina
                    </div>
                    <div>
                      Dührkop
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: "#435fe3", color: "white" }}
                    >
                      PMO / Budget
                        </Link>
                  </div>
                </td>
              </tr>

              <tr >
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      Julian
                    </div>
                    <div>
                      Steinfeld
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: "#435fe3", color: "white" }}
                    >
                      PMO / Progress
                        </Link>
                  </div>
                </td>
              </tr>

              <tr >
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      Manuel
                    </div>
                    <div>
                      Hahn
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: "#435fe3", color: "white" }}
                    >
                      PMO / Progress
                        </Link>
                  </div>
                </td>
              </tr>

            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>

  )
}


export default TeamMembers

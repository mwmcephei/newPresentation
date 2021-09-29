import React, { ReactElement, useState } from "react"
import PropTypes from "prop-types"
import { Button, Card, CardBody, CardTitle, Col, Container, Popover, PopoverBody, PopoverHeader, Table } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"
import { Team, DividedName } from "../../../types"
import { Icon } from '@iconify/react';


const TeamMembersNew = (props): ReactElement => {
  const [team1PopOver, setTeam1PopOver] = useState(false)
  const [team2PopOver, setTeam2PopOver] = useState(false)
  const [team3PopOver, setTeam3PopOver] = useState(false)
  const [team4PopOver, setTeam4PopOver] = useState(false)


  const divideName = (name: string): DividedName => {
    const divided = name.split(" ")
    const firstNameLength = divided[0].length
    return {
      firstName: divided[0],
      lastName: name.substring(firstNameLength + 1, name.length)
    }
  }



  return (


    <Card style={{ height: "380px" }}>
      <CardBody>
        <CardTitle className="mb-4">Team</CardTitle>

        <div className="table-responsive pt-4">
          <Table className="table align-middle table-nowrap">
            <tbody className="">



              <tr className="mt-4">
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover1"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(!team1PopOver)
                          setTeam2PopOver(false)
                          setTeam3PopOver(false)
                          setTeam4PopOver(false)
                        }}
                      >
                        <div>
                          Ralf
                    </div>
                        <div>
                          Schneider
                    </div>
                      </div>
                      <Popover
                        placement="bottom"
                        isOpen={team1PopOver}
                        target="Popover1"
                        toggle={() => {
                          setTeam1PopOver(!team1PopOver)
                          setTeam2PopOver(false)
                          setTeam3PopOver(false)
                          setTeam4PopOver(false)
                        }}
                      >
                        <PopoverHeader>{props.lead}</PopoverHeader>
                        <PopoverBody >
                          <a className="d-flex align-items-center" style={{ fontSize: "15px", color: "black" }}>
                            <span className="m-2"  > ralf.schneider@allianz.de</span>
                          </a>
                        </PopoverBody>
                      </Popover>{" "}
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


              <tr className="mt-4">
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover2"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(false)
                          setTeam2PopOver(!team2PopOver)
                          setTeam3PopOver(false)
                          setTeam4PopOver(false)
                        }}
                      >
                        <div>
                          Marina
                    </div>
                        <div>
                          Dührkop
                    </div>
                      </div>
                      <Popover
                        placement="bottom"
                        isOpen={team2PopOver}
                        target="Popover2"
                        toggle={() => {
                          setTeam1PopOver(false)
                          setTeam2PopOver(!team2PopOver)
                          setTeam3PopOver(false)
                          setTeam4PopOver(false)
                        }}
                      >
                        <PopoverHeader>{props.measureSponsor}</PopoverHeader>
                        <PopoverBody >
                          <a className="d-flex align-items-center" style={{ fontSize: "15px", color: "black" }}>
                            <span className="m-2"  > marina.duehrkop@allianz.com</span>
                          </a>
                        </PopoverBody>
                      </Popover>{" "}
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



              <tr className="mt-4">
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover3"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(false)
                          setTeam2PopOver(false)
                          setTeam3PopOver(!team3PopOver)
                          setTeam4PopOver(false)
                        }}
                      >
                        <div>
                          Julian
                    </div>
                        <div>
                          Steinfeld
                    </div>
                      </div>
                      <Popover
                        placement="bottom"
                        isOpen={team3PopOver}
                        target="Popover3"
                        toggle={() => {
                          setTeam1PopOver(false)
                          setTeam2PopOver(false)
                          setTeam3PopOver(!team3PopOver)
                          setTeam4PopOver(false)
                        }}
                      >
                        <PopoverHeader>{props.lineOrgSponsor}</PopoverHeader>
                        <PopoverBody >
                          <a className="d-flex align-items-center" style={{ fontSize: "15px", color: "black" }}>
                            <span className="m-2"  > EXTERN.STEINFELD_JULIAN1@allianz.com</span>
                          </a>
                        </PopoverBody>
                      </Popover>{" "}
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

              <tr className="mt-4">
                <td style={{ width: "50px" }}>
                  <i className="bx bx-user " style={{ fontSize: "15px", marginRight: "2px" }}></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover4"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(false)
                          setTeam2PopOver(false)
                          setTeam3PopOver(false)
                          setTeam4PopOver(!team4PopOver)
                        }}
                      >
                        <div>
                          Manuel
                    </div>
                        <div>
                          Hahn
                    </div>
                      </div>
                      <Popover
                        placement="bottom"
                        isOpen={team4PopOver}
                        target="Popover4"
                        toggle={() => {
                          setTeam1PopOver(false)
                          setTeam2PopOver(false)
                          setTeam3PopOver(false)
                          setTeam4PopOver(!team4PopOver)
                        }}
                      >
                        <PopoverHeader>{props.solutionManager}</PopoverHeader>
                        <PopoverBody >
                          <a className="d-flex align-items-center" style={{ fontSize: "15px", color: "black" }}>
                            <span className="m-2"  > extern.hahn_manuel@allianz.com</span>
                          </a>
                        </PopoverBody>
                      </Popover>{" "}
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


export default TeamMembersNew

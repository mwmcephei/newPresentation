import React, { ReactElement, useState } from "react"
import PropTypes from "prop-types"
import { Button, Card, CardBody, CardTitle, Col, Container, Popover, PopoverBody, PopoverHeader, Table } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"
import { Team, DividedName } from "../../../types"
import { Icon } from '@iconify/react';


const TeamMembersNew = (props: Team): ReactElement => {
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
                          {divideName(props.lead).firstName}
                        </div>
                        <div>
                          {divideName(props.lead).lastName}
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
                            <Icon icon="lucide:phone-call" style={{ fontSize: "20px" }} />
                            <span className="m-2"  > 0171 34778112</span>
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
                      Measure Lead
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
                          {divideName(props.measureSponsor).firstName}
                        </div>
                        <div>
                          {divideName(props.measureSponsor).lastName}
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
                            <Icon icon="lucide:phone-call" style={{ fontSize: "20px" }} />
                            <span className="m-2"  > 0171 34778112</span>
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
                      Measure Lead
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
                          {divideName(props.lineOrgSponsor).firstName}
                        </div>
                        <div>
                          {divideName(props.lineOrgSponsor).lastName}
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
                            <Icon icon="lucide:phone-call" style={{ fontSize: "20px" }} />
                            <span className="m-2"  > 0171 34778112</span>
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
                      Line Organization Sponsor
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
                          {divideName(props.solutionManager).firstName}
                        </div>
                        <div>
                          {divideName(props.solutionManager).lastName}
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
                            <Icon icon="lucide:phone-call" style={{ fontSize: "20px" }} />
                            <span className="m-2"  > 0171 34778112</span>
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
                      Solution Manager
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

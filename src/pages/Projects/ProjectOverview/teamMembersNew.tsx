import React, { ReactElement, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Popover,
  PopoverBody,
  PopoverHeader,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Team, DividedName } from '../../../types';
import { Icon } from '@iconify/react';
import { divideName } from 'globalVars';

const TeamMembersNew = (props: Team): ReactElement => {
  const [team1PopOver, setTeam1PopOver] = useState(false);
  const [team2PopOver, setTeam2PopOver] = useState(false);
  const [team3PopOver, setTeam3PopOver] = useState(false);
  const [team4PopOver, setTeam4PopOver] = useState(false);

  return (
    <Card style={{ height: '400px' }}>
      <CardBody>
        <CardTitle className="mb-4">Team</CardTitle>

        <div className="table-responsive pt-4">
          <Table className="table align-middle table-nowrap">
            <tbody className="">
              <tr className="mt-4">
                <td style={{ width: '50px' }}>
                  <i
                    className="bx bx-user "
                    style={{ fontSize: '15px', marginRight: '2px' }}
                  ></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover1"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(!team1PopOver);
                          setTeam2PopOver(false);
                          setTeam3PopOver(false);
                          setTeam4PopOver(false);
                        }}
                      >
                        <div>
                          {divideName(props.lead.split('-')[0]).firstName}
                        </div>
                        <div>
                          {divideName(props.lead.split('-')[0]).lastName}
                        </div>
                      </div>
                      <Popover
                        placement="bottom"
                        isOpen={team1PopOver}
                        target="Popover1"
                        toggle={() => {
                          setTeam1PopOver(!team1PopOver);
                          setTeam2PopOver(false);
                          setTeam3PopOver(false);
                          setTeam4PopOver(false);
                        }}
                      >
                        <PopoverHeader>
                          {props.lead.split('-')[0]}
                        </PopoverHeader>
                        <PopoverBody>
                          <a
                            className="d-flex align-items-center"
                            style={{ fontSize: '15px', color: 'black' }}
                            href={
                              props.pmo
                                ? 'tel:+491718626630'
                                : 'tel:+49' +
                                  props.lead
                                    .split('-')[1]
                                    .substring(
                                      1,
                                      props.lead.split('-')[1].length,
                                    )
                            }
                          >
                            <Icon
                              icon="lucide:phone-call"
                              style={{ fontSize: '20px' }}
                            />
                            <span className="m-2">
                              {' '}
                              {props.pmo
                                ? '0171 8626630'
                                : props.lead.split('-')[1]}
                            </span>
                          </a>
                        </PopoverBody>
                      </Popover>
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: '#435fe3', color: 'white' }}
                    >
                      {props.pmo ? 'PMO / Head' : 'Measure Lead'}
                    </Link>
                  </div>
                </td>
              </tr>

              <tr className="mt-4">
                <td style={{ width: '50px' }}>
                  <i
                    className="bx bx-user "
                    style={{ fontSize: '15px', marginRight: '2px' }}
                  ></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover2"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(false);
                          setTeam2PopOver(!team2PopOver);
                          setTeam3PopOver(false);
                          setTeam4PopOver(false);
                        }}
                      >
                        <div>
                          {
                            divideName(props.measureSponsor.split('-')[0])
                              .firstName
                          }
                        </div>
                        <div>
                          {
                            divideName(props.measureSponsor.split('-')[0])
                              .lastName
                          }
                        </div>
                      </div>
                      <Popover
                        placement="bottom"
                        isOpen={team2PopOver}
                        target="Popover2"
                        toggle={() => {
                          setTeam1PopOver(false);
                          setTeam2PopOver(!team2PopOver);
                          setTeam3PopOver(false);
                          setTeam4PopOver(false);
                        }}
                      >
                        <PopoverHeader>
                          {props.measureSponsor.split('-')[0]}
                        </PopoverHeader>
                        <PopoverBody>
                          <a
                            className="d-flex align-items-center"
                            style={{ fontSize: '15px', color: 'black' }}
                            href={
                              props.pmo
                                ? 'tel:+491721368256'
                                : 'tel:+49' +
                                  props.measureSponsor
                                    .split('-')[1]
                                    .substring(
                                      1,
                                      props.measureSponsor.split('-')[1].length,
                                    )
                            }
                          >
                            <Icon
                              icon="lucide:phone-call"
                              style={{ fontSize: '20px' }}
                            />
                            <span className="m-2">
                              {' '}
                              {props.pmo
                                ? '0172 1368256'
                                : props.measureSponsor.split('-')[1]}
                            </span>
                          </a>
                        </PopoverBody>
                      </Popover>
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: '#435fe3', color: 'white' }}
                    >
                      {props.pmo ? 'PMO / Budget' : 'Measure Lead'}
                    </Link>
                  </div>
                </td>
              </tr>

              <tr className="mt-4">
                <td style={{ width: '50px' }}>
                  <i
                    className="bx bx-user "
                    style={{ fontSize: '15px', marginRight: '2px' }}
                  ></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover3"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(false);
                          setTeam2PopOver(false);
                          setTeam3PopOver(!team3PopOver);
                          setTeam4PopOver(false);
                        }}
                      >
                        <div>{divideName(props.lineOrgSponsor).firstName}</div>
                        <div>{divideName(props.lineOrgSponsor).lastName}</div>
                      </div>
                      {props.pmo && (
                        <Popover
                          placement="bottom"
                          isOpen={team3PopOver}
                          target="Popover3"
                          toggle={() => {
                            setTeam1PopOver(false);
                            setTeam2PopOver(false);
                            setTeam3PopOver(!team3PopOver);
                            setTeam4PopOver(false);
                          }}
                        >
                          <PopoverHeader>{props.lineOrgSponsor}</PopoverHeader>
                          <PopoverBody>
                            <a
                              className="d-flex align-items-center"
                              style={{ fontSize: '15px', color: 'black' }}
                              href="tel:+491771628540"
                            >
                              <Icon
                                icon="lucide:phone-call"
                                style={{ fontSize: '20px' }}
                              />
                              <span className="m-2"> 0171 34778112</span>
                            </a>
                          </PopoverBody>
                        </Popover>
                      )}
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: '#435fe3', color: 'white' }}
                    >
                      {props.pmo
                        ? 'PMO / Progress'
                        : 'Line Organization Sponsor'}
                    </Link>
                  </div>
                </td>
              </tr>

              <tr className="mt-4">
                <td style={{ width: '50px' }}>
                  <i
                    className="bx bx-user "
                    style={{ fontSize: '15px', marginRight: '2px' }}
                  ></i>
                </td>
                <td>
                  <h5 className="font-size-14 m-0">
                    <div>
                      <div
                        id="Popover4"
                        color="secondary"
                        onClick={() => {
                          setTeam1PopOver(false);
                          setTeam2PopOver(false);
                          setTeam3PopOver(false);
                          setTeam4PopOver(!team4PopOver);
                        }}
                      >
                        <div>{divideName(props.solutionManager).firstName}</div>
                        <div>{divideName(props.solutionManager).lastName}</div>
                      </div>
                      {props.pmo && (
                        <Popover
                          placement="bottom"
                          isOpen={team4PopOver}
                          target="Popover4"
                          toggle={() => {
                            setTeam1PopOver(false);
                            setTeam2PopOver(false);
                            setTeam3PopOver(false);
                            setTeam4PopOver(!team4PopOver);
                          }}
                        >
                          <PopoverHeader>{props.solutionManager}</PopoverHeader>
                          <PopoverBody>
                            <a
                              className="d-flex align-items-center"
                              style={{ fontSize: '15px', color: 'black' }}
                              href="tel:+4915253928484"
                            >
                              <Icon
                                icon="lucide:phone-call"
                                style={{ fontSize: '20px' }}
                              />
                              <span className="m-2"> 0152 53928484</span>
                            </a>
                          </PopoverBody>
                        </Popover>
                      )}
                    </div>
                  </h5>
                </td>
                <td>
                  <div>
                    <Link
                      to="#"
                      className="badge  bg-soft  font-size-11 me-1"
                      style={{ background: '#435fe3', color: 'white' }}
                    >
                      {props.pmo ? 'PMO / Progress' : 'Solution Manager'}
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default TeamMembersNew;

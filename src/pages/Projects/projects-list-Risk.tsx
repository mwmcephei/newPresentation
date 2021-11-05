import React, { ReactElement, useEffect, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { map } from 'lodash';
import { Badge, Col, Row, Table } from 'reactstrap';
import { Risk } from '../../types';

// TO DO: Why does risks come as an object and not as an array?
// This is just a workaround
interface RisksWrapperObject {
  risks: Risk[];
  history: any;
  location: any;
  match: any;
  staticContext: any;
}
const ProjectsList = (risks: RisksWrapperObject): ReactElement => {
  useEffect(() => {
    console.log('RISKS');
    console.log(risks);
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <div className="">
            {risks.risks.length > 0 ? (
              <div className="table-responsive">
                <Table className="project-list-table  align-middle table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Risks</th>
                      <th scope="col">Description</th>
                      <th scope="col">Criticality</th>
                      <th scope="col">Mitigation Activities</th>
                      <th scope="col">Resolution Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(risks.risks, (item, index) => (
                      <tr key={index}>
                        <td>{item.risk}</td>
                        <td>{item.description}</td>
                        <td>{item.criticality}</td>
                        <td>{item.migration}</td>
                        <td>{item.resolutionDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div
                style={{ fontSize: '20px', color: '#dbdbdb' }}
                className="d-flex justify-content-center mb-4"
              >
                <b>No Risks</b>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(ProjectsList);

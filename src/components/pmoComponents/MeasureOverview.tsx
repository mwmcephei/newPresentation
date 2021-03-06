import { useState, useEffect, ReactElement } from 'react';

import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { apiUrl, getMax } from '../../globalVars';
import MeasureList from '../../pages/Projects/projects-list';
import { Measure } from '../../types';
import BreadcrumbOnlyTitle from 'components/Common/BreadcrumbOnlyTitle';

const MeasureOverview = (): ReactElement => {
  const { filter } = useParams();
  const [measures, setMeasures] = useState<Measure[]>();

  useEffect(() => {
    const kpiStates = ['Behind ', 'On Track ', 'Achieved '];
    const overallStates = ['green', 'yellow', 'red'];
    fetch(apiUrl + '/measures')
      .then(response => response.json())
      .then(response => {
        if (filter) {
          let filteredMeasures;
          if (kpiStates.includes(filter)) {
            filteredMeasures = response.filter(m => {
              //    if (m.kpiProgress === kpiStates.indexOf(filter)) {
              if (m.kpiProgress === kpiStates.indexOf(filter)) {
                return m;
              }
            });
          } else if (overallStates.includes(filter)) {
            filteredMeasures = response.filter(m => {
              //    if (m.kpiProgress === kpiStates.indexOf(filter)) {
              if (
                getMax([m.artefact, m.budget, m.risk]) ===
                overallStates.indexOf(filter)
              ) {
                return m;
              }
            });
          } else {
            filteredMeasures = response;
          }

          setMeasures(filteredMeasures);
        } else {
          setMeasures(response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <BreadcrumbOnlyTitle breadcrumbItem="Measure Overview" />
          </Row>
          <MeasureList measures={measures} />
        </Container>
      </div>
    </>
  );
};

export default MeasureOverview;

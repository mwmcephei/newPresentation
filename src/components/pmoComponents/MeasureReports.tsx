import React, { ReactElement, useState, useEffect } from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Spinner,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import {
  apiUrl,
  formatBudgetDate,
  formatKPIDate,
  formatStatusDate,
} from '../../globalVars';
import ProjectDetail from 'pages/Projects/ProjectOverview/projectDetail';
import TeamMembers from 'pages/Projects/ProjectOverview/teamMembers';
import TeamMembersNew from 'pages/Projects/ProjectOverview/teamMembersNew';
import TotalSellingProduct from 'pages/Dashboard-saas/total-selling-product';
import TapVisitors from 'pages/Dashboard-Blog/TapVisitors';
import LineColumnArea from 'pages/AllCharts/apex/LineColumnAreaMeasureReport';
import ProjectsListRisks from 'pages/Projects/projects-list-Risk';
import ProjectsListKPI from 'pages/Projects/projects-list-KPI';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Measure } from '../../types';
import { toggleLeftmenu } from '../../store/actions';

const MeasureReports = (props): ReactElement => {
  const { measureID } = useParams();
  const [currentMeasure, setCurrentMeasure] = useState<Measure>();
  const [measures, setMeasures] = useState<Measure[]>();
  const [statusDate, setStatusDate] = useState<string>('');
  const [budgetDate, setBudgetDate] = useState<string>('');
  const [kpiDate, setKPIDate] = useState<string>('');
  const [kpiCardHeight, setKpiCardHeight] = useState<string>('auto');
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (window.innerWidth < 1100) {
      setKpiCardHeight('auto');
    } else {
      setKpiCardHeight('300px');
    }
  }, [window.innerWidth]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.innerWidth < 1100) {
      setKpiCardHeight('auto');
    } else {
      setKpiCardHeight('300px');
    }
    //    props.toggleLeftmenu(true)
    fetch(apiUrl + '/measures')
      .then(response => response.json())
      .then(response => {
        setMeasures(response);
        if (measureID) {
          response.map(m => {
            if (m._id === measureID) {
              setCurrentMeasure(m);
            }
          });
        } else {
          setCurrentMeasure(response[0]);
        }
      })
      .catch(error => {
        console.error(error);
      });

    fetch(apiUrl + '/overview')
      .then(response => response.json())
      .then(response => {
        setLabels(response.monthNames);
        setStatusDate(response.statusDate);
        setBudgetDate(response.budgetDate);
        setKPIDate(formatKPIDate(response.kpiDates[1]));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(apiUrl + '/measures')
      .then(response => response.json())
      .then(response => {
        setMeasures(response);
        if (measureID) {
          response.map(m => {
            if (m._id === measureID) {
              setCurrentMeasure(m);
            }
          });
        } else {
          setCurrentMeasure(response[0]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [measureID]);

  let team = <div></div>;
  if (currentMeasure) {
    team = (
      <TeamMembersNew
        lead={currentMeasure.measureLead}
        measureSponsor={currentMeasure.measureSponsor}
        lineOrgSponsor={currentMeasure.lineOrgSponsor}
        solutionManager={currentMeasure.solutionManager}
        pmo={false}
      />
    );
  }

  const measureReportStatus = currentMeasure && (
    <TotalSellingProduct
      artefacts={currentMeasure.artefact}
      budget={currentMeasure.budget}
      risks={currentMeasure.risk}
      date1={statusDate && formatStatusDate(statusDate)}
    />
  );

  const artefactsChart = currentMeasure && (
    <TapVisitors
      measureID={currentMeasure._id}
      totalApprovedBudget={currentMeasure.budgetDetail.totalApprovedBudget}
      date1={statusDate && formatStatusDate(statusDate)}
    />
  );

  const budgetChart = currentMeasure && (
    <LineColumnArea measure={currentMeasure} labels={labels} />
  );

  const kpi = currentMeasure && (
    <ProjectsListKPI
      kpiData={currentMeasure.kpiData}
      kpiName={currentMeasure.kpiName}
    />
  );

  const risks = currentMeasure && (
    <ProjectsListRisks risks={currentMeasure.risks} />
  );

  return (
    <>
      <div className="page-content">
        <Container>
          {currentMeasure && measures ? (
            <div>
              <Row>
                <Breadcrumbs
                  title=""
                  breadcrumbItem="Measure Reports"
                  measures={measures}
                  currentMeasure={currentMeasure}
                />
              </Row>
              <Row>
                {currentMeasure && (
                  <Col xs="12" xm="6" lg="6" xl="6">
                    <ProjectDetail currentMeasure={currentMeasure} />
                  </Col>
                )}
                <Col xs="12" xm="6" lg="6" xl="6">
                  {team}
                </Col>
              </Row>

              <Row>
                <Col xs="12" xm="6" lg="6" xl="6">
                  {measureReportStatus}
                </Col>
                <Col xs="12" xm="6" lg="6" xl="6">
                  <Card style={{ height: kpiCardHeight }}>
                    <CardBody>
                      <CardTitle className="mb-4">
                        KPI {formatKPIDate(kpiDate)}
                      </CardTitle>
                      {kpi}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs="12" xm="6" lg="6" xl="6">
                  {artefactsChart}
                </Col>
                <Col xs="12" xm="6" lg="6" xl="6">
                  <Card style={{ height: '500px' }}>
                    <CardBody>
                      <CardTitle className="mb-4">
                        Budget {formatBudgetDate(budgetDate)}
                      </CardTitle>
                      {budgetChart}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Container>
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">
                        Risks {currentMeasure.lastUpdate.split(' ')[2]}
                      </CardTitle>
                      {risks}
                    </CardBody>
                  </Card>
                </Container>
              </Row>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ height: '80vh' }}
            >
              <Spinner className="ms-6" color="primary" />
            </div>
          )}
        </Container>
      </div>
    </>
  );
};
export default MeasureReports;

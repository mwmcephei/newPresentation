import React, { ReactElement } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import {
  allianzBlue,
  standardGrey,
  structureNumberForDisplay,
} from 'globalVars';
import { useHistory } from 'react-router-dom';
import { DashboardCircleDiagram_PropTypeAlternative } from 'types';

const SalesAnalytics = (
  props: DashboardCircleDiagram_PropTypeAlternative,
): ReactElement => {
  const history = useHistory();

  const series: number[] = [props.yellow, props.green];
  let toolTipLabels = props.labels;
  const options = {
    labels: toolTipLabels,
    colors: [allianzBlue, standardGrey],

    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
  };

  return (
    <React.Fragment>
      <Card
        style={{ height: '450px', cursor: 'pointer' }}
        onClick={() => {
          history.push('/budget_reports/');
        }}
      >
        <CardBody className="d-flex flex-column justify-content-between">
          <h4 className="card-title mb-4">{props.title}</h4>

          <div>
            <div id="donut-chart">
              <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height={260}
                className="apex-charts"
              />
            </div>
          </div>

          <div className="text-center text-muted">
            <Row>
              <Col xs="6">
                <div className="mt-4">
                  <span className="mb-2 text-truncate">
                    <span>{props.labels[0]}</span>
                    <i
                      className="mdi mdi-circle  me-1"
                      style={{ color: allianzBlue }}
                    />
                  </span>
                  <h5 className="mt-2">
                    {structureNumberForDisplay(props.yellow, true)} kEUR
                  </h5>
                </div>
              </Col>
              <Col xs="6">
                <div className="mt-4">
                  <span className="mb-2 text-truncate">
                    <span>{props.labels[1]}</span>
                    <i
                      className="mdi mdi-circle  me-1 "
                      style={{ color: standardGrey }}
                    />
                  </span>
                  <h5 className="mt-2">
                    {structureNumberForDisplay(props.green, true)} kEUR
                  </h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default SalesAnalytics;

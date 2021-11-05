import React, { ReactElement, useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import {
  allianzBlue,
  getMax,
  standardGreen,
  standardGrey,
  standardRed,
  standardYellow,
} from 'globalVars';
import { useHistory } from 'react-router-dom';
import { DashboardCircleDiagram_PropType } from 'types';

const SalesAnalytics = (
  props: DashboardCircleDiagram_PropType,
): ReactElement => {
  const history = useHistory();

  const series: number[] = [props.yellow, props.green, props.red];
  let toolTipLabels = props.labels;
  if (props.labels[0] === 'Status ') {
    toolTipLabels = ['yellow', 'green', 'red'];
  }
  const options = {
    labels: props.isKPIChart
      ? [props.labels[1], props.labels[2], props.labels[0]]
      : toolTipLabels,
    colors: props.isKPIChart
      ? [allianzBlue, standardGreen, standardYellow]
      : [standardYellow, standardGreen, standardRed],

    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          if (props.isKPIChart) {
            history.push(
              '/measure_overview/' +
                config.w.config.labels[config.dataPointIndex],
            );
          } else {
            history.push(
              '/measure_overview/' +
                config.w.config.labels[config.dataPointIndex],
            );
          }
        },
      },
    },

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
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">
            {props.title} {props.date}
          </h4>

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
              <Col xs="4">
                <div className="mt-4">
                  <span className="mb-2 ">
                    <span>{props.labels[0]}</span>
                    {props.isKPIChart ? (
                      <i
                        className="mdi mdi-circle  me-1"
                        style={{ color: standardYellow }}
                      />
                    ) : (
                      <i
                        className="mdi mdi-circle  me-1"
                        style={{ color: standardRed }}
                      />
                    )}
                  </span>
                  <h5 className="mt-2">{props.red}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <span className="mb-2 text-truncate">
                    <span>{props.labels[1]}</span>
                    {props.isKPIChart ? (
                      <i
                        className="mdi mdi-circle  me-1"
                        style={{ color: allianzBlue }}
                      />
                    ) : (
                      <i
                        className="mdi mdi-circle  me-1"
                        style={{ color: standardYellow }}
                      />
                    )}
                  </span>
                  <h5 className="mt-2">{props.yellow}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <span className="mb-2 text-truncate">
                    <span>{props.labels[2]}</span>
                    <i
                      className="mdi mdi-circle  me-1"
                      style={{ color: standardGreen }}
                    />
                  </span>
                  <h5 className="mt-2">{props.green}</h5>
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

import React, { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import TotalSellingProductStatus from 'pages/Dashboard-saas/total-selling-product-BudgetStatus';
import { apiUrl } from 'globalVars';
import { Measure } from 'types';
import LineColumnArea from 'pages/AllCharts/apex/LineColumnArea';
import MeasureList from '../../pages/Projects/projects-list-Budget';
import BreadcrumbOnlyTitle from 'components/Common/BreadcrumbOnlyTitle';
import Breadcrumbs from '../../components/Common/Breadcrumb';

const BudgetReport = (): ReactElement => {
  const [measures, setMeasures] = useState<Measure[]>();
  const [labels, setLabels] = useState<string[]>([]);
  const [monthlySpendings, setMonthlySpendings] = useState<number[]>([0]);
  const [approved, setApproved] = useState<number>(0);

  useEffect(() => {
    fetch(apiUrl + '/measures')
      .then(response => response.json())
      .then(response => {
        setMeasures(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(apiUrl + '/budget')
      .then(response => response.json())
      .then(response => {
        if (response.monthlySpendings && response.approvedBudgetPerMonth) {
          setMonthlySpendings(response.monthlySpendings);
          setApproved(response.approvedBudgetPerMonth);
        }
      })
      .catch(error => {
        console.error(error);
      });
    fetch(apiUrl + '/overview')
      .then(response => response.json())
      .then(response => {
        setLabels(response.monthNames);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const budgetDetails = (): number[] => {
    let approvedSum = 0;
    let contractSum = 0;
    let spentSum = 0;
    let invoicedSum = 0;
    let forecastSum = 0;
    if (measures) {
      measures.map(m => {
        approvedSum += m.budgetDetail.totalApprovedBudget;
        contractSum += m.budgetDetail.contractBudget;
        spentSum += m.budgetDetail.spentBudget;
        invoicedSum += m.budgetDetail.invoicedBudget;
        forecastSum += m.budgetDetail.forecastBudget;
      });
    }
    return [approvedSum, contractSum, spentSum, invoicedSum, forecastSum];
  };

  const BudgetChart = (): ReactElement => {
    if (measures) {
      return (
        <LineColumnArea
          labels={labels}
          monthlySpendings={monthlySpendings}
          approved={approved}
        />
      );
    }
  };

  return (
    <>
      <div className="page-content">
        <Container>
          <Row>
            <Container>
              <BreadcrumbOnlyTitle ttle="" breadcrumbItem="Budget Report" />
            </Container>
          </Row>

          <Row>
            <Col xs="12" xm="6" lg="6" xl="6">
              <TotalSellingProductStatus
                budgetSignal={
                  measures &&
                  Math.max(
                    ...measures.map(m => {
                      return m.budget;
                    }),
                  )
                }
                budgetDetail={budgetDetails()}
              />
            </Col>

            <Col xs="12" xm="6" lg="6" xl="6">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Budget Overview</CardTitle>
                  {measures && monthlySpendings && approved && BudgetChart()}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Container>
              <MeasureList measures={measures} />
            </Container>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BudgetReport;

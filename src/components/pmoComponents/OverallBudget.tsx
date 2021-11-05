import BreadcrumbOnlyTitle from 'components/Common/BreadcrumbOnlyTitle';
import { apiUrl, convertCategory, structureNumberForDisplay } from 'globalVars';
import SalesAnalytics from 'pages/Dashboard-saas/sales-analyticsAllBudgetsPage';
import React, { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { OldMeasuresCategoryAmountAndBudget, PastBudget } from 'types';
import ProjectsListPastBudget from '../../pages/Projects/projects-list-PastBudget';

const OverallBudget = (): ReactElement => {
  const [pastBudgets, setPastBudgets] = useState<PastBudget[]>();

  const [data, setData] = useState<OldMeasuresCategoryAmountAndBudget[]>([
    {
      categoryName: convertCategory('GSP'),
      amount: 40,
      budget: 53459932,
    },
    {
      categoryName: convertCategory('PxQ'),
      amount: 14,
      budget: 15177645,
    },
    {
      categoryName: convertCategory('Other Infra'),
      amount: 42 + 9,
      budget: 36880847 + 13764934,
    },
    /* {
       categoryName: convertCategory("Local Services"),
       amount: 9,
       budget: 13764934
     },*/
    {
      categoryName: convertCategory('AZSE Global Governance'),
      amount: 47,
      budget: 33527640,
    },
    {
      categoryName: convertCategory('Allianz Human Firewall'),
      amount: 8,
      budget: 6216427,
    },
  ]);

  useEffect(() => {
    fetch(apiUrl + '/pastBudget')
      .then(response => response.json())
      .then(response => {
        setPastBudgets(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getUniqueCategories = (): string[] => {
    let allCategories = [];
    pastBudgets.map(pb => {
      allCategories.push(pb.category);
    });
    return [...new Set(allCategories)];
  };

  const filterBudgetsByCategory = (category): PastBudget[] => {
    let result = [];
    pastBudgets.map(pb => {
      if (pb.category === category) {
        result.push(pb);
      }
    });
    return result;
  };

  const getUniqueYears = (): number[] => {
    let allYears = [];
    pastBudgets &&
      pastBudgets.map(pb => {
        allYears.push(pb.year);
      });
    return [...new Set(allYears)];
  };

  return (
    <>
      <div className="page-content">
        <Container>
          <Row>
            <BreadcrumbOnlyTitle breadcrumbItem="All Measures" />
          </Row>

          <Row>
            <Container>
              <Card>
                <CardBody className="">
                  <h4 className="card-title ">
                    From {getUniqueYears()[0]} to{' '}
                    {getUniqueYears()[getUniqueYears().length - 1]}
                  </h4>

                  <div className="d-flex justify-content-around align-items-center">
                    <h5>
                      Amount of Measures: {pastBudgets && pastBudgets.length}
                    </h5>
                    <h5>
                      Total Budget:{' '}
                      {pastBudgets &&
                        structureNumberForDisplay(
                          pastBudgets
                            .map(pb => {
                              return pb.budget;
                            })
                            .reduce((partial_sum, a) => partial_sum + a, 0),
                          true,
                        )}{' '}
                      kEUR
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Container>
          </Row>
          <Row>
            <Col xs="12" xm="6" lg="6" xl="6">
              <SalesAnalytics
                title={'Amount of Measures per Security Domain'}
                data={data}
                isQuantity={true}
              />
            </Col>
            <Col xs="12" xm="6" lg="6" xl="6">
              <SalesAnalytics
                title={'Budget per Security Domain'}
                data={data}
                isQuantity={false}
              />
            </Col>
          </Row>

          <Row>
            <ProjectsListPastBudget
              pastBudgets={pastBudgets}
              uniqueYears={getUniqueYears()}
            />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default OverallBudget;

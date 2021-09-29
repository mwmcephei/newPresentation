import BreadcrumbOnlyTitle from "components/Common/BreadcrumbOnlyTitle"
import { apiUrl, structureNumberForDisplay } from "globalVars"
import SalesAnalytics from "pages/Dashboard-saas/sales-analyticsAlternativeBudgetPage"
import React, { ReactElement } from "react"
import { useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { PastBudget } from "types"
import ProjectsListPastBudget from "../../pages/Projects/projects-list-PastBudget"

const OverallBudget = (): ReactElement => {
  const [pastBudgets, setPastBudgets] = useState<PastBudget[]>()
  /*
  Allianz Global IS Governance
  Allianz Human Firewall
  Allianz IS Global Platform
  Allianz IS Shared Services
  Embedded infrastructure Security Services
*/
  const [data, setData] = useState([
    {
      categoryName: "GSP",
      amount: 40,
      budget: 53459932
    },
    {
      categoryName: "PxQ",
      amount: 14,
      budget: 15177645
    },
    {
      categoryName: "Other Infra",
      amount: 42,
      budget: 36880847
    },
    {
      categoryName: "Local Services",
      amount: 9,
      budget: 13764934
    },
    {
      categoryName: "AZSE Global Governance",
      amount: 47,
      budget: 33527640
    },
    {
      categoryName: "Allianz Human Firewall",
      amount: 8,
      budget: 6216427
    },
  ])

  useEffect(() => {
    fetch(apiUrl + "/pastBudget")
      .then(response => response.json())
      .then(response => {
        setPastBudgets(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);


  const getUniqueCategories = (): string[] => {
    let allCategories = []
    pastBudgets.map(pb => {
      allCategories.push(pb.category)
    })
    console.log([...new Set(allCategories)])
    return [...new Set(allCategories)]
  }

  const filterBudgetsByCategory = (category): PastBudget[] => {
    let result = []
    pastBudgets.map(pb => {
      if (pb.category === category) {
        result.push(pb)
      }
    })
    return result
  }




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
                <CardBody className="d-flex justify-content-around align-items-center">
                  <h5>
                    Amount of Measures: {pastBudgets && pastBudgets.length}
                  </h5>
                  <h5>
                    Total Budget: {pastBudgets &&
                      structureNumberForDisplay(pastBudgets.map(pb => { return pb.budget }).reduce((partial_sum, a) => partial_sum + a, 0), true)} kEUR
                  </h5>
                </CardBody>
              </Card>
            </Container>

          </Row>
          <Row>
            <Col xs="12" xm="6" lg="6" xl="6">
              <SalesAnalytics title={"Amount of Measures per Security Domain"}
                data={data}
                isQuantity={true}
              />
            </Col>
            <Col xs="12" xm="6" lg="6" xl="6">
              <SalesAnalytics title={"Budget per Security Domain"}
                data={data}
                isQuantity={false}
              />
            </Col>
          </Row>

          <Row>
            <ProjectsListPastBudget pastBudgets={pastBudgets} />
          </Row>
        </Container>
      </div>
    </>
  )
}

export default OverallBudget

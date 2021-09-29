import { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { apiUrl, getMax } from "../../globalVars"
import { useHistory } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Spinner,
} from "reactstrap"
import CardUser from "../../pages/Dashboard-saas/card-user"
import LineColumnArea from "pages/AllCharts/apex/LineColumnArea"
import SalesAnalyticsAlternative from 'pages/Dashboard-saas/sales-analyticsAlternative'
import SalesAnalytics from 'pages/Dashboard-saas/sales-analytics'
import BreadcrumbOnlyTitle from 'components/Common/BreadcrumbOnlyTitle';
import TeamMembers from 'pages/Projects/ProjectOverview/teamMembersPMO';


type OverviewType = {
    _id: String,
    name: String,
    kpiProgress: number,
    overallStatus: number,
    totalBudget: number,
    progress: number,
    measures: String[],
    kpiDates: string[],
    budgetDate: string;
    statusDate: string;
}



const Overview = (): ReactElement => {
    const history = useHistory()
    const [overviewData, setOverviewData] = useState<OverviewType>()
    const [measures, setMeasures] = useState([])
    const [measuresPieChart, setMeasuresPieChart] = useState({ redCounter: 0, yellowCounter: 0, greenCounter: 0 })
    const [measurePKI_pieChart, setMeasurePKI_pieChart] = useState({ redCounter: 0, yellowCounter: 0, greenCounter: 0 })
    const [labels, setLabels] = useState<string[]>([])
    const [monthlySpendings, setMonthlySpendings] = useState<number[]>([0])
    const [approved, setApproved] = useState<number>(0)
    const [overallStatusState, setOverallStatus] = useState<string[]>(["green", "yellow", "red"])
    const [kpiStates, setKpiStates] = useState<string[]>(["Behind ", "On Track ", "Achieved "])


    useEffect(() => {
        fetch(apiUrl + "/budget")
            .then(response => response.json())
            .then(response => {
                if (response.monthlySpendings && response.approvedBudgetPerMonth) {
                    setMonthlySpendings(response.monthlySpendings)
                    let labels: string[] = []
                    for (let i = 0; i < response.monthlySpendings.length; i++) {
                        const date = "0" + (i + 1) + "/01/" + response.year
                        labels.push(date)
                    }
                    setLabels(labels)
                    setMonthlySpendings(response.monthlySpendings)
                    setApproved(response.approvedBudgetPerMonth)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


    useEffect(() => {
        if (approved) {
            fetch(apiUrl + "/overview")
                .then(response => response.json())
                .then(response => {
                    setOverviewData(response)
                    fetch(apiUrl + "/measures")
                        .then(response => response.json())
                        .then(response => {
                            setMeasures(response)
                        })
                        .catch(error => console.log(error));

                })
                .catch(error => console.log(error));
        }
    }, [approved]);


    useEffect(() => {
        let greenCounter = 0
        let yellowCounter = 0
        let redCounter = 0
        measures.map(measure => {
            const max = Math.max(...[measure.budget, measure.risk, measure.artefact])
            switch (max) {
                case 0:
                    greenCounter += 1
                    break;
                case 1:
                    yellowCounter += 1
                    break;
                case 2:
                    redCounter += 1
                    break;
            }
        })
        setMeasuresPieChart({
            redCounter,
            yellowCounter,
            greenCounter
        })
        // kpi pie chart
        let greenCounter_kpi = 0
        let yellowCounter_kpi = 0
        let redCounter_kpi = 0
        measures.map(measure => {
            switch (measure.kpiProgress) {
                case 0:
                    redCounter_kpi += 1
                    break;
                case 1:
                    yellowCounter_kpi += 1
                    break;
                case 2:
                    greenCounter_kpi += 1
                    break;
            }
        })
        setMeasurePKI_pieChart({
            redCounter: redCounter_kpi,
            yellowCounter: yellowCounter_kpi,
            greenCounter: greenCounter_kpi
        })
    }, [measures]);





    const getOverview = (overViewProps: OverviewType): ReactElement => {
        const colorCounters = [0, 0, 0]
        measures.map(m => {
            const x = getMax([m.artefact, m.budget, m.risk])        // overall status of measure
            colorCounters[x] = colorCounters[x] + 1
        })
        const overallStatus = colorCounters.findIndex(item => item === getMax(colorCounters))
        let overview = <div>overview</div>
        if (overViewProps && typeof overViewProps != 'undefined') {
            overview = <div style={{ cursor: "pointer" }}
                onClick={() => { history.push("/measure_overview/") }}>
                <CardUser signal={overallStatus}
                    budget={overViewProps.totalBudget}
                    numberOfMeasures={overViewProps.measures.length}
                    overallProgress={overViewProps.progress * 100}
                    kpiProgress={overViewProps.kpiProgress}
                />
            </div>
        }
        return overview
    }

    const getBudgetPieChart = () => {
        let totalSpent = 0
        let totalApproved = 0
        measures.map(m => {
            totalSpent += m.budgetDetail.spentBudget
            totalApproved += m.budgetDetail.totalApprovedBudget
        })
        return <SalesAnalyticsAlternative title={"Budget: Approved & Spent " + overviewData.budgetDate}
            green={totalApproved}
            yellow={totalSpent}
            labels={["Spent ", "Approved "]}
        />
    }


    const getBudgetChart = (labels: string[], monthlySpendings: number[], approved: number): ReactElement => {
        let budgetChart = <div>budgetChart</div>
        if (labels && monthlySpendings && approved) {
            budgetChart = <LineColumnArea labels={labels} monthlySpendings={monthlySpendings} approved={approved} />
        }
        return budgetChart
    }



    let content = <div className="d-flex justify-content-center align-items-center " style={{ height: "80vh" }}>
        <Spinner className="ms-6" color="primary" />
    </div>

    if (overviewData && measures && measuresPieChart && measurePKI_pieChart && labels && monthlySpendings && approved) {
        content = (<div>
            <Row>
                <Container >
                    <BreadcrumbOnlyTitle ttle="" breadcrumbItem="Dashboard" />
                </Container>
            </Row>

            <Row>
                <Container >
                    <Row>
                        <Col xs="12" xm="6" lg="6" xl="6">
                            {getOverview(overviewData)}
                        </Col>
                        <Col xs="12" xm="6" lg="6" xl="6">
                            <TeamMembers />
                        </Col>
                    </Row>
                </Container>
            </Row>

            <Row>
                <Container>
                    <Row>
                        <Col xs="12" xm="6" lg="6" xl="6">
                            <SalesAnalytics title={"Status of Measures"}
                                green={measuresPieChart.greenCounter}
                                yellow={measuresPieChart.yellowCounter}
                                red={measuresPieChart.redCounter}
                                labels={["Status ", "Status ", "Status "]}
                                isKPIChart={false}
                                date={overviewData.statusDate}
                            />
                        </Col>
                        <Col xs="12" xm="6" lg="6" xl="6">
                            <SalesAnalytics title={"KPI"}
                                green={measurePKI_pieChart.greenCounter}
                                yellow={measurePKI_pieChart.yellowCounter}
                                red={measurePKI_pieChart.redCounter}
                                labels={kpiStates}
                                isKPIChart={true}
                                date={overviewData.kpiDates[1]}
                            />
                        </Col>
                    </Row>
                </Container>
            </Row>

            <Row>
                <Container>
                    <Row>
                        <Col xs="12" xm="6" lg="6" xl="6">
                            {getBudgetPieChart()}
                        </Col>
                        <Col xs="12" xm="6" lg="6" xl="6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Monthly Burn Rate {overviewData.budgetDate}</CardTitle>
                                    {getBudgetChart(labels, monthlySpendings, approved)}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </div>)
    }


    return (
        <>
            <div className="page-content">
                <Container fluid>
                    {content}
                </Container>
            </div>
        </>
    )
}

export default Overview

import React, { ReactElement, useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { allianzBlue, standardGrey, structureNumberForDisplay } from "globalVars"
import { map } from "lodash"






const SalesAnalytics = ({ title, data, isQuantity }): ReactElement => {
  const [labels, setLabels] = useState<string[]>()
  const [colors, setColors] = useState<string[]>()
  const [dataSeries, setSeries] = useState<number[]>()

  useEffect(() => {
    setLabels(data.map(d => d.categoryName))
    setColors([allianzBlue, "#e0efff", "#9bc8fa", "#8596a8", "#c3d3e3", standardGrey,])
    setSeries(isQuantity ? data.map(d => d.amount) : data.map(d => d.budget))
  }, []);

  const series: number[] = dataSeries ? dataSeries : []
  const options = {
    labels: labels ? labels : [],
    colors: colors ? colors : [],

    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  }

  return (
    <React.Fragment>
      <Card >
        <CardBody className="d-flex flex-column justify-content-between">
          {(labels && colors && dataSeries) ? <div>
            <h4 className="card-title mb-4">{title}</h4>

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
                <Col xs="12" xm="12" lg="12" xl="12">
                  <div>
                    <div className="mt-4">
                      <span className="mb-2 text-truncate">
                        <span>{labels[0]} </span>
                        <i className="mdi mdi-circle  me-1" style={{ color: colors[0] }} />
                      </span>
                      <h5 className="mt-2">{isQuantity ? dataSeries[0] : structureNumberForDisplay(dataSeries[0], true)} {!isQuantity && "kEUR"}</h5>
                    </div>
                    <div className="mt-4">
                      <span className="mb-2 text-truncate">
                        <span>{labels[1]} </span>
                        <i className="mdi mdi-circle  me-1" style={{ color: colors[1] }} />
                      </span>
                      <h5 className="mt-2">{isQuantity ? dataSeries[1] : structureNumberForDisplay(dataSeries[1], true)} {!isQuantity && "kEUR"}</h5>
                    </div>
                  </div>
                </Col>
                <Col xs="12" xm="12" lg="12" xl="12">
                  <div>
                    <div className="mt-4">
                      <span className="mb-2 text-truncate">
                        <span>{labels[2]} </span>
                        <i className="mdi mdi-circle  me-1" style={{ color: colors[2] }} />
                      </span>
                      <h5 className="mt-2">{isQuantity ? dataSeries[2] : structureNumberForDisplay(dataSeries[2], true)} {!isQuantity && "kEUR"}</h5>
                    </div>
                    <div className="mt-4">
                      <span className="mb-2 text-truncate">
                        <span>{labels[3]} </span>
                        <i className="mdi mdi-circle  me-1" style={{ color: colors[3] }} />
                      </span>
                      <h5 className="mt-2">{isQuantity ? dataSeries[3] : structureNumberForDisplay(dataSeries[3], true)} {!isQuantity && "kEUR"}</h5>
                    </div>
                  </div>
                </Col>
                <Col xs="12" xm="12" lg="12" xl="12" >
                  <div className={window.innerWidth < 1400 ? "ml-4 d-flex justify-content-around" : ""}>
                    <div className="mt-4 text-center ml-4">
                      <span className="mb-2 text-truncate">
                        <span>{labels[4]} </span>
                        <i className="mdi mdi-circle  me-1" style={{ color: colors[4] }} />
                      </span>
                      <h5 className="mt-2">{isQuantity ? dataSeries[4] : structureNumberForDisplay(dataSeries[4], true)} {!isQuantity && "kEUR"}</h5>
                    </div>

                  </div>
                </Col>

              </Row>
            </div>
          </div>
            :
            <div></div>}
        </CardBody>
      </Card>
    </React.Fragment >
  )
}

export default SalesAnalytics



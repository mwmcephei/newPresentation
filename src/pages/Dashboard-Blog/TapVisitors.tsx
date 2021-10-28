import { apiUrl, allianzBlue } from "globalVars"
import React, { useEffect, useState } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
} from "reactstrap"
import { Artefact } from "../../types"

type TapVisitorsProps = {
  measureID: string,
  totalApprovedBudget: number,
  date1: string
}

function TapVisitors({ measureID, totalApprovedBudget, date1 }: TapVisitorsProps) {
  const [artefacts, setArtefacts] = useState<Artefact[]>()

  useEffect(() => {
    fetch(apiUrl + "/measure/" + measureID + "/artefacts")
      .then(response => response.json())
      .then(response => {
        setArtefacts(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  useEffect(() => {
    fetch(apiUrl + "/measure/" + measureID + "/artefacts")
      .then(response => response.json())
      .then(response => {
        setArtefacts(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [measureID]);


  const overallProgress = (arts) => {
    /*
    let sum = 0
    for (let i = 0; i < arts.length; i++) {
      sum = sum + arts[i].progress
    }
    return sum / arts.length
*/
    let sumOverArtefacts = 0
    for (let i = 0; i < arts.length; i++) {
      const budgetAsNumber = artefacts[i].budget.length > 0 ? parseInt(artefacts[i].budget.substring(0, artefacts[i].budget.length - 2)) * 1000 : 0
      sumOverArtefacts = sumOverArtefacts + (budgetAsNumber * artefacts[i].progress)
    }
    return sumOverArtefacts / totalApprovedBudget

  }


  const shortenText = (text, len) => {
    if (text) {
      if (text.length > len) {
        return text.substring(0, len) + "..."
      } else {
        return text
      }
    } else {
      return ""
    }

  }


  return (
    <div >

      <Col xl={12} >
        <Card style={{ height: "500px" }}>
          <CardBody>
            <div className="d-flex flex-column">

              <div className="ms-2">
                <h5 className="card-title mb-3">Artefacts Progress {date1}</h5>
              </div>

              {   /*    <div className="p-3" style={{ width: "100%" }}>
                  <div className="font-size-14 d-flex justify-content-between">


                    <div className=""
                      style={{ maxWidth: "280px" }}
                    >Overall</div>

                    <div className=" " >
                      {progressAsString(overallProgress(artefacts))}%
                          </div>
                  </div>
                  <div className="progress animated-progess " style={{ width: "100%" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: progressAsString(overallProgress(artefacts)) + "%", background: allianzBlue }}
                      aria-valuenow={Number(progressAsString(overallProgress(artefacts)))}
                      aria-valuemin={Number(0)}
                      aria-valuemax={Number(100)}
                    ></div>
                  </div>
  </div>   */}


            </div>


            <hr />

            <div>
              <ul className="list-group list-group-flush">
                {artefacts && artefacts.map(art => {
                  console.log(progressAsString(art.progress))
                  return <li className="list-group-item">
                    <div className="">
                      <div className="font-size-14 d-flex justify-content-between">
                        {window.innerWidth > 1000 ?
                          <div className=""
                            style={{ maxWidth: "900px" }}
                          >{shortenText(art.description, 110)}</div>
                          :
                          <div className=""
                            style={{ maxWidth: "280px" }}
                          >{shortenText(art.description, 50)}</div>
                        }
                        <div className=" " >
                          <b>{progressAsString(art.progress)}%</b>
                        </div>
                      </div>
                      <div className="progress animated-progess progress-sm">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: progressAsString(art.progress) + "%", background: allianzBlue }}
                          aria-valuenow={Number(progressAsString(art.progress))}
                          aria-valuemin={Number(0)}
                          aria-valuemax={Number(100)}
                        ></div>
                      </div>
                    </div>
                  </li>
                })
                }
              </ul>
            </div>
          </CardBody>
        </Card>
      </Col>


    </div>
  )
}
export default TapVisitors



const progressAsString = (progress): string => {
  if (progress) {
    return (progress * 100).toFixed(0) + ""
  } else {
    return "0"
  }

}

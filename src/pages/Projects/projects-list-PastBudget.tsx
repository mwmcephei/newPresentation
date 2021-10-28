// @ts-ignore
import React, { useEffect, useState } from "react"
// @ts-ignore
import { Link, withRouter, useHistory } from "react-router-dom"
import { map } from "lodash"
import {
  Table,
} from "reactstrap"
// @ts-ignore
import { getMax, getColors, focusAreaColors, allianzBlue, structureNumberForDisplay, convertCategory } from "../../globalVars"
import { PastBudget } from "../../types"
import _ from "lodash"



const ProjectsListPastBudget = (props) => {




  const filterBudgetsByYear = (year): PastBudget[] => {
    let result = []
    props.pastBudgets.map(pb => {
      console.log(pb)
      if (pb.year === year) {
        result.push(pb)
      }
    })
    return _.sortBy(result, "name");
  }




  return (
    <React.Fragment>
      <div className="table-responsive">
        <Table className="project-list-table  align-middle " >
          <thead>
            <tr>
              <th scope="col" >#</th>
              <th scope="col" >Measure Name</th>
              <th scope="col" >Budget</th>
              <th scope="col" >Security Domain</th>
            </tr>
          </thead>


          {props.pastBudgets && map(props.uniqueYears, (year, index1) => (


            <tbody key={index1} className="">
              <tr style={{ background: allianzBlue, color: "white", fontSize: "15px" }} >
                <td colSpan={4} >
                  <div className="d-flex justify-content-between ">
                    <div>
                      {year}
                    </div>
                    <div>
                      {structureNumberForDisplay(filterBudgetsByYear(year).map(pb => { return pb.budget }).reduce((partial_sum, a) => partial_sum + a, 0), true)} kEUR
                    </div>
                  </div>
                </td>
              </tr>
              {map(filterBudgetsByYear(year), (pastBudget, index2) => (
                <tr key={index2} >
                  <td>
                    {index2 + 1}
                  </td>
                  <td>
                    <div>
                      <b>{pastBudget.title}</b>
                    </div>
                    <div>
                      {pastBudget.name}
                    </div>
                  </td>
                  <td >
                    {structureNumberForDisplay(pastBudget.budget, true)} kEUR
                  </td>
                  <td >
                    {convertCategory(pastBudget.category)}
                  </td>
                </tr>
              ))}

            </tbody>

          ))}





        </Table>
      </div>

    </React.Fragment >
  )
}

export default withRouter(ProjectsListPastBudget)

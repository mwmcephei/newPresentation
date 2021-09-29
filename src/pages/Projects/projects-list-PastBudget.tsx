// @ts-ignore
import React, { useEffect, useState } from "react"
// @ts-ignore
import { Link, withRouter, useHistory } from "react-router-dom"
import { map } from "lodash"
import {
  Table,
} from "reactstrap"
// @ts-ignore
import { getMax, getColors, focusAreaColors, allianzBlue, structureNumberForDisplay } from "../../globalVars"
import { PastBudget } from "../../types"
import _ from "lodash"



const ProjectsListPastBudget = (props) => {

  const getUniqueYears = (): number[] => {
    let allYears = []
    props.pastBudgets.map(pb => {
      allYears.push(pb.year)
    })
    console.log([...new Set(allYears)])
    return [...new Set(allYears)]
  }


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

      {props.pastBudgets && getUniqueYears().map(x => {
        <div key={x + ""}>test {x}</div>
      })}


      <div className="table-responsive">
        <Table className="project-list-table  align-middle " >
          <thead>
            <tr>
              <th scope="col" >MID</th>
              <th scope="col" >Security Measures</th>
              <th scope="col" >Budget</th>
              <th scope="col" > Securitx Domain</th>
            </tr>
          </thead>


          {props.pastBudgets && map(getUniqueYears(), (year, index1) => (


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
                    {pastBudget.title}
                  </td>
                  <td>
                    {pastBudget.name}
                  </td>
                  <td >
                    {structureNumberForDisplay(pastBudget.budget, true)} kEUR
                  </td>
                  <td >
                    {pastBudget.category}
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




/*

<tbody className="">
            {map(props.pastBudgets, (pastBudget, index) => (
              <tr key={index} >
                <td>
                  {pastBudget.name}
                </td>
                <td >
                  {pastBudget.budget}
                </td>
                <td >
                  {pastBudget.category}
                </td>
              </tr>
            ))}
          </tbody>

          */
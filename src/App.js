import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"


// layouts Format
import VerticalLayout from "./components/VerticalLayout"
import HorizontalLayout from "./components/HorizontalLayout"
import NonAuthLayout from "./components/NonAuthLayout"
import Index from "./components/HorizontalLayout"
import Overview from "./components/pmoComponents/overview"
import MeasureOverview from "./components/pmoComponents/MeasureOverview"
import MeasureReports from "./components/pmoComponents/MeasureReports"
import BudgetReport from "./components/pmoComponents/BudgetReport"
import OverallBudget from "./components/pmoComponents/OverallBudget"
// Import scss
import "./assets/scss/theme.scss"
import Login from "components/pmoComponents/Login"




const App = props => {
  const [loggedIn, setLoggedIn] = useState(false)

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()




  return (
    <React.Fragment>
      <Router>
        {loggedIn ? <React.Fragment>
          <Index />
          <Switch>
            <Route path="/" exact>
              <Login login={setLoggedIn} />
            </Route>
            <Route path="/newPresentation" >
              <Login login={setLoggedIn} />
            </Route>

            <Route path="/dashboard">
              <Overview />
            </Route>
            <Route path="/measure_overview/:filter">
              <MeasureOverview />
            </Route>
            <Route path="/measure_overview" >
              <MeasureOverview />
            </Route>

            <Route path="/measureReports/:measureID">
              <MeasureReports />
            </Route>
            <Route path="/measureReports">
              <MeasureReports />
            </Route>
            <Route path="/budget_reports">
              <BudgetReport />
            </Route>
            <Route path="/overall_budget">
              <OverallBudget />
            </Route>
          </Switch>
        </React.Fragment>
          :

          <Switch>
            <Route path="/" exact>
              <Login login={setLoggedIn} />
            </Route>
            <Route path="/newPresentation" >
              <Login login={setLoggedIn} />
            </Route>
          </Switch>}
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)

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

import { LocalNotification, LocalNotifications } from '@capacitor/local-notifications'
import Plugin from "@capacitor/core"
import { allianzBlue, apiUrl } from "globalVars"
import FileUpload from "components/pmoComponents/FileUpload"
import { title } from "process"


const App = props => {
  const [loggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    requestPermission()
    const interval = setInterval(() => {
      scheduleNotification()
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);


  async function requestPermission() {
    await LocalNotifications.requestPermissions()
  }

  async function scheduleNotification() {
    fetch(apiUrl + "/getNotifications/" + false)
      .then(response => response.json())
      .then(response => {
        response.forEach(async notification => {
          console.log("notification")
          console.log(notification.seen)
          if (!notification.seen) {
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: "test",
                  body: "testbody",
                  id: 1,
                }
              ]
            })
          }
        });
      })
      .catch(error => {
        console.log(error)
      })


    /*
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "test",
          body: "testbody",
          id: 1,
        }
      ]
    })
    */
  }








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


  /*
  <Route path="/" exact>
                <Login login={setLoggedIn} />
              </Route>
              <Route path="/newPresentation" >
                <Login login={setLoggedIn} />
              </Route>
              */

  return (
    <React.Fragment>
      <Router>
        {loggedIn ? <React.Fragment>
          <Index />
          <Switch>
            <Route path="/" exact>
              <Overview />
            </Route>
            <Route path="/newPresentation" >
              <Overview />
            </Route>

            <Route path="/upload" >
              <FileUpload />
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
              <FileUpload />
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

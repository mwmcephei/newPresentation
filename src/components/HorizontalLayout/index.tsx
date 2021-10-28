import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
//import { BackgroundFetch } from '@transistorsoft/capacitor-background-fetch';
import { LocalNotification, LocalNotifications } from '@capacitor/local-notifications'
import Plugin from "@capacitor/core"
//actions
import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
} from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

//components
import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Rightbar from "../CommonForBoth/RightSidebar"
import { allianzBlue, apiUrl } from "globalVars"



const Layout = props => {
  const dispatch = useDispatch()
  // const [temp, setTemp] = useState(0)
  // const [checkForNotifications, setCheckForNotifications] = useState(false)

  useEffect(() => {
    openMenu()
    window.scrollTo(0, 0)
    setIsMenuOpened(false)

    /*
        BackgroundFetch.configure({
          minimumFetchInterval: 15
        }, async taskID => {
          const result = await performYourWorkHere();
          BackgroundFetch.finish(taskID);
        }, async (taskId) => {
          // The OS has signalled that your remaining background-time has expired.
          // You must immediately complete your work and signal #finish.
          console.log('[BackgroundFetch] TIMEOUT:', taskId);
          // [REQUIRED] Signal to the OS that your work is complete.
          BackgroundFetch.finish(taskId);
        })
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
    
    
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1)
    }, 10 * 1000)
    */
  }, [])

  async function performYourWorkHere() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("HUHU")
        resolve(true);
      }, 5000);
    });
  }


  /*
    useEffect(() => {
      setIsMenuOpened(false)
      setInterval(() => {
        fetch(apiUrl + "/checkNotifications")
          .then(response => response.json())
          .then(response => {
            if (response.change) {
              console.log("response")
              console.log(response)
              scheduleBasic("New File Uploaded")
            }
  
            /*
           if (response === "OK") {
             console.log("change")
             scheduleBasic("New File Uploaded")
           } else {
             console.log("no change")
           }
       
          })
          .catch(error => {
            console.log(error)
          })
      }, 10 * 1000)
    }, [temp])
  
  */


  const { topbarTheme, layoutWidth, isPreloader, showRightSidebar } =
    useSelector(state => ({
      // @ts-ignore redux store stays untyped for now
      topbarTheme: state.Layout.topbarTheme,
      // @ts-ignore redux store stays untyped for now
      layoutWidth: state.Layout.layoutWidth,
      // @ts-ignore redux store stays untyped for now
      isPreloader: state.Layout.isPreloader,
      // @ts-ignore redux store stays untyped for now
      showRightSidebar: state.Layout.showRightSidebar,
    }))

  /*
  document title
  */
  useEffect(() => {
    const title = props.location.pathname
    let currentage = title.charAt(1).toUpperCase() + title.slice(2)

    document.title = currentage + " PMO Tool"
  }, [props.location.pathname])



  /*
  layout settings
  */
  useEffect(() => {
    dispatch(changeLayout("horizontal"))
  }, [dispatch])

  useEffect(() => {
    if (isPreloader === true) {
      document.getElementById("preloader").style.display = "block"
      document.getElementById("status").style.display = "block"

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none"
        document.getElementById("status").style.display = "none"
      }, 2500)
    } else {
      document.getElementById("preloader").style.display = "none"
      document.getElementById("status").style.display = "none"
    }
  }, [isPreloader])

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme))
    }
  }, [dispatch, topbarTheme])

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth))
    }
  }, [dispatch, layoutWidth])

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened)
  }





  /*
    async function scheduleBasic(title) {
      const newPush = {
        title: title,
        body: "test ",
        id: 1,
        extra: {
          data: "pass data"
        },
        iconColor: allianzBlue
      }
      await LocalNotifications.schedule({
        notifications:
          [newPush]
      })
      const notification = {
        title: newPush.title,
        body: newPush.title,
        seen: false,
      }
      fetch(apiUrl + "/setNotification", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notification)
  
      }).then((response) => {
        response.json().then((body) => {
          console.log("OK")
          console.log(body)
  
          setCheckForNotifications(!checkForNotifications)
        });
      });
  
  
    }
  */






  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header
          //      checkForNotifications={checkForNotifications}
          //      localPush={scheduleBasic}
          theme={topbarTheme}
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
        />
        <Navbar menuOpen={isMenuOpened} pageChanged={props.location.pathname} />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>

      {showRightSidebar ? <Rightbar /> : null}
    </React.Fragment>
  )
}

Layout.propTypes = {
  changeLayout: PropTypes.func /*  */,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
}

export default withRouter(Layout)

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, useHistory } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//i18n
import { withTranslation } from "react-i18next"
import { allianzBlue, apiUrl } from "globalVars"
import { getIcon } from "@iconify/react"


type Notification = {
  _id: string,
  title: string,
  body: string,
  time: string,
  type: string,
  measure: string,
  seen: boolean,
}

const NotificationDropdown = props => {
  const history = useHistory()
  const [menu, setMenu] = useState(false)
  const [notificationBubble, setNotificationBubble] = useState(false)
  const [unseenNotifications, setUnseenNotifications] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>()

  useEffect(() => {
    checkForNotifications()
    setNotificationBubble(true)
    const interval = setInterval(() => {
      checkForNotifications()
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);



  const checkForNotifications = () => {
    fetch(apiUrl + "/getNotifications/" + true)
      .then(response => response.json())
      .then(response => {
        console.log("getNotifications")
        console.log(response)
        if (response.length > 0) {
          setNotifications(response.reverse())

          let unseenNotifications = 0
          for (let i = 0; i < response.length; i++) {
            if (response[i].seen) {
              console.log(response[i].seen)
            } else {
              console.log(response[i].seen)
              unseenNotifications = unseenNotifications + 1
            }
          }
          if (unseenNotifications > 0) {
            setNotificationBubble(true)
            setUnseenNotifications(unseenNotifications)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }


  const lookAtNotifications = () => {
    setNotificationBubble(false)
    fetch(apiUrl + "/lookAtNotifications")
      .then(response => response.json())
      .then(response => {
        console.log("lookAtNotifications")
        const unseenNotifications = []
        for (let i = 0; i < response.length; i++) {
          if (response[i].seen) {
            console.log()
          } else {
            unseenNotifications.push(response[i])
          }
        }
        if (unseenNotifications.length > 0) {
          console.log(unseenNotifications.length)
          console.log("unseenNotifications.length")
          console.log(unseenNotifications.length)
          setUnseenNotifications(unseenNotifications.length)
        }
      }
      )
      .catch(error => {
        console.log(error)
      })
  }

  const fileiconCircle = () => {
    return <div className="d-flex align-items-center justify-content-center"
      style={{
        fontSize: "16px",
        backgroundColor: "#fff",
        borderColor: allianzBlue,
        border: "1px solid",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
      }}>
      <i className="far fa-file-alt "></i>
    </div>
  }

  const helpIconCircle = () => {
    return <div className="d-flex align-items-center justify-content-center"
      style={{
        fontSize: "16px",
        backgroundColor: "#fff",
        borderColor: allianzBlue,
        border: "1px solid",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
      }}>
      <i className="fas fa-question"></i>
    </div>
  }

  const statusChangeCircle = () => {
    return <span className="avatar-title bg-warning rounded-circle font-size-16"></span>
  }

  const getIconForNotification = (type) => {
    switch (type) {
      case "file":
        return fileiconCircle()
        break;
      case "status":
        return statusChangeCircle()
        break;
      case "progress":
        return statusChangeCircle()
        break;
      case "help":
        return helpIconCircle()
        break;
      default:
        break;
    }
  }

  const goToMeasure = async (measureTitle) => {
    if (measureTitle !== "") {
      return fetch(apiUrl + "/getMeasureID/" + measureTitle)
        .then(response => response.json())
        .then(response => {
          history.push("/measureReports/" + response)
        }
        )
        .catch(error => {
          console.log(error)
        })
    } else {
      history.push("/")
    }



  }



  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
          onClick={() => lookAtNotifications()}
        >
          <i className="bx bx-bell bx-tada" />
          {notificationBubble && unseenNotifications > 0 ?
            <span className="badge bg-danger rounded-pill">{notifications && unseenNotifications}</span>
            :
            <span></span>
          }

        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "300px" }} className="overflow-auto ">


            {notifications && notifications.map(pn => {

              return <Link
                onClick={() => goToMeasure(pn.measure)}
                className="text-reset notification-item">
                <div className="media "  >
                  <div className="avatar-xs me-3 ">
                    {getIconForNotification(pn.type)}
                  </div>
                  <div className="media-body ">
                    <h6 className={pn.seen ? "mt-0 mb-1" : "mt-0 mb-1 text-danger"}>
                      {pn.title}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {pn.body}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {pn.time}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

            })}




          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  // checkForNotifications: PropTypes.any,
  t: PropTypes.any,
}



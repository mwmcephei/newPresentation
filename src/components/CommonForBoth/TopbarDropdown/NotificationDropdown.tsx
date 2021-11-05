import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from 'reactstrap';
import SimpleBar from 'simplebar-react';

//i18n
import { withTranslation } from 'react-i18next';
import { allianzBlue, apiUrl } from 'globalVars';
import { getIcon } from '@iconify/react';

type Notification = {
  _id: string;
  title: string;
  body: string;
  time: string;
  type: string;
  measure: string;
  seen: boolean;
};

const NotificationDropdown = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(false);
  const [notificationBubble, setNotificationBubble] = useState(false);
  const [numberOfUnseenNotifications, setNumberOfUnseenNotifications] =
    useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    checkForNotifications();
    setNotificationBubble(true);
    const interval = setInterval(() => {
      checkForNotifications();
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const checkForNotifications = () => {
    fetch(apiUrl + '/getNotifications/' + true)
      .then(response => response.json())
      .then(response => {
        if (response.length > 0) {
          setNotifications(response.reverse());

          let unseenNotificationsCounter = 0;
          for (let i = 0; i < response.length; i++) {
            if (!response[i].seen) {
              unseenNotificationsCounter = unseenNotificationsCounter + 1;
            }
          }
          unseenNotificationsCounter > 0
            ? setNotificationBubble(true)
            : setNotificationBubble(false);
          setNumberOfUnseenNotifications(unseenNotificationsCounter);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const clickedNotificationsIcon = () => {
    setNotificationBubble(false);
    fetch(apiUrl + '/setAllNotificationsToSeen')
      .then(response => response.json())
      .then(response => {
        const unseenNotifications = [];
        for (let i = 0; i < response.length; i++) {
          if (!response[i].seen) {
            unseenNotifications.push(response[i]);
          }
        }
        if (unseenNotifications.length > 0) {
          setNumberOfUnseenNotifications(unseenNotifications.length);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const FileIconCircle = () => {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          fontSize: '16px',
          backgroundColor: '#fff',
          borderColor: allianzBlue,
          border: '1px solid',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
        }}
      >
        <i className="far fa-file-alt "></i>
      </div>
    );
  };

  const HelpIconCircle = () => {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          fontSize: '16px',
          backgroundColor: '#fff',
          borderColor: allianzBlue,
          border: '1px solid',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
        }}
      >
        <i className="fas fa-question"></i>
      </div>
    );
  };

  const StatusChangeCircle = () => {
    return (
      <span className="avatar-title bg-warning rounded-circle font-size-16"></span>
    );
  };

  const getIconForNotification = type => {
    switch (type) {
      case 'file':
        return FileIconCircle();
      case 'status':
        return StatusChangeCircle();
      case 'progress':
        return StatusChangeCircle();
      case 'help':
        return HelpIconCircle();
      default:
        break;
    }
  };

  const goToMeasure = async (measureTitle: string): Promise<void> => {
    if (measureTitle !== '') {
      return fetch(apiUrl + '/measure/id/' + measureTitle)
        .then(response => response.json())
        .then(response => {
          history.push('/measureReports/' + response);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      history.push('/');
    }
  };

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
          onClick={() => clickedNotificationsIcon()}
        >
          <i className="bx bx-bell bx-tada" />
          {notificationBubble && numberOfUnseenNotifications > 0 ? (
            <span className="badge bg-danger rounded-pill">
              {notifications && numberOfUnseenNotifications}
            </span>
          ) : (
            <span></span>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> Notifications </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  {' '}
                  View All
                </a>
              </div>
            </Row>
          </div>
          <SimpleBar style={{ height: '300px' }} className="overflow-auto ">
            {notifications &&
              notifications.map(pn => {
                return (
                  <Link
                    key={pn._id}
                    onClick={() => goToMeasure(pn.measure)}
                    className="text-reset notification-item"
                  >
                    <div className="media ">
                      <div className="avatar-xs me-3 ">
                        {getIconForNotification(pn.type)}
                      </div>
                      <div className="media-body ">
                        <h6
                          className={
                            pn.seen ? 'mt-0 mb-1' : 'mt-0 mb-1 text-danger'
                          }
                        >
                          {pn.title}
                        </h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">{pn.body}</p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline" /> {pn.time}{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

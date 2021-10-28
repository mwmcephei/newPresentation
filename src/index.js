import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import store from "./store"

import { App as capacitorApp } from '@capacitor/app';
import { BackgroundTask } from '@robingenz/capacitor-background-task';

//capacitorApp.addListener('appStateChange', async ({ isActive }) => {
//  if (isActive) {
//    return;
//}
// The app state has been changed to inactive.
// Start the background task by calling `beforeExit`.
//  const taskId = await BackgroundTask.beforeExit(async () => {
//  setInterval(() => {
//    console.log("BACKGROUND TASK")
//  }, 10 * 1000)

//   BackgroundTask.finish({ taskId });
// });
//});

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()

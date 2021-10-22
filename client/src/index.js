import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistedStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter history={history}>
			<PersistGate loading={null} persistor={persistedStore}>
				<App />
			</PersistGate>{" "}
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

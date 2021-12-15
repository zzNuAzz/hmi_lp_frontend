import App from '@containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import GlobalProvider from 'store/GlobalProvider';
//import all
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('.', true, /\.scss$/));

ReactDOM.render(
	<React.StrictMode>
		<GlobalProvider>
			<Router>
				<App />
			</Router>
		</GlobalProvider>
	</React.StrictMode>,
	document.getElementById("root")
);


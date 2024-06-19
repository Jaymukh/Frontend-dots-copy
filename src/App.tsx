// External libraries
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

// CSS
import './styles/main.css';

// Components
import { Spinner } from './components/ui/spinner/Spinner';
import Toast from './components/ui/toast/Toast';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';


function App() {

	useEffect(() => {
		const GA_MEASUREMENT_ID =  process.env.REACT_APP_GA_MEASUREMENT_ID;
		ReactGA.initialize(GA_MEASUREMENT_ID as string);
	}, []);

	return (
		<div className="App">
			<Spinner />
			<Toast />
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;

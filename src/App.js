import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BugerBuilder/BurgerBuilder';

class App extends Component {

	render() {
		return (
		<Layout>
			<BurgerBuilder />
		</Layout>
		);
	}
}

export default App;

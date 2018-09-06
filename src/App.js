import React, {Component} from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();
import '../src/styles/less.less';


class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Router history={customHistory}>
                    <div className="innerWrap">
                        <Header />
                        <Content />
                        <Footer />
                    </div>
                </Router>
            </Provider>
        )
    }
}


export default App;
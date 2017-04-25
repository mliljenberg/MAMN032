/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {loadCourses, loadAuthors} from './actions/courseAction';
import {loadMessages} from './actions/messageAction';
import {loadPlayers} from './actions/playerAction';
import * as playerApi from './api/playerApi';
import * as hostApi from './api/hostApi';



const store= configureStore();

store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadMessages());
store.dispatch(loadPlayers());

playerApi.ServerUpdate(store);
hostApi.ServerUpdate(store);


render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,

  document.getElementById('app')
);

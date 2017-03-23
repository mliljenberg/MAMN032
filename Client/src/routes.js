import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import HostPage from './components/host/HostPage';
import PlayerPage from './components/player/PlayerPage';
import AboutPage from './components/about/AboutPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="host" component={HostPage} />
    <Route path="player" component={PlayerPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);

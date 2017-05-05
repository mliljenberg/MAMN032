import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import HostPage from './components/host/HostPage';
import PlayerPage from './components/game/PlayerPage';
import AboutPage from './components/about/AboutPage';
import ManageCoursePage from './components/about/ManageCoursePage';
import GamePage from './components/game/GamePage';
import JoinGamePage from './components/joinGame/JoinGamePage';
import AnswerPage from './components/answer/AnswerPage';
import VotePagePlayer from './components/vote/VotePagePlayer';
import ScorePage from './components/score/ScorePage';
import ResultPage from './components/result/ResultPage';

import HostGamePage from './components/hostPages/game/GamePage';
import HostAnswerPage from './components/hostPages/answer/AnswerPage';
import HostVotePage from './components/hostPages/vote/VotePage';
import HostVoteResult from './components/hostPages/voteResults/VoteResult';
import HostScore from './components/hostPages/score/ScorePage';
import HostResult from './components/hostPages/result/Result';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="host" component={HostPage} />
    <Route path="room/:id" component={HostPage} />
    <Route path="player" component={PlayerPage} />
    <Route path="about" component={AboutPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />

    <Route path="game" component={GamePage} />
    <Route path="game/:id" component={GamePage} />

    <Route path="joinGame" component={JoinGamePage} />
    <Route path="answer" component={AnswerPage} />

    <Route path="vote" component={VotePagePlayer} />
    <Route path="score" component={ScorePage}/>
    <Route path="result" component={ResultPage}/>

    //HOSTSIDOR
    <Route path="host/game" component={HostGamePage}/>
    <Route path="host/answer" component={HostAnswerPage}/>
    <Route path="host/vote" component={HostVotePage}/>
    <Route path="host/voteResult" component={HostVoteResult}/>
    <Route path="host/score" component={HostScore}/>
    <Route path="host/result" component={HostResult}/>

  </Route>
);

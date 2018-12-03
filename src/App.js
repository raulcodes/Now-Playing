import React, { Component, Fragment } from 'react';
import VinylSpinner from './components/visualizers/VinylSpinner';
import DefaultController from './components/controllers/Default';
const spotify = require('spotify-node-applescript')
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      track: '',
      artwork: '',
      artist: '',
      playback: '',
      isRunning: false
    };

    this.updateTrack = this.updateTrack.bind(this)
    this.getPlaybackState = this.getPlaybackState.bind(this)
    this.startPoll = this.startPoll.bind(this)
  }

  componentDidMount() {
    this.startPoll()
  }

  startPoll() {
    this.getPlaybackState()
    this.updateTrack()
    setTimeout(this.startPoll, 500)
  }

  getPlaybackState() {
    spotify.getState((err, playback) => {
      this.setState({
        playback: playback.state
      })
    })
  }

  updateTrack() {
    spotify.getTrack((err, state) => {
      this.setState({
        artwork: state.artwork_url,
        track: state.name,
        artist: state.artist
      })
    })
  }

  render() {
    return (
      <div id="container">
        <div id="viz-container">
          <VinylSpinner
            artwork_url={this.state.artwork}
            playback={this.state.playback} />
          {/* <VinylSpinner
            artwork_url='test_art.jpeg'
            playback='playing' /> */}
        </div>
        <div id="controller-container">
          <DefaultController
            track={this.state.track}
            artist={this.state.artist}
          />
          {/* <DefaultController
            track='Love Story'
            artist='Taylor Swift'
          /> */}
        </div>
      </div>
    );
  }
}

export default App;

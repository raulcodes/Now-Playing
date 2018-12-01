import React, { Component, Fragment } from 'react';
// import { getTrack } from './utils/spotify'
const spotify = require('spotify-node-applescript')
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      trackName: '',
      artwork: '',
      artist: '',
      playback: '',
      isRunning: false
    };

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
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
      // console.log(playback.state)
      this.setState({
        playback: playback.state
      })
    })
    // setTimeout(this.getPlaybackState, 500)
  }

  updateTrack() {
    spotify.getTrack((err, state) => {
      // console.log(state)
      this.setState({
        artwork: state.artwork_url,
        trackName: state.name
      })
    })
    // setTimeout(this.updateTrack, 500)
  }

  play() {
    spotify.play()
  }

  pause() {
    spotify.pause()
  }

  render() {
    return (
      <div id="container">
        <div className="vinyl">
          <div className="art-shadow">
            <figure className="vinyl-label"></figure>
            <figure className="vinyl-hole"></figure>
            <img
              id="artwork"
              className={(this.state.playback == 'playing') ? 'playing' : 'stopped'}
              src={this.state.artwork}/>
          </div>
        </div>
        {/* <h2>{this.state.trackName}</h2>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button> */}
      </div>
    );
  }
}

export default App;

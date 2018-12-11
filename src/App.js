import React, { Component, Fragment } from 'react';
import VinylSpinner from './components/visualizers/VinylSpinner';
import DefaultController from './components/controllers/Default';
import shade from './utils/shader';
const spotify = require('spotify-node-applescript')
import * as Vibrant from 'node-vibrant'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      track: '',
      artwork: '',
      artist: '',
      playback: '',
      isRunning: false,
      bgColor: ''
    };

    this.updateTrack = this.updateTrack.bind(this)
    this.getPlaybackState = this.getPlaybackState.bind(this)
    this.startPoll = this.startPoll.bind(this)
    this.checkSpotifyState = this.checkSpotifyState.bind(this)
  }

  componentDidMount() {
    this.startPoll()
  }

  startPoll() {
    if(this.state.isRunning) {
      this.getPlaybackState()
      this.updateTrack()
    }
    setTimeout(this.startPoll, 500)
  }

  getPlaybackState() {
    spotify.getState((err, playback) => {
      if (err == null) {
        this.setState({
          playback: playback.state
        })
      } else {
        console.log(err)
      }
    })
  }

  updateTrack() {
    spotify.getTrack((err, state) => {
      if (err == null) {
        let artwork = state.artwork_url

        if(this.state.artwork !== artwork) {
          let color
          Vibrant.from(artwork).getPalette((err, palette) => {
            (palette.Vibrant != null) ? (color = palette.Vibrant.getHex()) : (color = palette.Muted.getHex())
            this.setState({ bgColor: color })
          })
        }

        this.setState({
          artwork: artwork,
          track: state.name,
          artist: state.artist,
        })
      }
      console.log(err)
    })
  }

  checkSpotifyState = () => {
    spotify.isRunning((err, isRunning) => {
      if (err == null) {
        this.setState({ isRunning: isRunning })
      } else {
        console.log(err)
      }
    })
  }

  render() {
    return (
      !this.state.isRunning ? (
        <div id="prompt-container">
          <h3>Ensure that Spotify is running, then clickk</h3>
          <button onClick={this.checkSpotifyState}>here</button>
        </div>
      ) : (
        <div
          id="container"
          style={{background: `linear-gradient(${shade(this.state.bgColor, 0.3)}, ${this.state.bgColor}`}}>
          <div id="viz-container">
            <VinylSpinner
              artwork_url={this.state.artwork}
              bgColor={this.state.bgColor}
              playback={this.state.playback} />
          </div>
          <div id="controller-container" style={{color: shade(this.state.bgColor, 0.8)}}>
            <DefaultController
              track={this.state.track}
              artist={this.state.artist}
              playback={this.state.playback}
            />
          </div>
        </div>
      )
    );
  }
}

export default App;

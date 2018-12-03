import React, { Component, Fragment } from 'react';
import VinylSpinner from './components/visualizers/VinylSpinner';
import DefaultController from './components/controllers/Default';
const spotify = require('spotify-node-applescript')
import * as Vibrant from 'node-vibrant'
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
      isRunning: false,
      bgColor: ''
    };

    this.updateTrack = this.updateTrack.bind(this)
    this.getPlaybackState = this.getPlaybackState.bind(this)
    this.startPoll = this.startPoll.bind(this)
    this.shadeColor2 = this.shadeColor2.bind(this)
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
      let artwork = state.artwork_url

      if(this.state.artwork !== artwork) {
        Vibrant.from(artwork).getPalette((err, palette) => {
          console.log(palette)
          this.setState({ bgColor: palette.LightMuted.getHex() })
        })
      }

      this.setState({
        artwork: artwork,
        track: state.name,
        artist: state.artist,
      })
    })
  }

  shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  render() {
    return (
      <div
        id="container"
        style={{background: `linear-gradient(${this.shadeColor2(this.state.bgColor, 1)}, ${this.state.bgColor}`}}>
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

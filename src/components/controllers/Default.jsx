import React, { Fragment } from 'react'
const spotify = require('spotify-node-applescript')
import './Default.css'

const play = () => {
  spotify.play()
}

const pause = () => {
  spotify.pause()
}

const next = () => {
  spotify.next()
}

const previous = () => {
  spotify.previous()
}

const DefaultController = (props) => {
  let playBackIcon = (props.playback == 'playing') ? 'fa-pause' : 'fa-play'

  return(
    <Fragment>
      <h2 id="track-name">{props.track}</h2>
      <h3 id="artist-name">{props.artist}</h3>
      <div id="btn-row">
        <div className="playback-btn" onClick={previous}>
          <i className={`fas fa-backward`}></i>
        </div>
        <div
          className="playback-btn"
          onClick={props.playback == 'playing' ? pause : play}
          >
          <i className={`fas ${playBackIcon}`}></i>
        </div>
        <div className="playback-btn" onClick={next}>
          <i className={`fas fa-forward`}></i>
        </div>
      </div>
    </Fragment>
  )
}

export default DefaultController

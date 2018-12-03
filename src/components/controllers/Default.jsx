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
  return(
    <Fragment>
      <h2 id="track-name">{props.track}</h2>
      <h3 id="artist-name">{props.artist}</h3>
      <button onClick={previous}>Prev</button>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={next}>Next</button>
    </Fragment>
  )
}

export default DefaultController

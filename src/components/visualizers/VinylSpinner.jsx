import * as React from 'react'
import './VinylSpinner.css'

const VinylSpinner = (props) => {
  return (
    <div className="vinyl">
      <div className="art-shadow">
        <figure className="vinyl-label"></figure>
        <figure className="vinyl-hole"></figure>
        <img
          id="artwork"
          className={(props.playback == 'playing') ? 'playing' : 'stopped'}
          src={props.artwork_url} />
      </div>
    </div>
  )
}

export default VinylSpinner

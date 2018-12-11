import * as React from 'react'
import './VinylSpinner.scss'
import shade from '../../utils/shader'

const VinylSpinner = (props) => {
  return (
    <div className="vinyl">
      <div className="art-shadow">
        <figure className="vinyl-label"></figure>
        <figure 
          className="vinyl-hole"
          style={{background: `${shade(props.bgColor, -0.4)}`}}>
        </figure>
        <img
          id="artwork"
          draggable="false"
          className={(props.playback == 'playing') ? 'playing' : 'stopped'}
          src={props.artwork_url} />
      </div>
    </div>
  )
}

export default VinylSpinner

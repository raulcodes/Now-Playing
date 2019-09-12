import React from 'react'

import './Default.scss'

const DefaultController = ({ track, artist }) => (
  <div id="track-info">
    <h2 id="track-name">{track}</h2>
    <h3 id="artist-name">{artist}</h3>
  </div>
);

export default DefaultController

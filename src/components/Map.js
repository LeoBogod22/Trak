import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import marker from './marker.png'

import {geolocated} from 'react-geolocated';
const AnyReactComponent = ({ text }) => <div><img src={marker} style={{height:'50px',width:'50px'}}/></div>;
export default class Map extends Component {

  static defaultProps = {
    center: { lat: 37.774929, lng: -122.419416 },
    zoom: 11
  }
render() {
    return (
      <div className='google-map' style={{width: '100%',height: '400px',backgroundColor: 'grey'}}>
        <GoogleMapReact
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          <AnyReactComponent
            lat={ this.props.center.lat}
            lng={ this.props.center.lng }
            text={ '' }
          />
          
        </GoogleMapReact>
        
      </div>
    )
  }
}
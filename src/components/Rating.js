



import React, { Component } from 'react';
import styles from './App.css';
import Map from './Map.js';

import { GoogleApiWrapper } from 'google-maps-react'

import MapContainer from './Map.js'
export default class Rating extends React.Component {
    render(){
        return(


<section classname="feature">
          <div id="banner" >
            <div classname="banner__text">
              <div classname="l-container">
                <h2 classname="heading-1">
                  <span id="li">Take the uncertainty out of planning</span>

                </h2><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                 <h3 id="fish"> Never get lost finding the trail. With just one click, get the link right to the trail head. Access has never been so easy.</h3>
                                  <h3 id="fish"> Search for trails in any place you like ! Or use your current location to search!!!</h3>
              </div>

              <div>
            <MapContainer google={this.props.google} />
              </div>
            </div>
          </div>
          <div classname="feature__main feature__main--centered l-container">
            <div classname="feature__device feature__device--laptop">
            <br></br><br></br> <br></br><br></br>   <br></br><br></br> <br></br><br></br> 
              <div id="device">
                <img src="http://www.downloadmaps.org/wp-content/uploads/2016/03/maps-laptop.jpg" alt="Trail Details Page"/>
              </div>
            </div>
            <div classname="l-inner-container">
              <h2 classname="feature__heading heading-3">Know the details before you go.</h2>
              <p>Browse hand-curated trail maps as well as trail reviews, photos and activity recordings <br></br> contributed by a
                community of hikers, mountain bikers, trail runners and more.</p>
            </div>
          </div>
        </section>


        );

   }
}



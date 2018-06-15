import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import UserForm from "./components/UserForm.js";
import Rating from "./components/Rating.js";
import Main from "./components/main.js";
import Super from "./components/super.js";

import { classnames } from './components/helpers';

const google = window.google;


           
class App extends Component {
  state = {
    name: "",
    stars: "",
    icon: "",
      longitude: "",
    address:"",
     latitude: "",
    trails: [], isLoaded: false
  }




  handleChange = address => {
   this.setState({
      address

    });

        geocodeByAddress(address)
            .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
    this.setState({
      address,
      latitude: lat,
      longitude: lng,

    });
  })
 .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
    
 }

  getUser = selected => {
   
var object = this.refs.Progress2;

object.innerHTML="";


 this.setState({ isGeocoding: true, address: selected });


  geocodeByAddress(selected)


     .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
    
    console.log(this.state.latitude)


    if (selected) {
      axios.get(`https://www.hikingproject.com/data/get-trails?lat=${this.state.latitude}&lon=${this.state.longitude}&maxDistance=40&key=200279581-dd891420fa2c470dbb683b34e017062a`)
        .then((res) => {

          console.log(res);
          const trailList = res.data.trails.map((trail) => {
            console.log(trail.name)
            console.log(trail.stars)
            return <div classname="container-fluid">
            <div classname="row">
 
                     <div className="col-sm-4 ">
               <div className="card">
                
                   <div className="card-body">

                    <img className="card-img-top" src={trail.imgSmall}  />
        <h2 className="card-title">{trail.name}</h2>
          <div className="star-rating__ico fa fa-star-o fa-lg">{trail.stars}</div>
    <br></br>     <br></br>

            <h4 className="card-subtitle">{trail.summary}</h4>
            <p classname="card-text"> {trail.length} km </p>
      

 </div>
 <br></br>
 <div> 
 <button classname="btn"> <a href={trail.url}> View  </a>  </button>

      </div>
            </div>
            </div>
</div>
            </div>

          })


          this.setState({ trails: trailList, isLoaded: true });


          const name = res.data.trails.name;
          const stars = res.data.trails.stars;
          const icon = res.data.trails.imgMedium;
          this.setState({ name });
          this.setState({ stars });
          this.setState({ icon });
        })




    }

    else return;
  }


  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };


  render() {
    return (
      <div>

        <div className="App">
          <header className="App-header">
           <a className="navbar-brand" href="#">Trailey</a>
          </header>

      
<section className="fish">
<div classname="col-xl-9 mx-auto">
            <h1 id="mb-5">Find your next favorite trail</h1>
          </div>
<PlacesAutocomplete
          onChange={this.handleChange}
          value={this.state.address}
          onSelect={this.getUser}
          onError={this.handleError}
          shouldFetchSuggestions={this.state.address.length >0}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                    })}
                    <div className="Demo__dropdown-footer">
                      <div>
                       
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}

        </PlacesAutocomplete>
          </section>
          <div classname="f" ref="Progress2">
          <Main/>
         
          <Rating/>
           <Super/>
          </div>


          <div>
          {this.state.isLoaded ? <div>{this.state.trails}</div> : <div>.</div>}
</div>
        </div>
      </div>
    );
  }
};

export default App;
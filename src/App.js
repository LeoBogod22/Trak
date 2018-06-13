import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import UserForm from "./components/UserForm.js";
import StarRating from 'react-star-rating';


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
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))

      this.getUser(); 
  }



  getUser = selected => {
   

    document.body.style = 'background: grey;';


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
    


    if (selected) {
      axios.get(`https://www.hikingproject.com/data/get-trails?lat={this.state.latitude}&lon=-{this.state.longitude}&maxDistance=10&key=200279581-dd891420fa2c470dbb683b34e017062a`)
        .then((res) => {

          console.log(res);
          const trailList = res.data.trails.map((trail) => {
            console.log(trail.name)
            console.log(trail.stars)
            return <div className="card">

                     
               <div className="card">
                 <img className="card-img" src={trail.imgMedium} alt="header" />
                   <div className="card-info">
        <h1 className="card-title">{trail.name}</h1>
          <div className="star-rating__ico fa fa-star-o fa-lg">{trail.stars}</div>


            <p className="card-author">{trail.summary}</p>
            <p classname="length"> {trail.length} km </p>
            <a href="{trail.link}" className="button">View </a>


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
            <h1 className="App-title">HTTP Calls in React</h1>
          </header>

      


<PlacesAutocomplete
          onChange={this.handleChange}
          value={this.state.address}
          onSelect={this.getUser}
          onError={this.handleError}
          shouldFetchSuggestions={this.state.address.length > 2}
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
          {this.state.isLoaded ? <div>{this.state.trails}</div> : <div>loading data</div>}

        </div>
      </div>
    );
  }
};

export default App;
import React, { Component } from 'react';
import axios from "axios";
import './App.css';


import UserForm from "./components/UserForm.js";

class App extends Component {
  state = {
    name: "",
    stars: "",
    icon: "",
    trails: [], isLoaded: false
  }
  getUser = (e) => {
    e.preventDefault();
    const address = e.target.elements.address.value;
    if (address) {
      axios.get(`https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200279581-dd891420fa2c470dbb683b34e017062a`)
        .then((res) => {

          console.log(res);
          const trailList = res.data.trails.map((trail) => {
            console.log(trail.name)
            console.log(trail.stars)
            return <div> <p>{trail.name}</p> </div>
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
  render() {
    return (
      <div>

        <div className="App">
          <header className="App-header">
            <h1 className="App-title">HTTP Calls in React</h1>
          </header>

          <UserForm getUser={this.getUser} />
          {this.state.isLoading ? <div>{this.state.trails}</div> : <div>loading data</div>}

        </div>
      </div>
    );
  }
};

export default App;
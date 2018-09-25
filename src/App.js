import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let url = "http://ctp-zip-api.herokuapp.com/zip/"; //url to fetch api

//Component that will display the info for each area
function City(props) {
  return (
  <div className = "area-info border rounded">
    <div className = "area-info-header">
    {props.area.LocationText}
    </div>
    <ul style = {{top : "40px"}}>
      <li>{"State: " + props.area.State}</li>
      <li>{"Location: (" + props.area.Lat + ", " + props.area.Long + ")"}</li>
      <li>{"Population(estimated): " + props.area.EstimatedPopulation}</li>
      <li>{"Total Wages: " + props.area.TotalWages}</li>
    </ul>
    </div>);
}

//component that contains text field that will contain the query for the API call
function ZipSearchField(props) {
  return (<div>
    <div className = " top-buffer col-sm-4 col-sm-offset-4">
    <form className = "form-inline">
    <div className="form-group">
    <label>
      Zip Code:
      </label>
      <input type="text"  className="form-control" 
      id="zip-code" placeholder= {props.placeholder} onChange = {props.onChange} /> 
  </div>
  </form>
  </div>
  </div>);
}

//main component
class App extends Component {
  constructor(props){
    super(props);
    //state only has one property, data which is the api data from each api call as the textfield is updated
    this.state = {
      data : null,

    }
  }

  //as text is altered make an updated api call and change the state of data
 onChange = event => {
   var text = event.target.value;
  
   //fetching data from api everytime we render
   fetch(url + text)
   .then((response) =>{ 
     return response.json();
   })
   .then((data) => this.setState({data : data,}))

   //if api request failed, set the data back to null
   .catch(error => this.setState({data : null, }));
   
 };
 


 
  render() {
    let results = "No results"; //start off with no results shown since by default text field is empty
   
    //if there is api data, then map each entry to a city component that will be rendered
    if (this.state.data !== null)
     results = this.state.data.map(area => {
       return (
         <City area = {area} />
       )
     })
      
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div>
        <ZipSearchField onChange = {this.onChange} placeholder = {"Try 10016"} />
        </div>
        {/*display api data*/}                     
        <div className = "results col-sm-4 col-sm-offset-4">
              {results}
        </div>
      </div>
    );
  }
}

export default App;

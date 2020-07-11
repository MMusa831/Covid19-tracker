import React, { Component } from "react";
import Axios from "axios";
import CountUp from 'react-countup';
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import "./App.css";

export class App extends Component {
         state = {
           confirmed: 0,
           recovered: 0,
           deaths: 0,
           lastUpdate: undefined,
           countries: [],
         };
         componentDidMount() {
           this.fechdata();           
         }
         async fechdata() {
           const resApi = await Axios.get("https://covid19.mathdro.id/api/");
           const {
             data: { countries },
           } = await Axios.get("https://covid19.mathdro.id/api/countries");

           this.setState({
             confirmed: resApi.data.confirmed.value,
             recovered: resApi.data.recovered.value,
             deaths: resApi.data.deaths.value,
             lastUpdate: resApi.data.lastUpdate,
             countries,
           });
         }
         chooseCountry() {
           return this.state.countries.map((country, i) => {
             return <option key={i}>{country.name}</option>;
           });
         }
         fetchCountry = async (e) => {
            const result = await Axios.get(
              `https://covid19.mathdro.id/api/countries/${e.target.value}`
            );
            this.setState({
              confirmed: result.data.confirmed.value,
              recovered: result.data.recovered.value,
              deaths: result.data.deaths.value,
              lastUpdate: result.data.lastUpdate,
            });          
         };
         render() {
           return (
             <div className="container">
               <div className="top-div">
                 <h2 className="covid">Covid19 Tracker</h2>
                 <select
                   className="country-select"
                   onChange={this.fetchCountry}
                 >
                   {this.chooseCountry()}
                 </select>
               </div>
               <div className="flex">
                 <div className="box conf">
                   {" "}
                   <p className="title">Confimrmed</p>
                   <CountUp
                     start={0}
                     end={this.state.confirmed}
                     duration={3}
                     separator=","
                   />
                   <p>
                     <span>Last Update</span>
                     <br></br>
                     {new Date(this.state.lastUpdate).toDateString()}
                   </p>
                 </div>
                 <div className="box rcov">
                   <p className="title">Recovered</p>
                   <CountUp
                     start={0}
                     end={this.state.recovered}
                     duration={3}
                     separator=","
                   />
                   <p>
                     <span>Last Update</span>
                     <br></br>
                     {new Date(this.state.lastUpdate).toDateString()}
                   </p>
                 </div>
                 <div className="box dth">
                   {" "}
                   <p className="title">Deaths</p>
                   <CountUp
                     start={0}
                     end={this.state.deaths}
                     duration={3}
                     separator=","
                   />
                   <p>
                     <span>Last Update</span>
                     <br></br>
                     {new Date(this.state.lastUpdate).toDateString()}
                   </p>
                 </div>
               </div>
             </div>
           );
         }
       }

export default App;

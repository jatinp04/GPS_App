import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Dashboard.css";
import axios from "axios";

function Dashboard() {
  const [setDevices,getDevices] =useState([])


 function getAllDevices(){
  axios.get("http://localhost:7000/devices").then((response)=>{
    getDevices(response.data.results)
    // console.log(getDevices);
  })
 }

  return (
    <>
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <table>
                <thead>
                  <tr className="table100-head">
                    <th className="column1D">Timestamp</th>
                    <th className="column2D">Location</th>
                  </tr>
                </thead>
                <tbody>
                {setDevices.map((getDat) => (
                  <tr key={getDat.devices_uuid}>
                   
                    <td> {getDat.latest_timestamp}</td>
                    <td> {getDat.latest_location}</td>
                  </tr>
                ))} 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

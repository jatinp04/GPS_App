import { React, useState, useEffect } from "react";
import { useNavigate, useParams ,useLocation} from "react-router-dom";
import "./style/Dashboard.css";
// import axios from "axios";
import axios from "../Api";
import { PieChart } from "react-minimal-pie-chart";
import _ from "lodash";
import NavBar from "./Navbar";

function Dashboard() {
  const [getDevices, setDevices] = useState([]);
  const [getPieData, setPieData] = useState([]);
  const location = useLocation();
  const dev_id = useParams().dev_id;
  console.log(dev_id);
  console.log(useParams());

  

  const dataMock = [
    { title: "One", value: 10, color: "#E38627" },
    { title: "Two", value: 15, color: "#C13C37" },
    { title: "Three", value: 20, color: "#6A2135" },
  ];

  function formatToPieChartData(apiData) {
    const piedata = [];

    const grouped = _.groupBy(apiData, "latest_location");
    _.map(grouped, (value, key) => {
      // piedata.push({title: key, value: value.length, color: `#C13C37`});
      piedata.push({title: key, value: value.length, color: `#DF${value.length}63C`});
    });

    console.log("piedate: ", piedata);
    setPieData(piedata);
  }

  function getAllDevices(dev_id) {
    axios.get(`/devices?dev_id=${dev_id}`,{withCredentials:true}).then((response) => {
      setDevices(response.data.results);
      // console.log(setDevices);
      formatToPieChartData(response.data.results);
    });
  }
  useEffect(() => {
    getAllDevices(location.state.search);
  }, []);

  return (
    <>
    <NavBar></NavBar>
      <div style={{ display: "flex", float: "left", width: "100%" }}>
        <div className="container-tableD">
          <table>
            <thead>
              <tr className="table100-head">
                <th className="column1">Timestamp</th>
                <th className="column2">Location</th>
              </tr>
            </thead>
            <tbody>
              {getDevices.map((getDat) => (
                <tr key={getDat.devices_uuid}>
                  <td> {getDat.latest_timestamp}</td>
                  <td> {getDat.latest_location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ width: "50%", marginRight: "40px" }}>
         
          <PieChart
            data={getPieData}
            radius="15"
            segmentsShift={(index) => (index === 0 ? 3 : 0)}
            label={({ dataEntry }) =>( dataEntry.percentage+"%")}

            labelStyle={{
              fontSize: "2.5px",
              fontFamily:"inherit",
               
            }}
          />
           
        </div>
      </div>
    </>
  );
}

export default Dashboard;

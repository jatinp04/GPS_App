    import { React, useState, useEffect } from "react";
    import { Router, useNavigate,Navigate } from "react-router-dom";
    import "./style/Home.css";
    // import axios from "axios";
    import axios from "../Api";
    import NavBar from "./Navbar";
   
    import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
    import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
    import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
    import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
    import _ from "lodash";

    function Home() {
 

      const [getPage, setPage] = useState(1);
      const [getTotalPage, setTotalPage] = useState(0);
      const [getDevices, setDevices] = useState([]);
      const [getDevicesFilter, setDevicesFilter] = useState([]);
      const navigate = useNavigate();
      
      const [authenticated, setauthenticated] = useState(null);


      function getAllDevices(queryParams) {
        axios
          .get(`/devices${queryParams}`, {
            withCredentials: true,
          })
          .then((response) => {
            if(response.status===200){
              setDevices(response.data.results);
            setDevicesFilter(response.data.results);
            // console.log(response.data.results);
            }
            else{
              navigate ("/login")
            }
            
          })
          .catch((err) => {
            console.log("error:", err);
              navigate ("/login")
          });
      }

      function getTotalPages() {
        axios
          .get("/count?tableKey=devices", {
            withCredentials: true,
          })
          .then((response) => {
            if (response.status === 200) {
              const totalPages = Math.ceil(parseInt(response.data.results) / 5);
              setTotalPage(totalPages);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      useEffect(() => {
        getAllDevices("");
        getTotalPages();
      }, []);


    
      

      const gotoPage = (cursor, sortOptions) => {
        let currPage = getPage;
        console.log("before: ", currPage);

        if (cursor && cursor === "prev") {
          currPage = currPage - 1 <= 1 ? 1 : currPage - 1;
        } else if (cursor && cursor === "next") {
          currPage = currPage + 1 >= getTotalPage ? getTotalPage : currPage + 1;
        }
        console.log("after: ", currPage);
        const offset = (currPage - 1) * 5 < 0 ? 0 : (currPage - 1) * 5;
        let queryParams = `?offset=${offset}`;
        if (sortOptions && sortOptions.orderKey) {
          queryParams = `${queryParams}&orderKey=${sortOptions.orderKey}`;
          if (sortOptions.orderBy) {
            queryParams = `${queryParams}&orderBy=${sortOptions.orderBy}`;
          }
        }
        getAllDevices(queryParams);
        setPage(currPage);
      };
      // function handleSearch(event) {
      //   //  let searchResult = setDevices.find(obj => obj.devices_id == input)
      //   let input = event.target.value;
      //    let searchResults = setDevices.filter((o) =>
      //     Object.keys(o).some((k) =>
      //       String(o[k]).toLowerCase().includes(input.toLowerCase())
      //     )
      //   );
      //   console.log(searchResults);
      // }

      const handleSearch = (query) => {
        if (!query || query === "") {
          setDevicesFilter(getDevices);
        }
        console.log("search query: ", query);
        const filtered = _.filter(getDevices, (device) => {
          let joinedString = `${device.devices_id}${device.device_type}${device.latest_location}`;
          joinedString = joinedString.toLowerCase();
          if (joinedString.includes(query.toLowerCase())) {
            return true;
          }
          return false;
        });
        setDevicesFilter(filtered);
      };

      return (
        <>
          

          <div className="limiter">
            <div className="container-table100">
              <div className="wrap-table100">
                <div className="table100">
                  {/* Title Section */}
                  <div className="div-heading">
                    <h1 className="h1-heading"> GPS Summary</h1>
                    <NavBar> </NavBar>
                  </div>
                  <div className="div-search">
                    <form role="search">
                      <input
                        id="search"
                        type="search"
                        placeholder="Search by DeviceID/Type"
                        onChange={(e) => {
                          e.preventDefault();
                          handleSearch(e.target.value);
                        }}
                        required
                      />
                    </form>
                    <div className="arrow">
                      <p style={{ color: "white" }}>
                        {" "}
                        {getPage} of {getTotalPage}{" "}
                      </p>

                      <NavigateBeforeSharpIcon
                        className="navigation"
                        style={{ color: "white" }}
                        onClick={(e) => {
                          e.preventDefault();
                          gotoPage("prev");
                        }}
                      >
                        {" "}
                        Left
                      </NavigateBeforeSharpIcon>

                      <NavigateNextSharpIcon
                        className="navigation"
                        style={{ color: "red" }}
                        onClick={(e) => {
                          e.preventDefault();
                          gotoPage("next");
                        }}
                      >
                        {" "}
                        Right{" "}
                      </NavigateNextSharpIcon>
                    </div>
                  </div>

                  {/* Title End */}

                  <table>
                    <thead>
                      <tr className="table100-head">
                        <th
                          className="column1"
                          onClick={(e) => {
                            e.preventDefault();
                            gotoPage(false, {
                              orderKey: "devices_id",
                              orderBy: "desc",
                            });
                          }}
                        >
                          DeviceID  <ArrowDropDownIcon/>
                        </th>
                        <th
                          className="column2"
                          onClick={(e) => {
                            e.preventDefault();
                            gotoPage(false, {
                              orderKey: "device_type",
                              orderBy: "desc",
                            });
                          }}
                        >
                        
                          Device Type<ArrowDropDownIcon/>
                        </th>
                        <th
                          className="column3"
                          onClick={(e) => {
                            e.preventDefault();
                            gotoPage(false, {
                              orderKey: "latest_timestamp",
                              orderBy: "desc",
                            });
                          }}
                        >
                        
                          Latest Timestamp<ArrowDropDownIcon/>
                        </th>
                        <th
                          className="column4"
                          onClick={(e) => {
                            e.preventDefault();
                            gotoPage(false, {
                              orderKey: "latest_location",
                              orderBy: "desc",
                            });
                          }}
                        >
                          {" "}
                          Latest Location<ArrowDropDownIcon/>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDevicesFilter.map((getDat) => (
                        <tr key={getDat.devices_uuid}>
                          <td>{getDat.devices_id}</td>
                          <td>{getDat.device_type}</td>
                          <td> {getDat.latest_timestamp}</td>
                          <td
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/dashboard", {
                                state: { search: getDat.devices_id },
                              });
                            }}
                          >
                            {" "}
                            {getDat.latest_location}
                            <span>
                              <ArrowRightAltSharpIcon
                                style={{ marginLeft: "80px" }}
                              ></ArrowRightAltSharpIcon>
                            </span>
                          </td>
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

    export default Home;

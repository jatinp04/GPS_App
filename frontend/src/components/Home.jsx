import { React, useState, useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import "./style/Home.css";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import _ from "lodash";

function Home() {
  // const {
  //   page,
  //   nextPage,
  //   previousPage,
  //   canPreviousPage,
  //   canNextPage,
  //   state,
  //   pageCount,

  // } = useTable(
  //   {
  //     columns,
  //     data,
  //     initialState: { pageIndex: 2 }
  //   },
  //   usePagination
  // );

  // const { pageIndex, pageSize } = state;

  const [getPage, setPage] = useState(1);
  const [getTotalPage, setTotalPage] = useState(0);
  const [getDevices, setDevices] = useState([]);
  const [getDevicesFilter, setDevicesFilter] = useState([]);
  const navigate = useNavigate();

  function getAllDevices(queryParams) {
    axios
      .get(`http://localhost:7000/devices${queryParams}`)
      .then((response) => {
        setDevices(response.data.results);
        setDevicesFilter(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  function getTotalPages() {
    axios
      .get("http://localhost:7000/count?tableKey=devices")
      .then((response) => {
        if (response.status == 200) {
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

    if (cursor && cursor == "prev") {
      currPage = currPage - 1 <= 1 ? 1 : currPage - 1;
    } else if (cursor && cursor == "next") {
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
    if (!query || query == "") {
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
                    Right
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
                      DeviceID
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
                      Device Type
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
                      Latest Timestamp
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
                      Latest Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getDevicesFilter.map((getDat) => (
                    <tr key={getDat.devices_uuid}>
                      <td>{getDat.devices_id}</td>
                      <td>{getDat.device_type}</td>
                      <td> {getDat.latest_timestamp}</td>
                      <td onClick={(e) => {e.preventDefault(); navigate({
                         pathname: '/dashboard',
                         search: `?dev_id=${getDat.devices_id}`,
                      });}}>
                        {" "}
                        {getDat.latest_location}
                        <span>
                          <ArrowRightAltSharpIcon></ArrowRightAltSharpIcon>
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

//  <div>

//     <KeyboardArrowLeftSharpIcon onClick={() => previousPage()} disabled={!canPreviousPage}/>
//       {" "}
//     <KeyboardArrowRightSharpIcon onClick={() => nextPage()} disabled={!canNextPage}/>
//       {" "}

//     <span>
//       Page{" "}
//       <strong>
//         {pageIndex + 1} of {pageOptions.length}
//       </strong>{" "}
//     </span>

//   </div>

{
  /*
// DATABASE (RDB)

db schema
table -> device
create table DEVICE (device_uuid <uuid>, device_id <string>, device_type <varchar>, latest_timestamp <timestamp>, latest_location [L1, l2])

select * from device;
  1. ->
  2. ->
  3. ->
  

// FRONTEND
  
devicesArray = [{}, {}, ...]; //array of objects

<table>
  <thead>
    <tr className="table100-head">
      <th className="column1">DeviceID</th>
      <th className="column2">Device Type</th>
      <th className="column3">Latest Timestamp</th>
      <th className="column4">Latest Location</th>
    </tr>
  </thead>
  <tbody>
    for (let i = 0; i < devicesArray.length; i++) {
      <tr>
    		for (let j = 0; j , devicesArray[i].length; j++) {
          <td className="column1">devicesArray[i][j]</td>
        }
      </tr>
    }
  </tbody>
</table>
  

// BACKEND
  get('/deives')
  -> Pagincation
  -> sorting
  
  click page 1 -> GET limit = 5, skip = 0
  click page 2 -> GET limit = 5, skip = skip + <number of columns>;
  
    req.limit
    req.skip
  	<array> select * from deviecs limit(limit), offset(skip), sort DESC sorting_key <any column from devices>;
  
  	-> array of objects

  */
}

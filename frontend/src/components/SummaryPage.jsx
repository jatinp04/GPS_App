import { React, useState } from "react";
import "./style/summary.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

function SummaryPage() {
  return (
    <>
      <div className="container-table">
        <div className="div-heading">
          <h1 className="h1-heading"> GPS Summary</h1>
        </div>
        <div className="div-search">
          <form role="search">
            <input
              id="search"
              type="search"
              placeholder="Search by DeviceID/Type"
              required
            />
          </form>
        </div>

        <div className="wrap-table">
          <div className="table">
            <div className="row header">
              <div className="cell"> DeviceID</div>
              <div className="cell">Device Type</div>
              <div className="cell">Latest Timestamp</div>
              <div className="cell">Latest Location</div>
            </div>
            <div className="row">
              <div className="cell" data-title="DeviceID">
                D-1567
              </div>
              <div className="cell" data-title="Device Type">
                Aircraft
              </div>
              <div className="cell" data-title="Latest Timestamp">
                31-08-2022 10:25:00
              </div>
              <div className="cell" data-title="Location">
                L2
              </div>
            </div>
            <div className="row">
              <div className="cell" data-title="DeviceID">
                D-1568
              </div>
              <div className="cell" data-title="Device Type">
                Personal
              </div>
              <div className="cell" data-title="Latest Timestamp">
                31-08-2022 10:25:00
              </div>
              <div className="cell" data-title="Location">
                L1
              </div>
            </div>
            <div className="row">
              <div className="cell" data-title="DeviceID">
                D-1569
              </div>
              <div className="cell" data-title="Device Type">
                Aircraft
              </div>
              <div className="cell" data-title="Latest Timestamp">
                31-08-2022 10:25:00
              </div>
              <div className="cell" data-title="Location">
                L2
              </div>
            </div>
            <div className="row">
              <div className="cell" data-title="DeviceID">
                D-1570
              </div>
              <div className="cell" data-title="Device Type">
                Asset
              </div>
              <div className="cell" data-title="Latest Timestamp">
                31-08-2022 10:25:00
              </div>
              <div className="cell" data-title="Location">
                L4
              </div>
            </div>

            <div className="row">
              <div className="cell" data-title="DeviceID">
                D-1571
              </div>
              <div className="cell" data-title="Device Type">
                Mobile
              </div>
              <div className="cell" data-title="Latest Timestamp">
                31-08-2022 10:25:00
              </div>
              <div className="cell" data-title="Location">
                L3
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryPage;

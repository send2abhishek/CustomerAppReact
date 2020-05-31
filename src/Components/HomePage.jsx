import React, { Component } from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  fetchCustomers,
  updateMapData,
  updatePageCount,
} from "../store/actions/notesActions";
class Home extends Component {
  getCustomers = (id) => {
    this.props.onFetchCustomers();
  };

  componentDidMount() {
    this.getCustomers();
  }
  onChangeHandler = (e) => {
    const notesCopy = [...this.props.getMapData];

    var regexstring = e.target.value;
    var regexp = new RegExp(regexstring, "gi");
    const searchData = notesCopy.filter((data) => {
      return data.notes.match(regexp);
    });

    if (regexstring.trim().length === 0) {
      this.getCustomers();
    } else {
      this.props.onUpdateMapData(searchData);
    }
  };

  handlePagination = (id) => {
    if (id > 0 && this.props.gettotalPageCount >= id) {
      const TotalData = [...this.props.getCustomers];
      let TotalDatalength = TotalData.length;
      let currentPageNbr = 6 * id;
      let pageData = [];
      if (currentPageNbr >= 1 && TotalDatalength - currentPageNbr >= 6) {
        pageData = TotalData.slice(6 * (id - 1), 6 * id);
      } else if (TotalDatalength - currentPageNbr < 6) {
        pageData = TotalData.slice(6 * (id - 1), 6 * (id - 1) + 6);
      } else {
        if (currentPageNbr >= 1 && TotalDatalength > 6) {
          pageData = TotalData.slice(
            6 * (id - 1),
            6 * (id - 1) + (currentPageNbr - TotalDatalength)
          );
        }
      }
      if (currentPageNbr >= 1 && TotalDatalength > 6) {
        this.props.onUpdateMapData(pageData);
        this.props.onUpdateCurrentPageCount(id);
      }
    }
  };
  render() {
    let mapData =
      this.props.getCustomers.length > 0 ? (
        this.props.getMapData.map((data, index) => {
          return (
            <Grid key={index} item xs={4}>
              <Cards data={data} />
            </Grid>
          );
        })
      ) : (
        <p>No Users Found</p>
      );

    const displayItem = [];

    for (let i = 1; i <= this.props.gettotalPageCount; i++) {
      displayItem.push(i);
    }

    return (
      <div>
        <Header {...this.props} />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Grid container>
                <Grid item xs={12}>
                  <Grid container>{mapData}</Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <ul
            className="pagination justify-content-center"
            style={{ marginTop: "14px" }}
          >
            <li className="page-item">
              <Link
                className="page-link"
                to="/home"
                onClick={() =>
                  this.handlePagination(this.props.getcurrentPageCount - 1)
                }
              >
                Previous
              </Link>
            </li>
            {displayItem.length > 0
              ? displayItem.map((data, index) => {
                  return (
                    <li key={index} className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        onClick={() => this.handlePagination(data)}
                      >
                        {data}
                      </Link>
                    </li>
                  );
                })
              : null}
            <li className="page-item">
              <Link
                className="page-link"
                to="/home"
                onClick={() =>
                  this.handlePagination(this.props.getcurrentPageCount + 1)
                }
              >
                Next
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getCustomers: state.customers,
    getMapData: state.mapData,
    getcurrentPageCount: state.currentPageCount,
    gettotalPageCount: state.totalPageCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCustomers: () => dispatch(fetchCustomers()),
    onUpdateMapData: (data) => dispatch(updateMapData(data)),
    onUpdateCurrentPageCount: (number) => dispatch(updatePageCount(number)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

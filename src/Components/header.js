import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createNewNote } from "../store/actions/notesActions";
import { connect } from "react-redux";
const Header = (props) => {
  const logoutCall = async () => {
    await window.localStorage.removeItem("x-auth-token");
    await window.localStorage.removeItem("x-auth-username");
    await window.localStorage.removeItem("x-auth-userId");
    setTimeout(() => {
      props.history.replace("/");
    }, 1000);
  };
  useEffect(() => {
    setTimeout(() => {
      logoutCall();
    }, 60000);
  }, [props]);
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-light navbar-light gmd-6">
        <Link className="navbar-brand" to="/home">
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown" style={{ marginRight: "110px" }}>
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                id="navbardrop"
                data-toggle="dropdown"
              >
                <i
                  className="fa fa-power-off text-danger"
                  aria-hidden="true"
                ></i>
              </Link>

              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">
                  {window.localStorage.getItem("x-auth-username")}
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => logoutCall()}
                  style={{ cursor: "pointer" }}
                >
                  logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getNotes: state.notes,
    getMapData: state.mapData,
    getcurrentPageCount: state.currentPageCount,
    gettotalPageCount: state.totalPageCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewNote: (data) => dispatch(createNewNote(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

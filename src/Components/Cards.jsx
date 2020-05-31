import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {
  UpdateCustomer,
  DeleteCustomer,
  uploadAvatar,
} from "../store/actions/notesActions";
import { connect } from "react-redux";
import userIcon from "../icons/user.png";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 280,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: "10px",
    marginTop: "-70px",
  },
}));

const Cards = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [form, setForm] = useState({
    Id: "",
    name: "",
    email: "",
    country: "",
    phone: null,
  });

  const [avatar, setAvatar] = useState({
    avatar: "",
  });

  useEffect(() => {
    setForm({
      Id: props.data._id,
      name: props.data.name,
      email: props.data.email,
      country: props.data.country,
      phone: props.data.phone,
    });
    setAvatar({
      avatar: props.data.avatar,
    });
  }, [props]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const avatarHandler = (e) => {
    setAvatar(e.target.files[0]);
  };
  const formHandler = (e, name) => {
    const formData = { ...form };
    formData[name] = e.target.value.trim();
    setForm(formData);
  };
  const HandleDelete = (id) => {
    setAnchorEl(null);
    const userId = window.localStorage.getItem("x-auth-userId");
    if (userId === id) {
      alert("You can't delete logged in user, try deleting another user");
      return;
    }
    props.onCustomerDelete(id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateCustomer(form);
  };
  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    let data = {
      avatar: avatar,
      userId: props.data._id,
    };
    props.onCustomerAvatarUpdate(data);
  };
  return (
    <Card className={classes.root} style={{ marginTop: "10px" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
          </IconButton>
        }
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          data-toggle="modal"
          data-target={`#model1${props.data._id}`}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => HandleDelete(props.data._id)}>Delete</MenuItem>
      </Menu>
      <CardContent>
        <Grid container justify="center">
          <Avatar
            alt="user Image"
            src={
              props.data.avatar === null
                ? userIcon
                : `http://${props.data.avatar}`
            }
            variant="circle"
            className={classes.large}
            style={{
              display: "flex",
              alignItems: "center",
            }}
            data-toggle="modal"
            data-target={`#model2${props.data._id}`}
          />
          <div className="modal fade" id={`model2${props.data._id}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Upload Avatar</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="file"
                        className="form-control"
                        id="file-id"
                        // value={avatar}
                        onChange={avatarHandler}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmitAvatar}
                      data-dismiss="modal"
                    >
                      Save
                    </button>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Typography variant="h5" component="h4" align="center">
          {props.data.name}
        </Typography>
        <Typography color="textSecondary" align="center" variant="subtitle2">
          Admin
        </Typography>
        <Grid container>
          <Grid item xs={3}>
            <MailOutlineIcon />
          </Grid>
          <Grid item xs={8}>
            <Typography color="textSecondary" align="right" variant="subtitle1">
              {props.data.email}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <PhoneIcon />
          </Grid>
          <Grid item xs={8}>
            <Typography color="textSecondary" align="right" variant="subtitle1">
              {props.data.phone}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <div className="modal fade" id={`model1${props.data._id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Customer Details</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    onChange={(event) => formHandler(event, "name")}
                    value={form.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={form.email}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Country:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter country"
                    onChange={(event) => formHandler(event, "country")}
                    value={form.country}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter phone number"
                    onChange={(event) => formHandler(event, "phone")}
                    value={form.phone}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  data-dismiss="modal"
                >
                  Save
                </button>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
const mapStateToProps1 = (state) => {
  return {
    getNotes: state.customers,
  };
};

const mapDispatchToProps1 = (dispatch) => {
  return {
    onUpdateCustomer: (data) => dispatch(UpdateCustomer(data)),
    onCustomerDelete: (data) => dispatch(DeleteCustomer(data)),
    onCustomerAvatarUpdate: (data) => dispatch(uploadAvatar(data)),
  };
};
export default connect(mapStateToProps1, mapDispatchToProps1)(Cards);

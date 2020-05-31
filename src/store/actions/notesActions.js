import Actions from "./actionTypes";
import axios from "../../axios-instance";

export const setCustomers = (notes) => {
  return {
    type: Actions.SET_CUSTOMERS,
    notesData: notes,
  };
};

export const errCustomer = (err) => {
  return {
    type: Actions.FETCH_CUSTOMER_ERROR,
    notesDataError: err,
  };
};

export const fetchCustomers = (id) => {
  return (dispatch) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + window.localStorage.getItem("x-auth-token");
    axios
      .get("/")
      .then((response) => {
        dispatch(setCustomers(response.data));
      })
      .catch((err) => {
        console.log("got err ", err);
        dispatch(errCustomer(err));
      });
  };
};
export const setNewNotes = (notes) => {
  return {
    type: Actions.CREATE_NEW_NOTE,
    newNote: notes,
  };
};

export const createNewNote = (data) => {
  console.log("new Note event called", data);
  return (dispatch) => {
    const notesData = {
      notesId: window.localStorage.getItem("x-auth-userId"),
      notes: data,
    };
    axios
      .post("create", notesData)
      .then((response) => {
        console.log("response is", response);
        dispatch(setNewNotes(response.data.data));
      })
      .catch((err) => console.log("error is", err));
  };
};

export const updateMapData = (notes) => {
  return {
    type: Actions.UPDATE_MAP_DATA,
    mapData: notes,
  };
};

export const updatePageCount = (count) => {
  return {
    type: Actions.UPDATE_PAGECOUNT,
    totalCount: count,
  };
};

const updatedCustomer = (updatedData) => {
  return {
    type: Actions.CUSTOMER_UPDATE,
    updatedNote: updatedData,
  };
};
const DeleteCustomerAction = (deletedData) => {
  return {
    type: Actions.CUSTOMERS_DELETE,
    deletedNote: deletedData,
  };
};

export const UpdateCustomer = (data) => {
  return (dispatch) => {
    const CustomerData = {
      Id: data.Id,
      name: data.name,
      email: data.email,
      country: data.country,
      phone: data.phone,
      modifiedBy: data.Id,
    };
    axios
      .put("/", CustomerData)
      .then((response) => {
        dispatch(updatedCustomer(response.data));
      })
      .catch((err) => console.log("error is", err));
  };
};

export const DeleteCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete("/", {
        data: {
          Id: id,
        },
      })
      .then((response) => {
        dispatch(DeleteCustomerAction(response.data));
      })
      .catch((err) => console.log("error is", err));
  };
};
const uploadAvatarAction = (data) => {
  return {
    type: Actions.UPLOAD_AVATAR,
    updatedAvatar: data.user,
  };
};
export const uploadAvatar = (data) => {
  return (dispatch) => {
    let formData = new FormData();

    formData.append("avatar", data.avatar);
    formData.append("userId", data.userId);
    axios
      .post("/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(uploadAvatarAction(response.data));
      })
      .catch((err) => console.log("error is", err));
  };
};

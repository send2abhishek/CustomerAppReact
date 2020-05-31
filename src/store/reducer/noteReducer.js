import actionTypes from "../actions/actionTypes";

const initialState = {
  customers: [],
  mapData: [],
  currentPageCount: 1,
  totalPageCount: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUSTOMERS: {
      const data = [];
      for (let notes in action.notesData) {
        data.push(action.notesData[notes]);
      }
      const totalPageCount = Math.ceil(data.length / 6);
      return {
        ...state,
        customers: data,
        mapData: data.slice(0, 6),
        totalPageCount: totalPageCount,
      };
    }

    case actionTypes.UPDATE_MAP_DATA: {
      return {
        ...state,
        mapData: action.mapData,
      };
    }

    case actionTypes.UPDATE_PAGECOUNT: {
      return {
        ...state,
        currentPageCount: action.totalCount,
      };
    }

    case actionTypes.CUSTOMER_UPDATE: {
      const updatedSingleDocument = action.updatedNote;
      let copyNoteData = [...state.customers];
      let copyMapData = [...state.mapData];

      const OldNote = copyNoteData.filter((data) => {
        return data._id === action.updatedNote._id;
      });
      const oldNoteIndexInNote = copyNoteData.findIndex((data) => {
        return data._id === OldNote[0]._id;
      });
      const oldNoteIndexInMapData = copyMapData.findIndex((data) => {
        return data._id === OldNote[0]._id;
      });
      copyNoteData[oldNoteIndexInNote] = updatedSingleDocument;
      copyMapData[oldNoteIndexInMapData] = updatedSingleDocument;
      return {
        ...state,
        customers: copyNoteData,
        mapData: copyMapData,
      };
    }
    case actionTypes.CUSTOMERS_DELETE: {
      let copyNoteData = [...state.customers];
      let copyMapData = [...state.mapData];

      const OldNote = copyNoteData.filter((data) => {
        return data._id === action.deletedNote._id;
      });
      const oldNoteIndexInNote = copyNoteData.findIndex((data) => {
        return data._id === OldNote[0]._id;
      });
      const oldNoteIndexInMapData = copyMapData.findIndex((data) => {
        return data._id === OldNote[0]._id;
      });

      copyNoteData.splice(oldNoteIndexInNote, 1);
      copyMapData.splice(oldNoteIndexInMapData, 1);
      const totalPageCountCopy = Math.ceil(copyNoteData.length / 6);
      return {
        ...state,
        customers: copyNoteData,
        mapData: copyMapData,
        totalPageCount: totalPageCountCopy,
      };
    }
    case actionTypes.UPLOAD_AVATAR: {
      const updatedSingleDocumentAvatar = action.updatedAvatar;
      let copyNoteData1 = [...state.customers];
      let copyMapData1 = [...state.mapData];

      const OldNote1 = copyNoteData1.filter((data) => {
        return data._id === action.updatedAvatar._id;
      });
      const oldNoteIndexInNote1 = copyNoteData1.findIndex((data) => {
        return data._id === OldNote1[0]._id;
      });
      const oldNoteIndexInMapData1 = copyMapData1.findIndex((data) => {
        return data._id === OldNote1[0]._id;
      });
      copyNoteData1[oldNoteIndexInNote1] = updatedSingleDocumentAvatar;
      copyMapData1[oldNoteIndexInMapData1] = updatedSingleDocumentAvatar;
      return {
        ...state,
        customers: copyNoteData1,
        mapData: copyMapData1,
      };
    }
    default:
      return state;
  }
};

export default reducer;

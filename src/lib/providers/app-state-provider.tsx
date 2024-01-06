"use client";

import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface AppState {
  rooms: Rooms[] | [];
  selectedRoom: Rooms | undefined;
  roomAndUsers: RoomMember[] | [];
  messages: Messages[] | [];
}

type Action =
  | { type: "ADD_ROOM"; payload: Rooms }
  | { type: "SET_ROOMS"; payload: { rooms: Rooms[] | [] } }
  | { type: "UPDATE_ROOM"; payload: { room: Partial<Rooms>; roomId: string } }
  | { type: "DELETE_ROOM"; payload: string }
  | { type: "SELECT_ROOM"; payload: string }
  | { type: "SET_R_USERS"; payload: { roomAndUsers: RoomMember[] | [] } }
  | { type: "ADD_MESSAGE"; payload: Messages }
  | { type: "SET_MESSAGES"; payload: { messages: Messages[] | [] } }
  | {
      type: "UPDATE_MESSAGE";
      payload: { message: Partial<Messages>; messageId: string };
    }
  | { type: "DELETE_MESSAGE"; payload: string };

const initialState: AppState = {
  rooms: [],
  selectedRoom: undefined,
  roomAndUsers: [],
  messages: [],
};

const appReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case "ADD_ROOM":
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case "SET_ROOMS":
      return {
        ...state,
        rooms: action.payload.rooms,
      };
    case "UPDATE_ROOM":
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (room.id === action.payload.roomId) {
            return {
              ...room,
              ...action.payload.room,
            };
          }
          return room;
        }),
      };
    case "DELETE_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== action.payload),
      };
    case "SELECT_ROOM":
      return {
        ...state,
        selectedRoom: state.rooms.find((room) => room.id === action.payload),
      };
    case "SET_R_USERS":
      return {
        ...state,
        roomAndUsers: action.payload.roomAndUsers,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload.messages.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
      };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) => {
          if (msg.id === action.payload.messageId) {
            return {
              ...msg,
              ...action.payload.message,
            };
          }
          return msg;
        }),
      };
    default:
      return initialState;
  }
};

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    console.log("App State Changed", state);
  }, [state]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

import { AnyAction } from 'redux';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
} from "./../actions/ws";
import { AppDispatch } from "./../store";
import { getCookie } from "../../utils/utils";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: {
    wsInit: typeof WS_CONNECTION_START;
    wsSendMessage: typeof WS_SEND_MESSAGE;
    onOpen: typeof WS_CONNECTION_SUCCESS;
    onClose: typeof WS_CONNECTION_CLOSED;
    onError: typeof WS_CONNECTION_ERROR;
    onMessage: typeof WS_GET_ORDERS;
  }
) => {
  return (store: { dispatch: AppDispatch }) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction)=> void) => (action: { type: string; payload: string }) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const token = getCookie("token");

      if (type === wsInit) {
        socket =
          token && payload === "withAuth"
            ? new WebSocket(`${wsUrl}?token=${token}`)
            : new WebSocket(`${wsUrl}/all`);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, orders: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (type === wsSendMessage) {
        const message = { ...(payload as any), token: token };
        socket?.send(JSON.stringify(message));
      }

      next(action);
    };
  };
};

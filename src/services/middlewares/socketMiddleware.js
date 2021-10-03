import { getCookie } from "../../utils/utils";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
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
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
          console.log("open", socket);
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
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
        const message = { ...payload, token: token };
        socket.send(JSON.stringify(message));
      }

      if (socket && type === onClose) {
        console.log("closed", socket);
        socket.close();
      }

      next(action);
    };
  };
};

export const WS_CONNECTION_START = "WS_CONNECTION_START" as const;
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS" as const;
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR" as const;
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED" as const;
export const WS_GET_ORDERS = "WS_GET_MESSAGE" as const;
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE" as const;

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetOrders = (message: string) => {
  return {
    type: WS_GET_ORDERS,
    payload: message,
  };
};

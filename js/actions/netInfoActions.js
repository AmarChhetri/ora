export const connectionState = (status) => {
  return { 
    type: 'CHANGE_CONNECTION_STATUS', 
    isConnected: status.status 
  };
};

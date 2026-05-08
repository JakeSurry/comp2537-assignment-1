import useErrorStore from "../store/errorStore";
import PopUp from "./PopUp";

const NetworkError = () => {
  const { networkError, clearNetworkError } = useErrorStore();

  if (!networkError) return null;

  return (
    <PopUp
      title="Connection Error"
      body={networkError}
      label="Dismiss"
      onAccept={clearNetworkError}
    />
  );
};

export default NetworkError;
import { useEffect } from "react";

function useLogger(message: string) {
  useEffect(() => {
    console.log("El pokemon del día es Pinsir", message);
  }, [message]);
}

export default useLogger;

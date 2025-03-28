import React, { useEffect, useState } from "react";
import { Home } from "./Home";
import { getDatabaseSize } from "../../services/api/functions";

export const HomeContainer = () => {
  const [sizeDBMessage, setSizeDBMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getDatabaseSize()
      .then((response) => {
        setSizeDBMessage(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setSizeDBMessage(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const homeProps = { sizeDBMessage, isLoading };
  return <Home {...homeProps} />;
};

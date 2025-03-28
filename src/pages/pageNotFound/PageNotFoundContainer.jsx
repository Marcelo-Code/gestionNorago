import React from "react";
import { PageNotFound } from "./pageNotFound";
import { useNavigate } from "react-router-dom";

export const PageNotFoundContainer = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const pageNotFoundProps = {
    handleGoBack,
  };
  return <PageNotFound {...pageNotFoundProps} />;
};

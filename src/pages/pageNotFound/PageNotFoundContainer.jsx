import React from "react";
import { useNavigate } from "react-router-dom";
import { PageNotFound } from "./pageNotFound";

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

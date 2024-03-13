import React from "react";
import style from "./style.module.scss";

export const Loader = () => {
  return (
    <div className={style.loaderBox}>
      <p className={`${style.loaderText} mb-0 py-3`}>Loading...</p>
    </div>
  );
};

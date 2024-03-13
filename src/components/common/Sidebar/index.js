import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./style.module.scss";

export const Sidebar = ({ navData, isCollapse, detectClick }) => {
  const location = useLocation();

  return (
    <div
      className={`container ${
        isCollapse ? "col-1 w-auto" : "col-2"
      } pe-1 ps-3 postionContentBox`}
    >
      {navData?.map((menu, index) => {
        return (
          <NavLink
            key={index}
            to={menu.to}
            className={`${classes.navLink} fs-14 fw-500`}
            onClick={() => detectClick(true)}
          >
            <p
              className={`${
                !location.pathname.includes(menu.to)
                  ? classes.active
                  : classes.navItem
              } mb-0 my-3 d-flex`}
              title={isCollapse ? menu.label : ""}
            >
              {!location.pathname.includes(menu.to)
                ? menu.image
                : menu.imageHighlight}

              {!isCollapse && (
                <span className={` ps-2`}>
                  {menu.label}
                </span>
              )}
            </p>
          </NavLink>
        );
      })}
    </div>
  );
};

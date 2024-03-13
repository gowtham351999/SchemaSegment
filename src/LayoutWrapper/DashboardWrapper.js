import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi";
import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";
import { useNavigate } from "react-router-dom";

export const DashboardWrapper = ({ children, getList, detectClick }) => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const sideBarData = [
    {
      name: "audience",
      label: "Audience",
      to: "/home/audience",
      linkName: "/audience",
      image: <HiUsers className="sideBarIconNonHighlight" />,
      imageHighlight: <HiUsers className="text-light sideBarIcon" />,
    },
  ];

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const authToken = localStorage.getItem('sb-kcahqydrmeduuxuzssha-auth-token');
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <Navbar handleToggler={toggleHandler} getList={getList} />
            <div className="row w-100">
              <Sidebar navData={sideBarData} isCollapse={toggle} />
              <div className="col postionContentBox pe-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import "./style.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "@supabase/supabase-js";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { supabaseAnonKey, supabaseUrl } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleHandler } from "../../../redux/actions/PanelAct";

export const Navbar = ({ handleToggler }) => {
  const dispatch = useDispatch();
  const getToggleStatus = useSelector((v) => v?.commonStore?.fileData);
  const [state, setState] = useState(true);
  const [toggle, setToggle] = useState(false);
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const getProfileDetails = JSON.parse(
    localStorage.getItem("sb-kcahqydrmeduuxuzssha-auth-token")
  );
  const { email } = getProfileDetails?.user || {};

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await supabase.auth.signOut();
      if (data) {
        toast.success("Logging out!");
        setToggle(false);
        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      toast.success("Logout failed!");
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <>
      <div className="navbar px-4 position-relative">
        <div className="d-flex justify-content-between align-items-center w-100 h-100">
          <div className="col-2">
            <div className="d-flex flex-row">
              <div onClick={handleToggler}>
                <GiHamburgerMenu className="text-black burgerIcon" />
              </div>
              <div className="ps-3">
                <p className="TextLogo mb-0">Panel</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end w-100 align-items-center">
            <div className="mr-4 d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="profileBtn py-2"
                onClick={() =>{
                  setToggle(true);
                  dispatch(toggleHandler(true));
                }}
              >
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <div className="pe-2">
                    <p className="profileTextLogo mb-0">Panel</p>
                  </div>
                  <div>
                    <div className="profileRound bg-mediumStateBlue">
                      <p className={`userLogoName text-light mb-0`}>
                        {(email && email?.[0].toUpperCase()) || "U"}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div
              className="cursor-pointer profile profile-dropdown mr-3"
              onClick={() => setState(!state)}
            >
              <div className="d-flex align-items-center">
                <i className="icon-down-arrow down-icon text-white" />
              </div>
            </div>
          </div>
        </div>
        {(toggle && getToggleStatus) && (
          <div className="logoutModal">
            <MdClose
              className="cursor-pointer positionModalClose"
              onClick={() => setToggle(false)}
            />
            <p className="profileNmaeClass text-center mb-0 pt-4">{email}</p>
            <div className="d-flex justify-content-center mt-3">
              <div>
                <div className="profileRoundNew bg-seaGreen">
                  <p className={`userLogoNameNew text-light mb-0`}>
                    {(email && email?.[0].toUpperCase()) || "U"}
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <p className="welcomeNameClass text-center mb-0 pt-2">{`Hi ${
                  email && email?.split("@")?.[0]
                }`}</p>
              </div>
            </div>
            <div className="mx-auto d-block px-5 mt-3 pb-3">
              <button
                type="button"
                className="profileBtn py-2"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer className="toast-position" position="top-right" />
    </>
  );
};

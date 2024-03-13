import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../utils/helper";
import { MdClose } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { PanelButton } from "../common/PanelButton";
import { segmentOptions } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleHandler } from "../../redux/actions/PanelAct";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "2px solid #49b697",
    borderRadius: "0.375rem",
    padding: "4px",
  }),
};

const Audience = () => {
  const getToggleStatus = useSelector((v) => v?.commonStore?.fileData);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [storeSegment, setStoreSegment] = useState([]);
  const [updatedStore, setUpdatedStore] = useState([]);
  const [selectField, setSelectField] = useState({});
  const segmentName = useRef(null);
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const openCanvas = () => {
    setToggle(true);
    dispatch(toggleHandler(false));
  };

  const addSchema = () => {
    setUpdatedStore(storeSegment);
  };

  const handleRemoveField = (id, val) => {
    const temp = updatedStore;
    temp.splice(id, 1);
    setUpdatedStore([...temp]);
  };

  const handleClearFields = () => {
    setToggle(false);
    setStoreSegment([]);
    setUpdatedStore([]);
    setSelectField({});
    segmentName.current.value = null;
  };

  useEffect(() => {
    setStoreSegment(updatedStore);
  }, [updatedStore]);

  const handleSelectField = (selectedOption, value) => {
    setSelectField({
      ...selectField,
      [value]: selectedOption,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(segmentName);
    const extractedData = Object.keys(selectField).map((key) => {
      return { key: selectField[key].value, value: selectField[key].value };
    });
    const datum = extractedData?.map((v) => v?.value);
    const frequencyMap = datum?.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    const isDuplicates = Object.values(frequencyMap).some((v) => v > 1);
    if (!isDuplicates) {
      try {
        const { data, error } = await supabase
          .from("SegmentSchema")
          .insert([{ segment_name: segmentName?.current?.value,  schema: extractedData, }])
          .select();
        if (data) {
          toast.success("Updated Successfully!");
          handleClearFields();
        } else if (error) {
          console.error("Insertion error:", error);
          toast.error("Failed!");
        } else {
          console.error("Unknown error occurred");
          toast.error("Failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed!");
      }
    }
    else{
      toast.error("No dupliactes fields allowed, please update carefully!");
    }
  };

  return (
    <>
      {toggle && !getToggleStatus ? (
        <div className="absolute shadow-glass1 right-0 w-[500px] h-screen">
          <div className="flex bg-seaGreen justify-between p-3">
            <p className="mb-0 text-light text-2xl">Saving Segment</p>
            <MdClose
              className="cursor-pointer text-light relative right-2 text-3xl"
              onClick={handleClearFields}
            />
          </div>
          <form>
            <div className="scrollPanelBox relative">
              <div className="grid grid-cols-1 gap-4 p-4">
                <div>
                  <label className="pb-2">Enter the Name of the Segment</label>
                  <input
                    type="text"
                    className="bg-light w-full border-2 border-seaGreen border-solid rounded-2 p-2"
                    ref={segmentName}
                    placeholder="Name of the segment"
                  />
                </div>
                <div>
                  <p className="mb-0 text-gray">
                    To save your segment, you need to add schemas to build the
                    query To save your segment, you need to add schemas to build
                    the query
                  </p>
                </div>
                <div>
                  <Select
                    isMulti
                    options={segmentOptions}
                    placeholder="Add schema to the segment"
                    onChange={(selectedOptions) =>
                      setStoreSegment(selectedOptions || [])
                    }
                    components={{
                      MultiValueRemove: () => null,
                      ClearIndicator: () => null,
                      MultiValueLabel: ({ children, innerProps }) => {
                        const selectedOption = storeSegment.find(
                          (option) => option.value === children
                        );
                        return (
                          <div {...innerProps} className="p-1">
                            {selectedOption && selectedOption.label}
                          </div>
                        );
                      },
                    }}
                    styles={customStyles}
                  />
                </div>
                <div>
                  <PanelButton
                    type="button"
                    label="add to schema"
                    onClick={addSchema}
                  />
                </div>
                <div>
                  {updatedStore?.map((val, i) => (
                    <div key={val?.value} className="flex justify-between pb-3">
                      <div className="w-80">
                        <Select
                          id={val?.value}
                          options={segmentOptions}
                          placeholder={val?.label}
                          onChange={(selectedOptions) =>
                            handleSelectField(selectedOptions, val?.value)
                          }
                          styles={customStyles}
                        />
                      </div>
                      <div className="w-20">
                        <FiMinus
                          className="cursor-pointer text-blue text-3xl"
                          onClick={() => handleRemoveField(i, val?.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex p-4 alignSaveBox">
              <div className="pe-3">
                <PanelButton
                  type="submit"
                  label="Save segment"
                  onClick={handleSubmit}
                />
              </div>
              <div>
                <PanelButton
                  type="button"
                  label="Cancel"
                  className="bg-light text-danger rounded-2 min-w-min-100 mt-3 p-2"
                  onClick={handleClearFields}
                />
              </div>
            </div>
          </form>
        </div>
      ) : null}
      <div className="flex justify-center">
        <div>
          <PanelButton type="button" onClick={openCanvas} />
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-right" />
    </>
  );
};

export default Audience;

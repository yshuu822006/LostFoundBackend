import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateLostItemId, saveLostItem } from "../../Services/LostItemService";

const LostItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  let [newId, setNewId] = useState("");
  let [ldate, setLdate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
  });

  const setLostItemId = () => {
    generateLostItemId().then((response) => {
      setNewId(response.data);
    });
  };

  const setUsername = () => {
    getUserId().then((response) => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setLostItemId();
    setUsername();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setLostItem((values) => ({ ...values, [name]: value }));
  };

  const lostItemSubmit = (event) => {
    event.preventDefault();
    // construct new object instead of mutating state directly
    const itemToSave = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate,
    };
    saveLostItem(itemToSave).then((response) => {
      setFlag(true);
      // optionally reset form or update state if needed
      setLostItem(itemToSave);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }

    if (!lostItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!lostItem.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }
    setErrors(tempErrors);
    if (isValid) {
      lostItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };

  const nextItem = () => {
    navigate("/dummy/1");
  };

  const clearAll = () => {
    setNewId("");
    setLdate(new Date());
    setLostItem({
      lostItemId: "",
      lostItemName: "",
      color: "",
      brand: "",
      category: "",
      location: "",
      username: "",
      lostDate: new Date(),
      status: false,
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="login-card">
          <h2 className="form-title">Lost Item Form Submission</h2>

          <form className="login-form">
            <div className="form-group-custom">
              <label className="form-label">Item Id:</label>
              <input
                name="itemId"
                className="form-input"
                value={newId}
                readOnly
              />
            </div>

            <div className="form-group-custom">
              <label className="form-label">Lost Item Name:</label>
              <input
                name="lostItemName"
                className="form-input"
                value={lostItem.lostItemName}
                onChange={onChangeHandler}
              />
              {errors.lostItemName && (
                <p className="error-message">{errors.lostItemName}</p>
              )}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Item Category:</label>
              <input
                name="category"
                className="form-input"
                value={lostItem.category}
                onChange={onChangeHandler}
              />
              {errors.category && <p className="error-message">{errors.category}</p>}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Item Color:</label>
              <input
                name="color"
                className="form-input"
                value={lostItem.color}
                onChange={onChangeHandler}
              />
              {errors.color && <p className="error-message">{errors.color}</p>}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Item Brand Name:</label>
              <input
                name="brand"
                className="form-input"
                value={lostItem.brand}
                onChange={onChangeHandler}
              />
              {errors.brand && <p className="error-message">{errors.brand}</p>}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Location of Lost Item:</label>
              <input
                name="location"
                className="form-input"
                value={lostItem.location}
                onChange={onChangeHandler}
              />
              {errors.location && <p className="error-message">{errors.location}</p>}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Select Lost Date:</label>
              
            </div>

            <div className="form-group-custom">
              <button className="btn-submit" onClick={handleValidation}>
                Submit
              </button>
              <button className="btn-register" onClick={returnBack}>
                Return
              </button>
              <button className="btn-register" onClick={clearAll}>
                Clear
              </button>
            </div>
          </form>

          {flag && (
            <p className="error-message login-error">
              Lost Item Form Submitted...
              <button className="btn-register" onClick={nextItem}>
                New Form Submission
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default LostItemRegistration;
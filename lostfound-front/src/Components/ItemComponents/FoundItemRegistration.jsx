import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateFoundItemId, saveFoundItem } from "../../Services/FoundItemService";

const FoundItemRegistration = () => {
  let navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState(new Date());
  const [userId, setUserId] = useState("");

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: new Date(),
    status: false,
  });

  
  const setFoundItemId = () => {
    generateFoundItemId().then((response) => {
      setNewId(response.data);
    });
  };

  const setUsername = () => {
    getUserId().then((response) => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setFoundItemId();
    setUsername();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setFoundItem((values) => ({ ...values, [name]: value }));
  };

  const foundItemSubmit = (event) => {
    event.preventDefault();

    const itemToSave = {
      ...foundItem,
      foundItemId: newId,
      username: userId,
      foundDate: fdate,
    };

    saveFoundItem(itemToSave).then(() => {
      setFlag(true);
      setFoundItem(itemToSave);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }

    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }

    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }

    if (!foundItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!foundItem.location.trim()) {
      tempErrors.location = "Found Location is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      foundItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };

  const nextItem = () => {
    navigate("/dummy/2");
  };

  const clearAll = () => {
    setNewId("");
    setFdate(new Date());
    setFoundItem({
      foundItemId: "",
      foundItemName: "",
      color: "",
      brand: "",
      category: "",
      location: "",
      username: "",
      foundDate: new Date(),
      status: false,
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="login-card">
          <h2 className="form-title">Found Item Form Submission</h2>

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
              <label className="form-label">Found Item Name:</label>
              <input
                name="foundItemName"
                className="form-input"
                value={foundItem.foundItemName}
                onChange={onChangeHandler}
              />
              {errors.foundItemName && (
                <p className="error-message">{errors.foundItemName}</p>
              )}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Item Category:</label>
              <input
                name="category"
                className="form-input"
                value={foundItem.category}
                onChange={onChangeHandler}
              />
              {errors.category && (
                <p className="error-message">{errors.category}</p>
              )}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Item Color:</label>
              <input
                name="color"
                className="form-input"
                value={foundItem.color}
                onChange={onChangeHandler}
              />
              {errors.color && (
                <p className="error-message">{errors.color}</p>
              )}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Item Brand Name:</label>
              <input
                name="brand"
                className="form-input"
                value={foundItem.brand}
                onChange={onChangeHandler}
              />
              {errors.brand && (
                <p className="error-message">{errors.brand}</p>
              )}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Location of Found Item:</label>
              <input
                name="location"
                className="form-input"
                value={foundItem.location}
                onChange={onChangeHandler}
              />
              {errors.location && (
                <p className="error-message">{errors.location}</p>
              )}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Select Found Date:</label>
              <input
                type="date"
                className="form-input"
                value={fdate}
                onChange={(event) => setFdate(event.target.value)}
              />
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
              Found Item Form Submitted...
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

export default FoundItemRegistration;

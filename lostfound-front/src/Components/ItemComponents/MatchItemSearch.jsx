import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";

const MatchItemSearch = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [flag, setFlag] = useState(false);
  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: "",
    status: "false",
  });

  const [foundItems, setFoundItems] = useState([]);
  const [matchItem, setMatchItem] = useState({
    lostItemId: "",
    foundItemId: "",
    itemName: "",
    category: "",
    lostUserName: "",
    foundUserName: "",

  });

  const showFoundItems = () => {
    getLostItemById(param.id).then((response) => {
      setLostItem(response.data);
    });
    getFoundItemsByLostItem(param.id).then((response) => {
      setFoundItems(response.data);
    });
  }
  useEffect(() => {
    showFoundItems();
  }, []);

  const returnBack = () => {
    navigate("/lost-list");
  }

  const claimItem = (foundItemId, foundUser) => {
    matchItem.lostItemId = lostItem.lostItemId;
    matchItem.foundItemId = foundItemId;
    matchItem.itemName = lostItem.lostItemName;
    matchItem.category = lostItem.category;
    matchItem.lostUserName = lostItem.username;
    matchItem.foundUserName = foundUser
    saveMatchItem(matchItem).then((response) => {
      setFlag(true);
    });
  }
  return (
    <div className="text-center">
      <div>
        <h2 className="text-center">Students lost Items</h2>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Location</th>
                <th>Lost Date</th>
                <th>User Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{lostItem.lostItemId}</td>
                <td>{lostItem.lostItemName}</td>
                <td>{lostItem.color}</td>
                <td>{lostItem.brand}</td>
                <td>{lostItem.category}</td>
                <td>{lostItem.location}</td>
                <td>{lostItem.lostDate}</td>
                <td>{lostItem.username}</td>
                <td>Not found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div>
        <h2 className="text-center">Matching Found Items</h2>
        <hr style={{ height: "3px", borderWidth: "0", color: "yellow", backgroundColor: "red" }}></hr>
        <div classNmae="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Location</th>
                <th>Found Date</th>
                <th>User Id</th>
                <th>Status</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {foundItems.map((Item, index) => (
                <tr key={Item.foundItemId}>
                  <td>{Item.foundItemId}</td>
                  <td>{Item.foundItemName}</td>
                  <td>{Item.color}</td>
                  <td>{Item.brand}</td>
                  <td>{Item.category}</td>
                  <td>{Item.location}</td>
                  <td>{Item.foundDate}</td>
                  <td>{Item.username}</td>
                  <td>not returned</td>
                  <td>
                    <button style={{ marginLeft: "10px" }} className="btn btn-warning" onClick={() => claimItem(`${Item.foundItemId}`, `${Item.username}`)}>Claim</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <div className="form-group">
            <button style={{ marginLeft: "10px" }} onClick={() => returnBack()} className="btn btn-success">Return</button>
          </div>
        </div>
        {flag && <p style={{ color: "blue" }}> Item Claimed .....</p>}
      </div>
    </div>
     );
 }

export default MatchItemSearch;
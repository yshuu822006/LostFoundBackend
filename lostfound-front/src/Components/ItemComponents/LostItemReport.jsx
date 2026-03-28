import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRole } from "../../Services/LoginService";
import { getAllLostItems, getLostItemsByUsername } from "../../Services/LostItemService";

const LostItemReport = () => {

  let navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    showLostItems();
  }, []);

  const showLostItems = () => {
    getRole().then((response) => {
        setRole(response.data);
        if (response.data === "Admin") {
          getAllLostItems().then((res) => {
            setItemList(res.data);
          });
        }
        const userRole = response.data;
        setRole(userRole);

        if (userRole === "Admin") {
          getAllLostItems().then((res) => {
            setItemList(res.data);
          });
        }

        if (userRole === "Student") {
          getLostItemsByUsername().then((res) => {
            setItemList(res.data);
          });
        }

      })
      .catch((error) => {
        console.error("Error loading lost items:", error);
      });
  };

  const returnBack = () => {
    if (role === "Admin") {
      navigate("/admin-menu");
    } else {
      navigate("/student-menu");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center">
        {role === "Admin" ? "Admin Lost Item List" : "Student Lost Item List"}
      </h2>

      <hr />

      <table className="table table-striped table-bordered">

        <thead>
          <tr>
            <th>Item Id</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Color</th>
            <th>Brand</th>
            <th>Location</th>
            <th>Lost Date</th>
            <th>User Id</th>
            <th>Status</th>

            {role === "Student" && <th>Search</th>}
          </tr>
        </thead>

        <tbody>

          {itemList.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">
                No Lost Items Found
              </td>
            </tr>
          ) : (

            itemList.map((item) => (

              <tr key={item.lostItemId}>

                <td>{item.lostItemId}</td>
                <td>{item.lostItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{new Date(item.lostDate).toLocaleDateString()}</td>
                <td>{item.username}</td>

                <td style={{ color: item.status ? "blue" : "red" }}>
                  {item.status ? "Found" : "Not Found"}
                </td>

                {role === "Student" && (
                  <td>
                    <Link to={`/search/${item.lostItemId}`}>
                      <button className="btn btn-warning">
                        Search Find Item
                      </button>
                    </Link>
                  </td>
                )}

              </tr>

            ))
          )}

        </tbody>

      </table>

      <div className="text-center">
        <button onClick={returnBack} className="btn btn-success">
          Return
        </button>
      </div>

    </div>
  );
};

export default LostItemReport;

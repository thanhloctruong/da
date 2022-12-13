import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export const ContainersCreation = () => {
  const [ct, setCT] = useState([]);
  const [addContainer, setAddContainer] = useState({
    codeorder: "",
    codecontainer: "",
    host: "",
    located: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleAddContainer = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addContainer };
    newFormData[fieldName] = fieldValue;

    setAddContainer(newFormData);
  };

  const Request = async () => {
    const res = await axios
      .post("/api/container/create", {
        codeorder: addContainer.codeorder,
        codecontainer: addContainer.codecontainer,
        host: addContainer.host,
        located: addContainer.located,
      })
      .then((res) => {
        setIsSubmit(!isSubmit);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    Request();
  };
  useEffect(() => {
    const url = "api/container";
    axios
      .get(url)
      .then((response) => {
        setCT(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isSubmit]);

  return (
    <>
      <form className="row" onSubmit={handleAddFormSubmit}>
        <div>
          <h1>Create Container</h1>
        </div>
        <br />
        <div>
          <label className="form-label">Mã Order</label>
          <input
            name="codeorder"
            placeholder="Mã Container"
            onChange={handleAddContainer}
          />
        </div>
        <div>
          <label className="form-label">Mã Container</label>
          <input
            name="codecontainer"
            placeholder="Mã Container"
            onChange={handleAddContainer}
          />
        </div>
        <div>
          <label className="form-label">Sở hữu của</label>
          <input
            name="host"
            placeholder="Sở hữu của"
            onChange={handleAddContainer}
          />
        </div>
        <div>
          <label className="form-label">Địa Chỉ</label>
          <input
            name="located"
            placeholder="Địa Chỉ"
            onChange={handleAddContainer}
          />
        </div>
        <div>
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>

      <div>
        <table className="table table-success table-striped" border="2">
          <thead className="table-dark">
            <tr>
              <th scope="col">Mã Order </th>
              <th scope="col">Mã Container</th>
              <th scope="col">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {ct.map((s, index) => (
              <tr key={index}>
                <td>{s.codeorder}</td>
                <td>{s.codecontainer}</td>
                <td>
                  <Link to={`/packagescreation/${s._id}/create`}>
                    <button>Tạo Package</button>
                  </Link>

                  <Link
                    to={`/containerscreation/container/${s.codecontainer}/update`}>
                    <button>Update</button>
                  </Link>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

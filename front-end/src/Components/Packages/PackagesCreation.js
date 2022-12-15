import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const PackagesCreation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [listPkg, setListPkg] = useState([]);

  const location = useLocation();
  const idContainer = location.pathname.split("/")[2];

  const onSubmit = async (values) => {
    const { name, amount, nhasanxuat } = values;
    await axios
      .put(`/api/package/${listPkg._id}`, {
        name: name,
        amount: amount,
        nhasanxuat: nhasanxuat,
      })
      .then(() => handleClose())
      .catch((error) => {
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      nhasanxuat: "",
    },
    onSubmit,
  });
  const handleAddContainer = () => {};
  const handleAddFormSubmit = () => {};

  useEffect(async () => {
    const data = await axios
      .get(`/api/package/${idContainer}`)
      .then((res) => {
        setListPkg(res.data.data);
      })
      .catch((err) => {
        console.log("--//--  err   ----  ", err);
      });
  }, [show]);

  return (
    <div>
      <form class="NameclassNamerow" onSubmit={handleAddFormSubmit}>
        <div>
          <h1>Create Package</h1>
        </div>
        <br />

        <div className="create-pkg-container">
          <div>
            <label className="form-label">Mã Package</label>
            <input
              name="idpackage"
              placeholder="Mã Container"
              onChange={handleAddContainer}
            />
          </div>
          <div>
            <label className="form-label">Mã Orders</label>
            <input
              name="idorder"
              placeholder="Mã Container"
              onChange={handleAddContainer}
            />
          </div>
          <div>
            <label className="form-label">Mã Container</label>
            <input
              name="idcontainer"
              placeholder="Mã Container"
              value={idContainer}
              readOnly
              onChange={handleAddContainer}
            />
          </div>
          <div>
            <label className="form-label">Sở hữu của</label>
            <input
              name="host"
              placeholder="Sở hữu của"
              // onChange={handleAddContainer}
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
        </div>
        <div>
          <div className="list-pkg-container">
            <h5>Sản Phẩm</h5>
            <Button variant="primary" onClick={handleShow}>
              Thêm Sản Phẩm
            </Button>
            <div className="list-pkg">
              <table>
                <thead>
                  <tr>
                    {/* chưa chỉnh mã sản phẩm từ input thành dropdown */}
                    <th>STT</th>
                    <th>
                      <label
                        htmlFor="iditeminpackage"
                        className="form-lable p-2">
                        <h5>Mã Sản Phẩm</h5>
                      </label>
                    </th>

                    <th>
                      <label htmlFor="idpackage" className="form-lable p-2">
                        <h5>Mã Package</h5>
                      </label>
                    </th>

                    {/* chưa chỉnh tên sản phẩm từ input thành dropdown */}
                    <th>
                      <label htmlFor="tensanpham" className="form-lable p-2">
                        <h5>Tên Sản Phẩm</h5>
                      </label>
                    </th>
                    {/* chưa chỉnh số lượng từ string thành number */}
                    <th>
                      <label htmlFor="amount" className="form-lable p-2">
                        <h5>Số Lượng</h5>
                      </label>
                    </th>

                    {/* chưa chỉnh đơn vị từ input thành dropdown */}
                    <th>
                      <label htmlFor="units" className="form-lable p-2">
                        <h5>Đơn Vị</h5>
                      </label>
                    </th>

                    {/* chưa chỉnh nhà sản xuất từ input thành dropdown */}
                    <th>
                      <label htmlFor="idproducers" className="form-lable p-2">
                        <h5>Nhà Sản Xuất</h5>
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listPkg?.items &&
                    listPkg?.items.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{listPkg.idpackage}</td>
                            <td>{listPkg.idcontainer}</td>
                            <td>{index + 1}</td>
                            <td>{item.tensanpham}</td>
                            <td>{item.soluong}</td>
                            <td>{item.nhasanxuat}</td>
                            <td>{item.host}</td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h1>Tạo SP</h1>
          </div>
          <div className="col-xs-6 col-md-7">
            <label className="form-label">tensanpham</label>
            <input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-xs-6 col-md-7">
            <label className="form-label">Amount</label>
            <input
              id="amount"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-xs-6 col-md-7">
            <label className="form-label">nhasanxuat</label>
            <input
              id="units"
              name="nhasanxuat"
              value={formik.values.units}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit" className="abc">
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};

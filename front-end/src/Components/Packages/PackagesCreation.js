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
  const location = useLocation();
  const idContainer = location.pathname.split("/")[2];

  const onSubmit = async (values) => {
    const {
      iditeminpackage,
      idpackage,
      name,
      idcontainer,
      amount,
      units,
      idproducers,
    } = values;
    await axios
      .post("/api/iteminpackage/create", {
        iditeminpackage: iditeminpackage,
        idpackage: idpackage,
        name: name,
        idcontainer: idcontainer,
        amount: amount,
        units: units,
        idproducers: idproducers,
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      iditeminpackage: "",
      idpackage: "",
      name: "",
      idcontainer: idContainer,
      amount: "",
      units: "",
      idproducers: "",
    },
    onSubmit,
  });

  const handleAddContainer = () => {};
  const handleAddFormSubmit = () => {};
  return (
    <div>
      <form class="NameclassNamerow" onSubmit={handleAddFormSubmit}>
        <div>
          <h1>Create Package</h1>
        </div>
        <br />
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
        <div>
          <label htmlFor="phuongtien" className="form-lable p-2">
            <h5>Sản Phẩm</h5>
          </label>
          <table>
            <thead>
              <tr>
                {/* chưa chỉnh mã sản phẩm từ input thành dropdown */}
                <th>STT</th>
                <th>
                  <label htmlFor="iditeminpackage" className="form-lable p-2">
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
                <th>
                  <Button variant="primary" onClick={handleShow}>
                    Thêm Sản Phẩm
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <form onSubmit={formik.handleSubmit}>
                      <div>
                        <h1>Tạo Đối Tác</h1>
                      </div>
                      <br />
                      <div className="col-xs-6 col-md-7">
                        <label className="form-label">ID Item</label>
                        <input
                          id="iditeminpackage"
                          name="iditeminpackage"
                          value={formik.values.iditeminpackage}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="col-xs-6 col-md-7">
                        <label className="form-label">ID Package</label>
                        <input
                          id="idpackage"
                          name="idpackage"
                          value={formik.values.idpackage}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="col-xs-6 col-md-7">
                        <label className="form-label">Name Item</label>
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
                        <label className="form-label">Units </label>
                        <input
                          id="units"
                          name="units"
                          value={formik.values.units}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="col-xs-6 col-md-7">
                        <label className="form-label">ID Producers</label>
                        <input
                          id="idproducers"
                          name="idproducers"
                          value={formik.values.idproducers}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <br />
                      <button typeNameclassName="submit" className="abc">
                        Create
                      </button>
                    </form>
                  </Modal>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

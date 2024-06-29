import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Breadcrumbs, Button, FormControlLabel, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ALL_CLIENTS, CLIENT_UPDATE, DELETE_USER } from "../../Const/ApiConst";
import { instance } from "../../Const/ApiHeader";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as yup from "yup";

function Clients() {
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Product Name must be at least 3 characters")
      .max(50, "Product Name can be at most 50 characters")
      .matches(/^[a-zA-Z ]+$/, "Enter characters only"),
    contactNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Enter 10-digit number")
      .required("Contact number is required"),
    email: yup
      .string()
      .email("Enter a valid email") // Use Yup's built-in email validation
      .required("Email address is required"),
  });
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchKey, setSearchKey] = useState("");
  const [userId, setUserId] = useState();

  const navigate = useNavigate();
  const [editClint, setEditClint] = useState();

  // HANDLE EDIT CLIENT
  const handleEditClient = (client) => {
    setUserId(client._id);
    handleShow();
    formik.setValues({
      name: client.fullName,
      contactNo: client.contact_no,
      email: client.email,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNo: 0,
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const contactnoAsNumber = parseInt(values.contactNo, 10);
      instance
        .post(CLIENT_UPDATE, {
          ...values,
          contactNo: contactnoAsNumber,
          id: userId,
        })
        .then((response) => {
          setUserData(response.data.data);
          handleClose();
        });
    },
  });
  const loadData = async (page) => {
    setLoading(true);
    const data = {
      page: page,
      per_page: perPage,
      searchKey: searchKey,
    };
    instance
      .post(ALL_CLIENTS, data)
      .then((response) => {
        setUserData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handlePageChange = (page) => {
    loadData(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const data = {
      page: page,
      per_page: newPerPage,
      searchKey: searchKey,
    };
    const response = await instance.post(ALL_CLIENTS, data);

    setUserData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const searchAction = async (e) => {
    setLoading(true);
    setSearchKey(e.target.value);
    const data = {
      searchKey: e.target.value,
    };
    const response = await instance.post(ALL_CLIENTS, data);

    setUserData(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData(1); // fetch page 1 of users
    // eslint-disable-next-line
  }, []);

  // modelbox
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editClintData = (userId) => {
    handleShow();
    setEditClint(userId);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <Tooltip title={row.fullName}>
          <span>{row.fullName}</span>
        </Tooltip>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <Tooltip title={row.email}>
          <span>{row.email}</span>
        </Tooltip>
      ),
      sortable: true,
    },

    {
      name: "Contact No",
      selector: (row) => (
        <Tooltip title={row.contact_no}>
          <span>{row.contact_no}</span>
        </Tooltip>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            size="sm"
            onClick={() => navigate(`/view-client/${row.user_id}`)}
          >
            View
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleEditClient(row);
            }}
          >
            Edit
          </Button>
          <Button
            // variant="contained"
            size="small"
            style={{ backgroundColor: "red", color: "White" }}
            onClick={() => {
              setDeleteModalShow(true);
              setDeleteUserData(row);
            }}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];

  const [deletemodalShow, setDeleteModalShow] = React.useState(false);
  const [deleteUserData, setDeleteUserData] = useState([]);

  function DeleteModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete User?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure, want to delete <b>{deleteUserData.fullName}</b>?{" "}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>No</Button>
          <Button
            onClick={() => {
              const data = {
                id: deleteUserData._id,
              };
              instance.post(DELETE_USER, data).then((result) => {
                loadData(1);
                setDeleteModalShow(false);
              });
            }}
            variant="contained"
            color="error"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          to="/"
          className="breadcrumpItem"
        >
          Home
        </Link>
        <Link color="text.primary" className="breadcrumpItem">
          Users
        </Link>
      </Breadcrumbs>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <strong>Users</strong>
        {/* <div>
          <Link to="/Add_User">
            <Button variant="contained">Add User</Button>
          </Link>
        </div> */}
      </div>
      <div className="mb-2 mt-2 col-3">
        <Form.Control
          type="search"
          placeholder="Search Client..."
          onChange={(e) => searchAction(e)}
        />
      </div>
      <DataTable
        responsive={true}
        columns={columns}
        data={userData}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
      <Modal
        centered
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Client Details Update</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={() => formik.setFieldTouched("name", true)}
                  />
                  <div className="error text-danger">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    id="contactNo"
                    name="contactNo"
                    label="Contact Number"
                    fullWidth
                    value={formik.values.contactNo}
                    onChange={formik.handleChange}
                    onBlur={() => formik.setFieldTouched("contactNo", true)}
                  />
                  <div className="error text-danger">
                    {formik.touched.contactNo && formik.errors.contactNo}
                  </div>
                </div>
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={() => formik.setFieldTouched("email", true)}
                  />
                  <div className="error text-danger">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
              </Box>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <DeleteModal
        show={deletemodalShow}
        onHide={() => setDeleteModalShow(false)}
      />
    </div>
  );
}

export default Clients;

import { Button, Input, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ALL_PACKAGE_SLICE_ITEM } from "../../store/Packages/PackageSlice";
import { useSelector } from "react-redux";
import moment from "moment";

function PackagesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { packageList, isLoading } = useSelector((state) => state?.packages);

  useEffect(() => {
    dispatch(ALL_PACKAGE_SLICE_ITEM());
  }, []);

  const columns = [
    {
      title: "NAME",
      dataIndex: "PackageName",
    },
    { title: "TOUR LENGTH", dataIndex: "TourLength" },
    { title: "TOTAL PERSON", dataIndex: "TotalPerson" },
    { title: "STATUS", dataIndex: "selectedStatus" },
    {
      title: "CREATED",
      render: (value) => (
        <div>{moment(value.created_at).format("MM/DD/YYYY")}</div>
      ),
    },
    { title: "ACTION" },
  ];
  return (
    <div>
      <div className="d-flex justify-content-between gap-2 mb-4">
        <div>
          <Input.Search placeholder="Search..." />
        </div>
        <Button onClick={() => navigate("add_package")}>Add Package</Button>
      </div>
      <div>
        <Table columns={columns} dataSource={packageList} />
      </div>
    </div>
  );
}

export default PackagesPage;

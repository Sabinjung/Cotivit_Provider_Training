import React, { useState } from "react";
import { Table, Input, Row, Col, Select } from "antd";
import { AggregatedData, StateList, SpecialitiesList } from "../data";
import styled from "@emotion/styled";

const { Option } = Select;

const StyledText = styled.span`
  font-size: 17px;
  margin-right: 5px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 10px;
`;
const StyledSpan = styled.span`
  font-weight: 600;
`;

const StyledTable = styled(Table)`
  table {
    border-spacing: 0 10px !important;
  }
  .ant-table-thead {
    background: #e6eefb;
  }
  .ant-table-thead > tr > th {
    border: none;
    background: none;
    padding: 10px 16px;
    font-weight: 600;
  }
  .ant-table-tbody > tr > td {
    border: none;
    padding: 12px 16px;
  }
  .ant-table-row {
    border-radius: 10px !important;
    box-shadow: 1px 1px 10px #1c3faa1a !important;
  }
  .ant-pagination-item,
  .ant-pagination-item-link {
    border-radius: 50% !important;
  }
  .ant-pagination-item-active {
    border: none;
    background: #2680eb;
    a {
      color: white !important;
    }
  }
`;
const columns = [
  {
    title: "NPI",
    dataIndex: "Provider_NPI",
    key: "Provider_NPI",
  },
  {
    title: "Speciality",
    dataIndex: "Provider_Speciality",
    key: "Provider_Speciality",
  },
  {
    title: "FirstName",
    dataIndex: "Provider_First_Name",
    key: "Provider_First_Name",
  },
  {
    title: "State",
    dataIndex: "Provider_State_Name",
    key: "Provider_State_Name",
  },
  {
    title: "Zip",
    dataIndex: "Provider_Zip",
    key: "Provider_Zip",
  },
  {
    title: "AffiliatedHospital",
    dataIndex: "Hospital_Affiliation",
    key: "Hospital_Affiliation",
  },
  {
    title: "Affiliations",
    dataIndex: "Total_Hospital_Affiliations",
    key: "Total_Hospital_Affiliations",
    sorter: (a, b) =>
      a.Total_Hospital_Affiliations - b.Total_Hospital_Affiliations,
  },
  {
    title: "Beds",
    dataIndex: "Total_Beds_in_Affiliated_Hospital",
    key: "Total_Beds_in_Affiliated_Hospital",
    sorter: (a, b) =>
      a.Total_Beds_in_Affiliated_Hospital - b.Total_Beds_in_Affiliated_Hospital,
  },
  {
    title: "Retention",
    dataIndex: "Patient_Retention",
    key: "Patient_Retention",
    sorter: (a, b) =>
      a.Patient_Retention - b.Patient_Retention,
  },
  {
    title: "PaperCitings",
    dataIndex: "Research_Paper_Citings",
    key: "Research_Paper_Citings",
    sorter: (a, b) => a.Research_Paper_Citings - b.Research_Paper_Citings,
  },
  {
    title: "Published",
    dataIndex: "Total_research_paper_Published",
    key: "Total_research_paper_Published",
    sorter: (a, b) =>
      a.Total_research_paper_Published - b.Total_research_paper_Published,
  },
  {
    title: "Score",
    dataIndex: "Weighted_score",
    key: "Weighted_score",
    sorter: (a, b) => a.Weighted_score - b.Weighted_score,
    render: (text) => <StyledSpan>{text}</StyledSpan>,
    defaultSortOrder: "descend",
  },
];

const DataTable = ({ setIsInDataTable, setGraphData }) => {
  const [item, setItem] = useState(AggregatedData);
  const [speciality, setSpeciality] = useState("");
  const [provState, setProvState] = useState("");
  const [zip, setZip] = useState("");

  const handleChange = (value) => {
    let val = value ? value : "";
    setSpeciality(val);
    let filteredData = AggregatedData.filter((item) =>
      item.Provider_Speciality.toLowerCase().includes(
        value ? value.toLowerCase() : ""
      )
    )
      .filter((item) =>
        item.Provider_State_Name.toLowerCase().includes(provState.toLowerCase())
      )
      .filter((item) => item.Provider_Zip.toString().includes(zip));
    setItem(filteredData);
  };

  const handleStateChange = (value) => {
    let val = value ? value : "";
    setProvState(val);
    let filteredData = AggregatedData.filter((item) =>
      item.Provider_State_Name.toLowerCase().includes(
        value ? value.toLowerCase() : ""
      )
    )
      .filter((item) =>
        item.Provider_Speciality.toLowerCase().includes(
          speciality.toLowerCase()
        )
      )
      .filter((item) => item.Provider_Zip.toString().includes(zip));
    setItem(filteredData);
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
    let filteredData = AggregatedData.filter((item) =>
      item.Provider_Zip.toString().includes(e.target.value)
    )
      .filter((item) =>
        item.Provider_Speciality.toLowerCase().includes(
          speciality.toLowerCase()
        )
      )
      .filter((item) =>
        item.Provider_State_Name.toLowerCase().includes(provState.toLowerCase())
      );
    setItem(filteredData);
  };

  return (
    <>
      <StyledRow align="middle">
        <Col span={5}>
          <StyledText>Speciality:</StyledText>
          <Select
            showSearch
            allowClear
            style={{ width: 160 }}
            onSelect={handleChange}
            onClear={handleChange}
          >
            {SpecialitiesList.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={5}>
          <StyledText>State:</StyledText>
          <Select
            showSearch
            allowClear
            style={{ width: 160 }}
            onSelect={handleStateChange}
            onClear={handleStateChange}
          >
            {StateList.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <StyledText>Zip:</StyledText>
          <Input
            style={{ width: 110 }}
            allowClear
            value={zip}
            onChange={handleZipChange}
          />
        </Col>
      </StyledRow>

      <StyledTable
        columns={columns}
        size="large"
        dataSource={item}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              setIsInDataTable(false);
              setGraphData(record);
            },
          };
        }}
      />
    </>
  );
};

export default DataTable;

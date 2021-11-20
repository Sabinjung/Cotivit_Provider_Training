import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import { BarChartOutlined, LineChartOutlined, PieChartOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import SimpleLine from "./SimpleLine";
import SimpleBar from "./SimpleBar";
import SimplePieChart from "./SimplePieChart";

const StyledButton = styled(Button)`
  margin-bottom: 30px;
`;

const StyledSpan = styled.span`
  font-weight: 600;
`;
const StyledRow = styled(Row)`
  margin-top: 25px;
  font-size: 16px;
`;

const ContentRow = styled(Row)`
  margin-bottom: 30px;
  font-size: 21px;
`;

const IconRow = styled(Row)`
  margin-bottom: 0px;
`;

const IconCol = styled(Col)`
  border-right: 2px solid #000;
`;

const Visualize = ({ setIsInDataTable, graphData }) => {
  const visuals = ["line", "bar", "pie"];
  const [visual, setVisual] = useState(visuals[0]);

  const formatdata = (val) => {
    let formatedData = [];
    let data = Object.keys(graphData).filter(
      (item) => item.includes(val) && !item.includes(val + "_growth") && !item.includes(val + "_Retention")
    );
    data.map((item) => {
      formatedData = [
        ...formatedData,
        {
          name: item.replace(val + "_", ""),
          value: parseFloat(graphData[item]),
        },
      ];
    });
    return formatedData;
  };

  let formatedClaimData = formatdata("Claim");
  let formatedPatientData = formatdata("Patient");

  const drawChart = (data, growth1, growth2, avg) => (
    <>
      {visual === visuals[0] ? (
        <SimpleLine data={data} />
      ) : visual === visuals[1] ? (
        <SimpleBar data={data} />
      ) : (
        <SimplePieChart data={data} />
      )}
      <StyledRow type="flex" justify="space-between">
        <Col>
          Growth From 2018-2019 :<StyledSpan>{growth1}</StyledSpan>
        </Col>
        <Col>
          Growth From 2019-2020 :<StyledSpan>{growth2}</StyledSpan>
        </Col>
        <Col>
          Avg Growth :<StyledSpan>{avg}</StyledSpan>
        </Col>
      </StyledRow>
    </>
  );

  return (
    <>
      <StyledButton type="primary" onClick={() => setIsInDataTable(true)}>
        Go Back
      </StyledButton>
      <ContentRow>
        <Col span={6}>
          {"NPI : "}
          <StyledSpan>{graphData.Provider_NPI}</StyledSpan>
        </Col>
        <Col span={6}>
          {"FullName: "}
          <StyledSpan>
            {graphData.Provider_First_Name + " " + graphData.Provider_Last_Name}
          </StyledSpan>
        </Col>
        <Col span={6}>
          {"Number: "}
          <StyledSpan>{graphData.Provider_Number}</StyledSpan>
        </Col>
        <Col span={6}>
          {"Speciality: "}
          <StyledSpan>{graphData.Provider_Speciality}</StyledSpan>
        </Col>
      </ContentRow>
      <IconRow type="flex" justify="center" align="middle">
        <IconCol span={1}>
          <LineChartOutlined
            style={{ fontSize: "30px", cursor: "pointer", color: "#40a9ff" }}
            onClick={() => setVisual(visuals[0])}
          />
        </IconCol>
        <IconCol span={1}>
          <BarChartOutlined
            style={{ fontSize: "30px", cursor: "pointer", color: "#40a9ff" }}
            onClick={() => setVisual(visuals[1])}
          />
        </IconCol>
        <Col span={1}>
          <PieChartOutlined
            style={{ fontSize: "30px", cursor: "pointer", color: "#40a9ff" }}
            onClick={() => setVisual(visuals[2])}
          />
        </Col>
      </IconRow>
      <Row type="flex" justify="space-between" align="middle">
        <Col>
          <h1>Claims</h1>
          {drawChart(
            formatedClaimData,
            graphData.Claim_growth_18_19,
            graphData.Claim_growth_19_20,
            graphData.Avg_claim_growth
          )}
        </Col>
        <Col>
          <h1>Patient</h1>
          {drawChart(
            formatedPatientData,
            graphData.Patient_growth_18_19,
            graphData.Patient_growth_19_20,
            graphData.Avg_Patient_growth
          )}
        </Col>
      </Row>
    </>
  );
};

export default Visualize;

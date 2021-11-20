import React, { useState } from 'react';
import { Card } from 'antd';
import styled from '@emotion/styled';
import DataTable from './DataTable';
import Visualize from './Visualize'; 


const Wrapper = styled.div`
  background: #e6eefb;
  width: 100%;
  height: 100vh;
  padding: 30px;
`

const Container = styled.div`
    margin: 0 auto;
    text-align: center;
`
const StyledCard = styled(Card)`
    border-radius: 10px;
    height: 90vh;
    overflow-x: scroll;
`


const Landing = () => {
    const [isInDataTable, setIsInDataTable] = useState(true);
    const [graphData, setGraphData] = useState();

    return (
        <Wrapper>
            <Container>
                <StyledCard>
                    <h1 style={{fontWeight: 600, marginBottom: "20px"}}>Cotiviti Provider Targeting</h1>
                    {isInDataTable ?
                        <DataTable setIsInDataTable={setIsInDataTable} setGraphData={setGraphData}/> :
                        <Visualize graphData={graphData} setIsInDataTable={setIsInDataTable}/>
                    }
                </StyledCard>
            </Container>
        </Wrapper>
    );
}

export default Landing;

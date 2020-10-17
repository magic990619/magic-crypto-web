import React from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import TopCards from './components/TopCards'
import styled from 'styled-components'

import Charts from './components/Charts'

const Dashboard: React.FC = () => {
  return (
    <Page>
      <PageHeader icon="📊" subtitle="Overview of the YAM ecosystem" title="YAM Dashboard" />
      <Container size="lg">
        <TopCards />
        <Spacer />
        <Charts />
      </Container>
    </Page>
  );
};

const StyledCharts = styled.div`
  padding: 0px;
`;

export default Dashboard;

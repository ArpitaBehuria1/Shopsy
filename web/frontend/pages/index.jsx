import React, { useState } from "react";
import {
  Card,
  DataTable,
  Page,
  Layout,
  TextContainer,
  DatePicker,
  Select,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data for the scorecards
const scorecardData1 = {
  score1: 95,
  score2: 90,
};

const scorecardData2 = {
  score1: 85,
  score2: 80,
};

// Sample data for the table
const initialRows = [
  ["Product 1", "$59.99", "In Stock"],
  ["Product 2", "$79.99", "Out of Stock"],
  ["Product 3", "$39.99", "In Stock"],
  ["Product 4", "$29.99", "Out of Stock"],
];

// Sample data for the chart
const chartData = [
  {name: 'Jan', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Feb', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Mar', uv: 2000, pv: 9800, amt: 2290},
];

export default function HomePage() {
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Mon Sep 01 2023 00:00:00 GMT-0400 (Eastern Daylight Time)'),
    end: new Date('Wed Sep 30 2023 00:00:00 GMT-0400 (Eastern Daylight Time)'),
  });

  const [statusFilter, setStatusFilter] = useState('All');
  const [rows, setRows] = useState(initialRows);

  const handleDateChange = (value) => {
    setSelectedDates(value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    if (value === 'All') {
      setRows(initialRows);
    } else {
      setRows(initialRows.filter(row => row[2] === value));
    }
  };

  return (
    <Page narrowWidth>
      <TitleBar title="Products" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer spacing="loose">
              <h2>
                Scorecard 1
              </h2>
              <p>
                Score 1: {scorecardData1.score1}
                <br />
                Score 2: {scorecardData1.score2}
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer spacing="loose">
              <h2>
                Scorecard 2
              </h2>
              <p>
                Score 1: {scorecardData2.score1}
                <br />
                Score 2: {scorecardData2.score2}
              </p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <DatePicker
              month={selectedDates.start.getMonth()}
              year={selectedDates.start.getFullYear()}
              onChange={handleDateChange}
              onMonthChange={(month, year) => {}}
              selected={selectedDates}
            />
            <Select
              label="Product Status Filter"
              options={['All', 'In Stock', 'Out of Stock']}
              onChange={handleStatusFilterChange}
              value={statusFilter}
            />
            <DataTable
              columnContentTypes={[
                'text',
                'numeric',
                'text',
              ]}
              headings={[
                'Product',
                'Price',
                'Status',
              ]}
              rows={rows}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
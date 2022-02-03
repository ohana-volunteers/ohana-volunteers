import React from 'react';
import { Container, Table, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders a table containing all of the Hours documents. Use <HoursItem> to render each row. */
const ListHours = () => (
  <Container id={PAGE_IDS.LIST_HOURS}>
    <Header as="h2" textAlign="center">Tracked Hours</Header>
    <Table celled>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell>Event ID</Table.HeaderCell>
          <Table.HeaderCell>Organization</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Hours</Table.HeaderCell>
          <Table.HeaderCell>Verified On</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      </Table.Body>
    </Table>
  </Container>
);

export default ListHours;

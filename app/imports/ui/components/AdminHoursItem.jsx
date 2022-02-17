import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Hours table. See pages/ListHoursAdmin.jsx. */
const AdminHoursItem = ({ Hours }) => (
  <Table.Row>
    <Table.Cell>{Hours.eventID}</Table.Cell>
    <Table.Cell>{Hours.organizationID}</Table.Cell>
    <Table.Cell>{Hours.date}</Table.Cell>
    <Table.Cell>{Hours.hours}</Table.Cell>
    <Table.Cell>{Hours.verifiedOn}</Table.Cell>
  </Table.Row>
);

// Require a document to be passed to this component.
AdminHoursItem.propTypes = {
  Hours: PropTypes.shape({
    eventID: PropTypes.string,
    organizationID: PropTypes.string,
    date: PropTypes.string,
    hours: PropTypes.number,
    verifiedOn: PropTypes.string,
    isVerified: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminHoursItem;

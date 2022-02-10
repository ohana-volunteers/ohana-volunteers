import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Hours table. See pages/ListHours.jsx. */
const HoursItem = ({ Hours }) => (
  <Table.Row>
    <Table.Cell>{Hours.eventID}</Table.Cell>
    <Table.Cell>{Hours.organization}</Table.Cell>
    <Table.Cell>{Hours.date}</Table.Cell>
    <Table.Cell>{Hours.hours}</Table.Cell>
    <Table.Cell>{Hours.verifiedOn}</Table.Cell>
    <Table.Cell>
      <Link className={COMPONENT_IDS.LIST_HOURS_EDIT} to={`/edit/${Hours._id}`}>Edit</Link>
    </Table.Cell>
  </Table.Row>
);

// Require a document to be passed to this component.
HoursItem.propTypes = {
  Hours: PropTypes.shape({
    eventID: PropTypes.string,
    organization: PropTypes.string,
    date: PropTypes.string,
    hours: PropTypes.number,
    verifiedOn: PropTypes.string,
    isVerified: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(HoursItem);

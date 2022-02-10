import React from 'react';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Hours } from '../../api/hours/HoursCollection';
import HoursItem from '../components/HoursItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListHours = ({ ready, hours }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_HOURS}>
    <Header as="h2" textAlign="center">List Hours</Header>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>event-ID</Table.HeaderCell>
          <Table.HeaderCell>Organization</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Hours</Table.HeaderCell>
          <Table.HeaderCell>Verified On</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {hours.map((hour) => <HoursItem key={hours._id} hour={hour} />)}
      </Table.Body>
    </Table>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
ListHours.propTypes = {
  hours: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Hours documents.
  const subscription = Hours.subscribeHours();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Hours documents and sort them by name.
  const hours = Hours.find({}, { sort: { name: 1 } }).fetch();
  return {
    hours,
    ready,
  };
})(ListHours);

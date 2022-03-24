import React from 'react';
import { Loader, Header, Container, Tab, Card, Grid, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
// import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import UploadFixture from '../components/UploadFixture';
import DumpDbFixture from '../components/DumpDbFixture';
import OpportunitiesAdmin from '../components/OpportunitiesAdmin';
import AdminViewVolunteers from '../components/AdminViewVolunteers';
import AdminViewOrganizations from '../components/AdminViewOrganizations';

/** Renders the admin home page where information can be viewed and modified. */

const AdminHome = ({ readyVolunteers, readyOrganizations, allVolunteers, allOrganizations }) => {

  const panes = [
    // eslint-disable-next-line react/display-name
    { menuItem: 'Volunteers', render: () => <Tab.Pane>
      <Grid container>
        <Grid.Row centered>
          <Header as='h1'>Manage Volunteers</Header>
        </Grid.Row>
        <Divider/>
        <Grid.Row>
          <Card.Group centered>
            {allVolunteers.map((volunteer) => <AdminViewVolunteers key={volunteer._id} doc={volunteer}/>)}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Organizations', render: () => <Tab.Pane>
      <Grid container>
        <Grid.Row centered>
          <Header as='h1'>Manage Organizations</Header>
        </Grid.Row>
        <Divider/>
        <Grid.Row>
          <Card.Group centered>
            {allOrganizations.map((organization) => <AdminViewOrganizations key={organization._id} doc={organization}/>)}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Opportunities', render: () => <Tab.Pane>
      <OpportunitiesAdmin/>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Upload/Dump Fixture', render: () => <Tab.Pane>
      <UploadFixture/>
      <DumpDbFixture/>
    </Tab.Pane> },

  ];

  return (readyVolunteers && readyOrganizations) ? (
    <Container id={PAGE_IDS.ADMIN_HOME}>
      <Tab panes={panes}/>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

AdminHome.propTypes = {
  readyVolunteers: PropTypes.bool.isRequired,
  readyOrganizations: PropTypes.bool.isRequired,
  allVolunteers: PropTypes.array.isRequired,
  allOrganizations: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscriptionVolunteers = VolunteerProfiles.subscribe();
  const readyVolunteers = subscriptionVolunteers.ready();
  const allVolunteers = VolunteerProfiles.find({}).fetch();
  const subscriptionOrganizations = Organizations.subscribeAdmin();
  const readyOrganizations = subscriptionOrganizations.ready();
  const allOrganizations = Organizations.find({}).fetch();
  // const subscriptionOpportunities = Opportunities.subscribeOpportunityAdmin();
  // const readyOpportunities = subscriptionOpportunities.ready();
  // const activeOpps = Opportunities.find({ 'date.end': { $gte: toDate } }).fetch();
  // const expiredOpps = Opportunities.find({ 'date.end': { $lt: toDate } }).fetch();

  return {
    readyVolunteers,
    readyOrganizations,
    allVolunteers,
    allOrganizations,
  };
})(AdminHome);

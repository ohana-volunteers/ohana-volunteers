import React from 'react';
import { Loader, Container, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
// import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import UploadFixture from '../components/UploadFixture';
import DumpDbFixture from '../components/DumpDbFixture';
import OpportunitiesAdmin from '../components/OpportunitiesAdmin';

/** Renders the admin home page where information can be viewed and modified. */

const AdminHome = ({ readyVolunteers, readyOrganizations }) => {

  const panes = [
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
};

export default withTracker(() => {
  const subscriptionVolunteers = VolunteerProfiles.subscribe();
  const readyVolunteers = subscriptionVolunteers.ready();
  const subscriptionOrganizations = Organizations.subscribeAdmin();
  const readyOrganizations = subscriptionOrganizations.ready();
  // const subscriptionOpportunities = Opportunities.subscribeOpportunityAdmin();
  // const readyOpportunities = subscriptionOpportunities.ready();
  // const activeOpps = Opportunities.find({ 'date.end': { $gte: toDate } }).fetch();
  // const expiredOpps = Opportunities.find({ 'date.end': { $lt: toDate } }).fetch();

  return {
    readyVolunteers,
    readyOrganizations,
  };
})(AdminHome);

import React from 'react';
import { Loader, Container, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
import UploadFixture from '../components/UploadFixture';
import DumpDbFixture from '../components/DumpDbFixture';
// import OpportunitiesAdmin from '../components/OpportunitiesAdmin';
import AdminHomeVolunteers from '../components/AdminHomeVolunteers';
import AdminHomeOrganizations from '../components/AdminHomeOrganizations';
// import BrowseOpportunitiesAdmin from './BrowseOpportunitiesAdmin';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import AdminHomeOpportunities from '../components/AdminHomeOpportunities';

/** Renders the admin home page where information can be viewed and modified. */
const toDate = new Date();

const AdminHome = ({ ready, allVolunteers, allOrganizations, expiredOpps, activeOpps, notVerifiedOpps, currentUser }) => {

  const panes = [
    // eslint-disable-next-line react/display-name
    { menuItem: 'Volunteers', render: () => <Tab.Pane>
      <AdminHomeVolunteers allVolunteers={allVolunteers}/>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Organizations', render: () => <Tab.Pane>
      <AdminHomeOrganizations allOrganizations={allOrganizations}/>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Opportunities', render: () => <Tab.Pane>
      <AdminHomeOpportunities expiredOpps={expiredOpps} activeOpps={activeOpps} notVerifiedOpps={notVerifiedOpps} currentUser={currentUser}/>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Upload/Dump Fixture', render: () => <Tab.Pane>
      <UploadFixture/>
      <DumpDbFixture/>
    </Tab.Pane> },

  ];

  return (ready) ? (
    <Container id={PAGE_IDS.ADMIN_HOME}>
      <Tab panes={panes}/>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

AdminHome.propTypes = {
  allVolunteers: PropTypes.array.isRequired,
  allOrganizations: PropTypes.array.isRequired,
  expiredOpps: PropTypes.array.isRequired,
  activeOpps: PropTypes.array.isRequired,
  notVerifiedOpps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

export default withTracker(() => {
  const subscriptionVolunteers = VolunteerProfiles.subscribe();
  const allVolunteers = VolunteerProfiles.find({}).fetch();
  const subscriptionOrganizations = Organizations.subscribeAdmin();
  const allOrganizations = Organizations.find({}).fetch();
  const subscriptionOpportunities = Opportunities.subscribeOpportunityAdmin();
  const expiredOpps = Opportunities.find({ isVerified: true }, { 'date.end': { $lt: toDate } }).fetch();
  const activeOpps = Opportunities.find({ isVerified: true }, { 'date.end': { $gte: toDate } }).fetch();
  const notVerifiedOpps = Opportunities.find({ isVerified: false }).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const ready = subscriptionVolunteers.ready() && subscriptionOrganizations.ready() && subscriptionOpportunities.ready();
  return {
    allVolunteers,
    allOrganizations,
    expiredOpps,
    activeOpps,
    notVerifiedOpps,
    ready,
    currentUser,
  };
})(AdminHome);

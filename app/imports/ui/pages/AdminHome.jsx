import React from 'react';
import { Loader, Container, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
import UploadFixture from '../components/UploadFixture';
import DumpDbFixture from '../components/DumpDbFixture';
// import OpportunitiesAdmin from '../components/OpportunitiesAdmin';
import AdminHomeVolunteers from '../components/AdminHomeVolunteers';
import AdminHomeOrganizations from '../components/AdminHomeOrganizations';
import BrowseOpportunitiesAdmin from './BrowseOpportunitiesAdmin';

/** Renders the admin home page where information can be viewed and modified. */

const AdminHome = ({ readyVolunteers, readyOrganizations, allVolunteers, allOrganizations }) => {

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
      <BrowseOpportunitiesAdmin/>
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

  return {
    readyVolunteers,
    readyOrganizations,
    allVolunteers,
    allOrganizations,
  };
})(AdminHome);

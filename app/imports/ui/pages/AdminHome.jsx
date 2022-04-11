import React, { useState } from 'react';
import { Loader, Header, Container, Tab, Card, Grid, Divider, Dropdown, Input } from 'semantic-ui-react';
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
import BrowseOpportunitiesAdmin from './BrowseOpportunitiesAdmin';

/** Renders the admin home page where information can be viewed and modified. */

const AdminHome = ({ readyVolunteers, readyOrganizations, allVolunteers, allOrganizations }) => {

  const [volunteerSearch, setVSearch] = useState('');
  const [orgSearch, setOrgSearch] = useState('');

  const searchResultVolunteer = allVolunteers.filter((val) => {
    if (volunteerSearch === '') {
      return val;
    }
    return val.firstName.toLowerCase().includes(volunteerSearch);
  });

  const searchResultOrg = allOrganizations.filter((val) => {
    if (orgSearch === '') {
      return val;
    }
    return val.name.toLowerCase().includes(orgSearch);
  });

  const panes = [
    // eslint-disable-next-line react/display-name
    { menuItem: 'Volunteers', render: () => <Tab.Pane>
      <Grid container>
        <Grid.Row centered>
          <Header as='h1'>Manage Volunteers</Header>
        </Grid.Row>
        <Divider/>
        <Grid.Row columns={2}>
          <Grid.Column width={14}>
            <Input
              icon='search'
              placeholder="Search Volunteers"
              onChange={(e) => setVSearch(e.target.value)}/>
          </Grid.Column>
          <Grid.Column width={2}>
            <Dropdown
              text='Sort By'
              icon='angle down'
              floating
              className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item icon='calendar outline' text='A-Z' value='A-Z'/>
                <Dropdown.Item icon='sort alphabet down' text='Latest' value='Latest'/>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Card.Group centered>
            {searchResultVolunteer.map((volunteer) => <AdminViewVolunteers key={volunteer._id} doc={volunteer}/>)}
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
        <Grid.Row columns={2}>
          <Grid.Column width={14}>
            <Input
              icon='search'
              placeholder="Search Organizations"
              onChange={(e) => setOrgSearch(e.target.value)}/>
          </Grid.Column>
          <Grid.Column width={2}>
            <Dropdown
              text='Sort By'
              icon='angle down'
              floating
              className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item icon='calendar outline' text='A-Z' value='A-Z'/>
                <Dropdown.Item icon='sort alphabet down' text='Latest' value='Latest'/>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Card.Group centered>
            {searchResultOrg.map((organization) => <AdminViewOrganizations key={organization._id} doc={organization}/>)}
          </Card.Group>
        </Grid.Row>
      </Grid>
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

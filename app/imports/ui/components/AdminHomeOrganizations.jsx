import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Dropdown, Grid, Header, Input } from 'semantic-ui-react';
import AdminViewOrganizations from './AdminViewOrganizations';

/** The organization tab for the admin home. */
const AdminHomeOrganizations = ({ allOrganizations }) => {
  const [orgSearch, setOrgSearch] = useState('');

  const searchResultOrg = allOrganizations.filter((val) => {
    if (orgSearch === '') {
      return val;
    }
    return val.name.toLowerCase().includes(orgSearch);
  });
  return (
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
              <Dropdown.Item icon='sort alphabet down' text='Sign-Up Date' value='Sign-Up Date'/>
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
  );
};

AdminHomeOrganizations.propTypes = {
  allOrganizations: PropTypes.array.isRequired,
  orgSearch: PropTypes.string,
  setOrgSearch: PropTypes.func,

};

export default AdminHomeOrganizations;

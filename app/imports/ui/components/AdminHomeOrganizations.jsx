import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Dropdown, Grid, Header, Input } from 'semantic-ui-react';
import AdminViewOrganizations from './AdminViewOrganizations';

/** The organization tab for the admin home. */
const AdminHomeOrganizations = ({ allOrganizations }) => {
  const [orgSearch, setOrgSearch] = useState('');
  const [orgSort, setOrgSort] = useState('A-Z');

  const handleSelect = (e, { value }) => {
    setOrgSort(value);
  };

  const searchOrg = allOrganizations.filter((val) => {
    if (orgSearch === '') {
      return val;
    }
    return val.name.toLowerCase().includes(orgSearch);
  });

  const resultOrganizations = orgSort === 'A-Z' ? searchOrg.sort((a, b) => a.name.localeCompare(b.name)) : searchOrg;
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
              <Dropdown.Item icon='calendar outline' text='A-Z' value='A-Z' onClick={handleSelect}/>
              <Dropdown.Item icon='sort alphabet down' text='Sign-Up Date' value='Sign-Up Date' onClick={handleSelect}/>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Card.Group centered>
          {resultOrganizations.map((organization) => <AdminViewOrganizations key={organization._id} doc={organization}/>)}
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

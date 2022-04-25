import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Dropdown, Grid, Header, Input } from 'semantic-ui-react';
import AdminViewOrganizations from './AdminViewOrganizations';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The organization tab for the admin home. */
const AdminHomeOrganizations = ({ allOrganizations }) => {
  const [orgSearch, setOrgSearch] = useState('');
  const [orgSort, setOrgSort] = useState('A-Z');

  const handleSelect = (e, { value }) => {
    setOrgSort(value);
  };

  // Filter organizations based on search results
  const searchOrg = allOrganizations.filter((val) => {
    if (orgSearch === '') {
      return val;
    }
    return val.name.toLowerCase().includes(orgSearch.toLowerCase());
  });

  // Sort organizations alphabetically, newest to oldest, or oldest to newest.
  let resultOrganizations;
  if (orgSort === 'A-Z') {
    resultOrganizations = searchOrg.sort((a, b) => a.name.localeCompare(b.name));
  } else if (orgSort === 'Newest Registered - Oldest Registered') {
    resultOrganizations = searchOrg.reverse();
  } else { // if (orgSort === 'Oldest Registered - Newest Registered')
    resultOrganizations = searchOrg;
  }
  return (
    <Grid container id={COMPONENT_IDS.ADMIN_HOME_ORGANIZATIONS}>
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
              <Dropdown.Item icon='sort alphabet down' text='Newest Registered - Oldest Registered' value='Newest Registered - Oldest Registered' onClick={handleSelect}/>
              <Dropdown.Item icon='sort alphabet up' text='Oldest Registered - Newest Registered' value='Oldest Registered - Newest Registered' onClick={handleSelect}/>
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

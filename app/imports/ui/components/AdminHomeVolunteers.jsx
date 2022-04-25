import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Dropdown, Grid, Header, Input } from 'semantic-ui-react';
import AdminViewVolunteers from './AdminViewVolunteers';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The volunteer tab for the admin home. */
const AdminHomeVolunteers = ({ allVolunteers }) => {
  const [volunteerSearch, setVSearch] = useState('');
  const [volunteerSort, setVSort] = useState('A-Z');

  const handleSelect = (e, { value }) => {
    setVSort(value);
  };

  // Filter volunteers based on search results
  const searchVolunteer = allVolunteers.filter((val) => {
    if (volunteerSearch === '') {
      return val;
    }
    return val.firstName.toLowerCase().includes(volunteerSearch);
  });

  // Sort volunteers alphabetically, newest to oldest, or oldest to newest.
  let resultVolunteers;
  if (volunteerSort === 'A-Z') {
    resultVolunteers = searchVolunteer.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (volunteerSort === 'Newest Registered - Oldest Registered') {
    resultVolunteers = searchVolunteer.reverse();
  } else { // if (volunteerSort === 'Oldest Registered - Newest Registered')
    resultVolunteers = searchVolunteer;
  }
  return (
    <Grid container id={COMPONENT_IDS.ADMIN_HOME_VOLUNTEERS}>
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
              <Dropdown.Item icon='calendar outline' text='A-Z' value='A-Z' onClick={handleSelect}/>
              <Dropdown.Item icon='sort alphabet down' text='Newest Registered - Oldest Registered' value='Newest Registered - Oldest Registered' onClick={handleSelect}/>
              <Dropdown.Item icon='sort alphabet up' text='Oldest Registered - Newest Registered' value='Oldest Registered - Newest Registered' onClick={handleSelect}/>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Card.Group centered>
          {resultVolunteers.map((volunteer) => <AdminViewVolunteers key={volunteer._id} doc={volunteer}/>)}
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
};

AdminHomeVolunteers.propTypes = {
  allVolunteers: PropTypes.array.isRequired,
  volunteerSearch: PropTypes.string,
  setVSearch: PropTypes.func,

};

export default AdminHomeVolunteers;

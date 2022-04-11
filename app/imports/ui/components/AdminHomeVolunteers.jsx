import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Dropdown, Grid, Header, Input } from 'semantic-ui-react';
import AdminViewVolunteers from './AdminViewVolunteers';

/** The volunteer tab for the admin home. */
const AdminHomeVolunteers = ({ allVolunteers }) => {
  const [volunteerSearch, setVSearch] = useState('');

  const searchResultVolunteer = allVolunteers.filter((val) => {
    if (volunteerSearch === '') {
      return val;
    }
    return val.firstName.toLowerCase().includes(volunteerSearch);
  });
  return (
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
              <Dropdown.Item icon='sort alphabet down' text='Sign-up Date' value='Sign-Up Date'/>
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
  );
};

AdminHomeVolunteers.propTypes = {
  allVolunteers: PropTypes.array.isRequired,
  volunteerSearch: PropTypes.string,
  setVSearch: PropTypes.func,

};

export default AdminHomeVolunteers;

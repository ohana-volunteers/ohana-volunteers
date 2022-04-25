import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Divider, Card, Segment, Icon, Button, Dropdown, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import OpportunityItem from '../components/OpportunityItem';

const headerStyle = { color: 'white', backgroundColor: '#2BCAF8', padding: 10 };
// const buttonStyle = { color: 'black', backgroundColor: 'white', borderRadius: 3, padding: 5, borderColor: 'blue' };

const AdminHomeOpportunities = ({ expiredOpps, activeOpps, notVerifiedOpps, currentUser }) => {
  const [oppSearch, setOppSearch] = useState('');
  const [order, setOrder] = useState('A-Z');

  const handleSelect = (e, { value }) => {
    setOrder(value);
  };
  const searchExpiredOpps = expiredOpps.filter((val) => {
    if (oppSearch === '') {
      return val;
    }
    return val.organization.toLowerCase().includes(oppSearch.toLowerCase());
  });

  const searchActiveOpps = activeOpps.filter((val) => {
    if (oppSearch === '') {
      return val;
    }
    return val.organization.toLowerCase().includes(oppSearch);
  });

  const searchNotVerifiedOpps = notVerifiedOpps.filter((val) => {
    if (oppSearch === '') {
      return val;
    }
    return val.organization.toLowerCase().includes(oppSearch);
  });

  let resultExpiredOpps;
  if (order === 'A-Z') {
    resultExpiredOpps = searchExpiredOpps.sort((a, b) => a.event.localeCompare(b.event));
  } else if (order === 'Latest - Oldest') {
    resultExpiredOpps = searchExpiredOpps.slice().sort((a, b) => b.date.start - a.date.start);
  } else { // if (order === 'Oldest to Newest)
    resultExpiredOpps = searchExpiredOpps.slice().sort((a, b) => b.date.start - a.date.start).reverse();
  }

  let resultActiveOpps;
  if (order === 'A-Z') {
    resultActiveOpps = searchActiveOpps.sort((a, b) => a.event.localeCompare(b.event));
  } else if (order === 'Latest - Oldest') {
    resultActiveOpps = searchActiveOpps.slice().sort((a, b) => b.date.start - a.date.start);
  } else { // if (order === 'Oldest to Newest)
    resultActiveOpps = searchActiveOpps.slice().sort((a, b) => b.date.start - a.date.start).reverse();
  }

  let resultNotVerifiedOpps;
  if (order === 'A-Z') {
    resultNotVerifiedOpps = searchNotVerifiedOpps.sort((a, b) => a.event.localeCompare(b.event));
  } else if (order === 'Latest - Oldest') {
    resultNotVerifiedOpps = searchNotVerifiedOpps.slice().sort((a, b) => b.date.start - a.date.start);
  } else { // if (order === 'Oldest to Newest)
    resultNotVerifiedOpps = searchNotVerifiedOpps.slice().sort((a, b) => b.date.start - a.date.start).reverse();
  }

  return (
    <Grid id={COMPONENT_IDS.ADMIN_HOME_OPPORTUNITIES} container centered>
      <Grid.Row centered>
        <Header as="h1" >Manage Opportunities</Header>
      </Grid.Row>
      <Divider/>
      <Grid.Row columns={2}>
        <Grid.Column width={14}>
          <Input
            fluid
            icon='search'
            placeholder="Search Opportunities (Active/Expired/Pending)"
            onChange={(e) => setOppSearch(e.target.value)}/>
        </Grid.Column>
        <Grid.Column width={2}>
          <Dropdown text='Sort By'
            icon='angle down'
            floating
            className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item icon='calendar outline' text='A-Z' value='A-Z' onClick={handleSelect}/>
              <Dropdown.Item icon='sort alphabet down' text='Latest - Oldest' value='Latest - Oldest' onClick={handleSelect}/>
              <Dropdown.Item icon='sort alphabet up' text='Oldest - Latest' value='Oldest - Latest' onClick={handleSelect}/>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
      <Divider/>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }><Icon name='calendar check outline'/>Active Opportunities ({activeOpps.length})</Header>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row centered>
          <Card.Group centered>
            {resultActiveOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)}
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }> <Icon name='empire'/>Expired Opportunities ({expiredOpps.length})</Header>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row centered>
          <Card.Group centered className='expired-card'>
            {resultExpiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)}
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }> <Icon name='zoom'/>Pending Opportunities ({notVerifiedOpps.length})</Header>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row centered>
          <Card.Group centered>
            {resultNotVerifiedOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)}
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Button as={NavLink} exact to='/browse-opportunities'>Browse Opportunities as Volunteers</Button>
      </Grid.Row>
    </Grid>
  );
};

// Require an array of Opportunity documents in the props.
AdminHomeOpportunities.propTypes = {
  expiredOpps: PropTypes.array.isRequired,
  activeOpps: PropTypes.array.isRequired,
  notVerifiedOpps: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default AdminHomeOpportunities;

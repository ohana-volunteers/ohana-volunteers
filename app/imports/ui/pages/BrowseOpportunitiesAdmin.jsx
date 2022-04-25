import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Divider, Card, Loader, Segment, Icon, Button, Dropdown, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';

const toDate = new Date();
const headerStyle = { color: 'white', backgroundColor: 'teal', padding: 10 };
// const buttonStyle = { color: 'black', backgroundColor: 'white', borderRadius: 3, padding: 5, borderColor: 'blue' };

const BrowseOpportunitiesAdmin = ({ expiredOpps, activeOpps, notVerifiedOpps, ready, currentUser }) => {
  const [oppSearch, setOppSearch] = useState('');
  const [order, setOrder] = useState('');

  const handleSelect = (e, { value }) => {
    setOrder(value);
  };
  const sort = order === 'Latest' ? { sort: { date: -1 } } : { sort: { organization: 1 } };
  const sortedExpiredOpps = Opportunities.find({ $and: [{ isVerified: true }, { 'date.end': { $lt: toDate } }] }, sort);
  const sortedActiveOpps = Opportunities.find({ $and: [{ isVerified: true }, { 'date.end': { $gte: toDate } }] }, sort);
  const sortedNotVerifiedOpps = Opportunities.find({ isVerified: false }, sort);

  const searchExpiredOpps = expiredOpps.filter((val) => {
    if (oppSearch === '') {
      return val;
    }
    return val.organization.toLowerCase().includes(oppSearch);
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

  /*  const searchSortedExpiredOpps = sortedExpiredOpps.filter((val) => {
    if (oppSearch === '') {
      return val;
    }
    return val.organization.toLowerCase().includes(oppSearch);
  });
  const searchSortedActiveOpps = sortedActiveOpps.filter((val) => {
    if (oppSearch === '') {
      return val;
    }
    return val.organization.toLowerCase().includes(oppSearch);
  });
  const searchSortedNotVerfiedOpps = sortedNotVerifiedOpps.filter((val) => {
    if (oppSearch === '') {
      return val;
    }
    return val.organization.toLowerCase().includes(oppSearch);
  }); */
  return (ready) ? (
    <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES_ADMIN} container centered>
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
              <Dropdown.Item icon='sort alphabet down' text='Latest' value='Latest' onClick={handleSelect}/>
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
            {(order === '') ?
              searchActiveOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>) :
              sortedActiveOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)
            }
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }> <Icon name='empire'/>Expired Opportunities ({expiredOpps.length})</Header>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row centered>
          <Card.Group centered className='expired-card'>
            {(order === '') ?
              searchExpiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>) :
              sortedExpiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)
            }
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }> <Icon name='zoom'/>Pending Opportunities ({notVerifiedOpps.length})</Header>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row centered>
          <Card.Group centered>
            {(order === '') ?
              searchNotVerifiedOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>) :
              sortedNotVerifiedOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)
            }
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Button as={NavLink} exact to='/browse-opportunities'>Browse Opportunities as Volunteers</Button>
      </Grid.Row>
    </Grid>
  ) : <Loader active>Getting data</Loader>;
};

// Require an array of Opportunity documents in the props.
BrowseOpportunitiesAdmin.propTypes = {
  expiredOpps: PropTypes.array.isRequired,
  activeOpps: PropTypes.array.isRequired,
  notVerifiedOpps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const expiredOpps = Opportunities.find({ $and: [{ isVerified: true }, { 'date.end': { $lt: toDate } }] }).fetch();
  const activeOpps = Opportunities.find({ $and: [{ isVerified: true }, { 'date.end': { $gte: toDate } }] }).fetch();
  const notVerifiedOpps = Opportunities.find({ isVerified: false }).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    expiredOpps,
    activeOpps,
    notVerifiedOpps,
    ready,
    currentUser,
  };
})(BrowseOpportunitiesAdmin);

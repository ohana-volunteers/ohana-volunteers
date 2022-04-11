import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Divider, Card, Loader, Segment, Icon, Button, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';

const toDate = new Date();
const headerStyle = { color: 'white', backgroundColor: 'teal', padding: 10 };
// const buttonStyle = { color: 'black', backgroundColor: 'white', borderRadius: 3, padding: 5, borderColor: 'blue' };

const BrowseOpportunitiesAdmin = ({ expiredOpps, activeOpps, notVerifiedOpps, ready, currentUser }) => {
  const [order, setOrder] = useState('');

  const handleSelect = (e, { value }) => {
    setOrder(value);
  };
  const sort = order === 'Latest' ? { sort: { date: -1 } } : { sort: { organization: 1 } };
  const sortedExpiredOpps = Opportunities.find({ $and: [{ isVerified: true }, { 'date.end': { $lt: toDate } }] }, sort);
  const sortedActiveOpps = Opportunities.find({ $and: [{ isVerified: true }, { 'date.end': { $gte: toDate } }] }, sort);
  const sortedNotVerifiedOpps = Opportunities.find({ isVerified: false }, sort);
  return (ready) ? (
    <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES_ADMIN} textAlign='center' container>
      <Grid.Row centered>
        <Header as="h1" >Manage Opportunities</Header>
      </Grid.Row>
      <Divider/>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }><Icon name='calendar check outline'/>Active Opportunities ({activeOpps.length})</Header>
      </Grid.Row>
      <Grid.Row>
        <Dropdown text='Sort By'
          icon='angle down'
          floating
          className='icon'>
          <Dropdown.Menu>
            <Dropdown.Item icon='calendar outline' text='A-Z' value='A-Z' onClick={handleSelect}/>
            <Dropdown.Item icon='sort alphabet down' text='Latest' value='Latest' onClick={handleSelect}/>
          </Dropdown.Menu>
        </Dropdown>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row>
          <Card.Group centered>
            {(order === '') ?
              activeOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>) :
              sortedActiveOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)
            }
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }> <Icon name='empire'/>Expired Opportunities ({expiredOpps.length})</Header>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row>
          <Card.Group centered className='expired-card'>
            {(order === '') ?
              expiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>) :
              sortedExpiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)
            }
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row centered>
        <Header as="h2" style={ headerStyle }> <Icon name='zoom'/>Pending Opportunities ({notVerifiedOpps.length})</Header>
      </Grid.Row>
      <Segment vertical padded='very' className='line'>
        <Grid.Row>
          <Card.Group centered>
            {(order === '') ?
              notVerifiedOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>) :
              sortedNotVerifiedOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)
            }
          </Card.Group>
        </Grid.Row>
      </Segment>
      <Grid.Row>
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
  const expiredOpps = Opportunities.find({ isVerified: true }, { 'date.end': { $lt: toDate } }).fetch();
  const activeOpps = Opportunities.find({ isVerified: true }, { 'date.end': { $gte: toDate } }).fetch();
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

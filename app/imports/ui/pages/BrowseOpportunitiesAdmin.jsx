import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Divider, Card, Loader, Segment, Icon, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';

const toDate = new Date();
const headerStyle = { color: 'white', backgroundColor: '#2BCAF8', padding: 10 };

const BrowseOpportunitiesAdmin = ({ expiredOpps, activeOpps, ready, currentUser }) => ((ready) ? (
  <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES_ADMIN} textAlign='center' container>
    <Grid.Row centered>
      <Header as="h1" >Manage Opportunities</Header>
    </Grid.Row>
    <Divider/>
    <Grid.Row centered>
      <Header as="h2" style={ headerStyle }><Icon name='calendar check outline'/>Active Opportunities ({activeOpps.length})</Header>
    </Grid.Row>
    <Segment vertical padded='very' className='line'>
      <Grid.Row>
        <Card.Group centered>
          {activeOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)}
        </Card.Group>
      </Grid.Row>
    </Segment>
    <Grid.Row centered>
      <Header as="h2" style={ headerStyle }> <Icon name='empire'/>Expired Opportunities ({expiredOpps.length})</Header>
    </Grid.Row>
    <Segment vertical padded='very' className='line'>
      <Grid.Row>
        <Card.Group centered className='expired-card'>
          {expiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)}
        </Card.Group>
      </Grid.Row>
    </Segment>
    <Grid.Row>
      <Button as={NavLink} exact to='/browse-opportunities'>Browse Opportunities as Volunteers</Button>
    </Grid.Row>
  </Grid>
) : <Loader active>Getting data</Loader>);
// Require an array of Opportunity documents in the props.
BrowseOpportunitiesAdmin.propTypes = {
  expiredOpps: PropTypes.array.isRequired,
  activeOpps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const expiredOpps = Opportunities.find({ 'date.end': { $lt: toDate } }).fetch();
  const activeOpps = Opportunities.find({ 'date.end': { $gte: toDate } }).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    expiredOpps,
    activeOpps,
    ready,
    currentUser,
  };
})(BrowseOpportunitiesAdmin);

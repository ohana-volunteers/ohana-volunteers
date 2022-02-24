import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Divider, Card, Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';

const toDate = new Date();

const BrowseOpportunitiesAdmin = ({ expiredOpps, activeOpps, ready, currentUser }) => ((ready) ? (
  <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES_ADMIN} textAlign='center' container>
    <Grid.Row centered>
      <Header as="h1" size="huge" >Manage Opportunities</Header>
    </Grid.Row>
    <Divider/>
    <Grid.Row centered>
      <Header as="h3" size="huge" >Active Opportunities</Header>
    </Grid.Row>
    <Segment raised padded='very'>
      <Grid.Row>
        <Card.Group centered>
          {activeOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)}
        </Card.Group>
      </Grid.Row>
    </Segment>
    <Grid.Row centered>
      <Header as="h3" size="huge" >Expired Opportunities</Header>
    </Grid.Row>
    <Segment raised padded='very'>
      <Grid.Row>
        <Card.Group centered className='expired-card'>
          {expiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={currentUser}/>)}
        </Card.Group>
      </Grid.Row>
    </Segment>
    <Divider/>
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

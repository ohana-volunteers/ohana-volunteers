import React from 'react';
import { Grid, Header, Image, Button, Container, Divider, Card, Icon, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';

const textStyle = { fontFamily: 'Copperplate' };
const toDate = new Date();

const CategoryItem = ({ category }) => (
  <Card href={category.url}>
    <Card.Content>
      <Card.Header><Icon name={category.icon}/>{category.name}</Card.Header>
    </Card.Content>
  </Card>
);
CategoryItem.propTypes = {
  category: PropTypes.shape({
    url: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

/** A simple static component to render some text for the landing page. */
const Landing = ({ orgs, ready }) => (
  <div className='landing-background'>
    <Grid id={PAGE_IDS.LANDING} textAlign='center' container>

      <div className='landing-top-wrap'>
        <div className='landing-top-content'>
          <Grid.Row>
            <Image size='large' src='/images/va-logo/VA-logo-v5-web.svg' className='landing-top-image-center'/>
          </Grid.Row>

          <Grid.Row>
            <Header as='h1' style={textStyle}>A better way to volunteer.</Header>
            <Header as='h2' style={textStyle}>We connect passionate volunteers with charitable organizations in order to build community. Let us help you easily find service opportunities for organizations in your area of interest.</Header>
          </Grid.Row>
        </div>
      </div>

      <Divider/>

      <Grid.Row>
        <Header as='h2' style={textStyle}>Dozens of Opportunities for Organizations and Volunteers</Header>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column width={4} verticalAlign='top' textAlign='left'>
          <Header as='h3' style={textStyle}>Take a look at the various organizations Volunteer Ally works with, each with unique volunteer opportunities offering various dates, times, and locations.</Header>
          <p style={textStyle}>Volunteer Ally is a non-profit organization match system designed to pair organizations with volunteers. We partner with various organizations in need of passionate volunteers.</p>
          <p style={textStyle}>Becoming a user is required to ensure committed reliable volunteers for our organizations.</p>
          <Button>
          Join Now!
          </Button>
        </Grid.Column>

        {(ready) ? (
          <Grid.Column stretched width={10} verticalAlign="top">
            <Grid columns={4}>
              {orgs.map((org) => (
                <Image
                  key={org._id} as='a'
                  href={`#/organization-profile/${org._id}`}
                  src={org.logo_mini}
                />))
              }
              <Grid.Row>
                <Container textAlign='center'>
                  <Button href='#/organization-library'>
                  View All Organizations
                  </Button>
                </Container>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        ) : <Loader active>Fetching Organizations...</Loader>}
      </Grid.Row>

      <Divider/>

      <Grid.Row>
        <Header as='h2' style={textStyle}>Check Out Our Latest Opportunities</Header>
      </Grid.Row>
      <Grid.Row>
        <Card.Group centered>
          {Opportunities.find({ $and: [{ isVerified: true }, { 'date.end': { $gte: toDate } }] }).fetch().map((opp) => <OpportunityItem key={opp._id} opp={opp}/>)}
        </Card.Group>
      </Grid.Row>
      <Grid.Row>
        <Container textAlign='center'>
          <Button href='#/browse-opportunities'>
          Browse Opportunities
          </Button>
        </Container>
      </Grid.Row>

      <Divider/>

      <Grid.Row>
        <Header as='h1' style={textStyle}>Ready to Get Started?</Header>
      </Grid.Row>
      <Grid.Row>
        <p style={textStyle}>Sign up now as a volunteer!</p>
      </Grid.Row>
      <Grid.Row>
        <Button href='#/signup'>Get Started</Button>
      </Grid.Row>
    </Grid>
  </div>
);

// Require an array of documents in the props.
Landing.propTypes = {
  orgs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to documents.
  const subscription = Organizations.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the documents and sort them by name.
  const orgs = Organizations.find({}, { sort: { name: 1 } }).fetch();
  return {
    orgs,
    ready,
  };
})(Landing);

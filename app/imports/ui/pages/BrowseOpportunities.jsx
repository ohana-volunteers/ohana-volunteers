import React from 'react';
import { Grid, Header, Image, Button, Divider, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';

const OpportunityItem = ({ opp }) => (
  <Card href={opp.url}>
    <Card.Content extra>
      <p>{opp.date}</p>
    </Card.Content>
    <Card.Content>
      <Image size='tiny' src={opp.img}/>
      <Card.Header>{opp.organization}</Card.Header>
      <Card.Meta>{opp.address}</Card.Meta>
      <Card.Description>{opp.event}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <p>Category: {opp.categories}</p>
    </Card.Content>
  </Card>
);

OpportunityItem.propTypes = {
  opp: PropTypes.shape({
    url: PropTypes.string,
    date: PropTypes.string,
    img: PropTypes.string,
    organization: PropTypes.string,
    address: PropTypes.string,
    event: PropTypes.string,
    categories: PropTypes.string,
  }).isRequired,
};

/** A simple static component to render some text for the landing page. */
const BrowseOpportunities = () => (
  <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES} textAlign='center' container>
    <Grid.Row>
      <Header as='h1'>Browse Opportunities</Header>
    </Grid.Row>

    <Divider/>

    <Grid.Row>
      <Header as='h2'>Search Results</Header>
      <Card.Group centered>
        <OpportunityItem opp={{
          url: '#opportunity-test-opportunity',
          date: 'March 4, 2022 9:30am - 11:30am',
          img: '/images/va-logo/VA-logo-circle-v5.svg',
          organization: 'Kokua',
          address: '66-249 Kamehameha Highway',
          event: 'Kokua Learning Farm Community Workday',
          categories: 'Education, Environment',
        }}/>
        <OpportunityItem opp={{
          url: '#opportunity-test-opportunity',
          date: 'January 21, 2022 8:30am - 12:00am',
          img: '/images/hawaii-foodbank/org-logos-03-150x150.png',
          organization: 'Hawaii Foodbank',
          address: 'Waipio Point Access Road',
          event: 'Distribution Assistance',
          categories: 'COVID-19 Recovery',
        }}/>
        <OpportunityItem opp={{
          url: '#opportunity-test-opportunity',
          date: 'December 9, 2021 9:00am - 12:00pm',
          img: '/images/va-logo/VA-logo-circle-v5.svg',
          organization: 'Joshlyn Sand',
          address: '123 North Kuakini Street',
          event: 'Nuuanu Stream Clean-Up',
          categories: 'Environment',
        }}/>
        <OpportunityItem opp={{
          url: '#opportunity-test-opportunity',
          date: 'January 1, 2022 12:00pm - 2:00pm',
          img: '/images/va-logo/VA-logo-circle-v5.svg',
          organization: 'Scott Wo',
          address: '921770b Kunia Road',
          event: 'Test Opportunity',
          categories: 'Environment',
        }}/>
      </Card.Group>
    </Grid.Row>
    <Divider/>

    <Grid.Row>
      <Header as='h1'>Ready to Get Started?</Header>
    </Grid.Row>
    <Grid.Row>
      <p>Sign up now as a volunteer or organization</p>
    </Grid.Row>
    <Grid.Row>
      <Button>Get Started</Button>
    </Grid.Row>
  </Grid>
);

export default BrowseOpportunities;

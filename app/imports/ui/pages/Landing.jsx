import React from 'react';
import { Grid, Header, Image, Button, Container, Divider, Card, Icon } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import { volunteerCategories } from '../../api/organization/OrgCollection';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <Grid id={PAGE_IDS.LANDING} textAlign='centered' container>

    <Grid.Row>
      <Image size='large' src='/images/VA-logo-v5-web.svg'/>
    </Grid.Row>

    <Grid.Row>
      <Header as='h1'>A better way to volunteer.</Header>
      <Header as='h2'>We connect passionate volunteers with charitable organizations in order to build community. Let us help you easily find service opportunities for organizations in your area of interest.</Header>
    </Grid.Row>

    <Divider/>

    <Grid.Row>
      <Header as='h2'>Dozens of Opportunities for Organizations and Volunteers</Header>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column width={4} verticalAlign='top' textAlign='left'>
        <Header as='h3'>Take a look at the various organizations Volunteer Ally works with, each with unique volunteer opportunities offering various dates, times, and locations.</Header>
        <p>Volunteer Ally is a non-profit organization match system designed to pair organizations with volunteers. We partner with various organizations in need of passionate volunteers.</p>
        <p>Becoming a user is required to ensure committed reliable volunteers for our organizations.</p>
        <Button>
          Join Now!
        </Button>
      </Grid.Column>

      <Grid.Column stretched width={10} verticalAlign="top">
        <Grid columns={4}>
          <Grid.Row>
            <Image src="/images/org-logos-01-150x150.png"/>
            <Image src='/images/org-logos-02-150x150.png'/>
            <Image as='a' href='#/organization-profile' src='/images/org-logos-03-150x150.png'/>
            <Image src="/images/org-logos-04-150x150.png"/>
          </Grid.Row>
          <Grid.Row>
            <Image src="/images/org-logos-05-150x150.png"/>
            <Image src="/images/org-logos-06-150x150.png"/>
            <Image src="/images/org-logos-07-150x150.png"/>
            <Image src="/images/org-logos-08-150x150.png"/>
          </Grid.Row>
          <Grid.Row>
            <Image src="/images/org-logos-09-150x150.png"/>
            <Image src="/images/org-logos-10-150x150.png"/>
            <Image src="/images/org-logos-11-150x150.png"/>
            <Image src="/images/org-logos-12-150x150.png"/>
          </Grid.Row>
          <Grid.Row>
            <Image src="/images/org-logos-13-150x150.png"/>
            <Image src="/images/org-logos-14-150x150.png"/>
            <Image src="/images/org-logos-15-150x150.png"/>
            <Image src="/images/org-logos-16-150x150.png"/>
          </Grid.Row>
          <Grid.Row>
            <Container textAlign='center'>
              <Button>
                View All Opportunities
              </Button>
            </Container>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>

    <Divider/>

    <Grid.Row>
      <Header as='h2'>Check Out Our Latest Opportunities</Header>
      <Card.Group centered>
        <Card href='#opportunity-test-opportunity'>
          <Card.Content extra>
            <p>March 4, 2022 9:30am - 11:30am</p>
          </Card.Content>
          <Card.Content>
            <Image size='tiny' src='/images/VA-logo-circle-v5.svg'/>
            <Card.Header>Kokua</Card.Header>
            <Card.Meta>66-249 Kamehameha Highway</Card.Meta>
            <Card.Description>Kokua Learning Farm Community Workday</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <p>Category: Education, Environment</p>
          </Card.Content>
        </Card>

        <Card href='#opportunity-test-opportunity'>
          <Card.Content extra>
            <p>January 21, 2022 8:30am - 12:00am</p>
          </Card.Content>
          <Card.Content>
            <Image size='tiny' src='/images/org-logos-03-150x150.png'/>
            <Card.Header>Hawaii Foodbank</Card.Header>
            <Card.Meta>Waipio Point Access Road</Card.Meta>
            <Card.Description>Distribution Assistance</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <p>Category: COVID-19 Recovery</p>
          </Card.Content>
        </Card>

        <Card href='#opportunity-test-opportunity'>
          <Card.Content extra>
            <p>December 9, 2021 9:00am - 12:00pm</p>
          </Card.Content>
          <Card.Content>
            <Image size='tiny' src='/images/VA-logo-circle-v5.svg'/>
            <Card.Header>Joshlyn Sand</Card.Header>
            <Card.Meta>123 North Kuakini Street</Card.Meta>
            <Card.Description>Nuuanu Stream Clean-Up</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <p>Category: Environment</p>
          </Card.Content>
        </Card>

        <Card href='#opportunity-test-opportunity'>
          <Card.Content extra>
            <p>January 1, 2022 12:00pm - 2:00pm</p>
          </Card.Content>
          <Card.Content>
            <Image size='tiny' src='/images/VA-logo-circle-v5.svg'/>
            <Card.Header>Scott Wo</Card.Header>
            <Card.Meta>921770b Kunia Road</Card.Meta>
            <Card.Description>Test Opportunity</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <p>Category: Environment</p>
          </Card.Content>
        </Card>
      </Card.Group>
    </Grid.Row>

    <Divider/>

    <Grid.Row>
      <Header as='h2'>Browse Opportunities By Category</Header>
      <Card.Group centered>
        {Object.getOwnPropertyNames(volunteerCategories).map((item) => {
          const cat = volunteerCategories[item];
          return <Card key={cat.name} raised>
            <Card.Content>
              <Card.Header><Icon name={cat.icon}/>{cat.name}</Card.Header>
            </Card.Content>
          </Card>;
        })}
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

export default Landing;

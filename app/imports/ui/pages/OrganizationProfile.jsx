import React from 'react';
import { Grid, Header, List, Image, Divider } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

const testOrg = {
  name: 'Hawaii Foodbank',
  categories: ['Food Insecurity', 'Homelessness/Poverty'],
  location: '2611 Kilihau St., Honolulu, HI 96819',
  website: 'https://hawaiifoodbank.org',
  avatar: '/images/HawaiiFoodbank_Logo.png',
  contact: {
    name: 'Volunteer Opportunities',
    email: 'volunteer@hawaiifoodbank.org',
    phone: '808-954-7866',
  },
  owner: 'admin@foo.com',
  status: 'published',
};

/** A simple static component to render some text for the landing page. */
const OrganizationProfile = () => (
  <Grid id={PAGE_IDS.ORGANIZATION_PROFILE} textAlign='centered' divided container>
    <Grid.Row>
      <br/>
      <Header as='h1'>{testOrg.name}</Header>
      <br/>
    </Grid.Row>
    <Divider/>
    <Grid.Row>
      <Grid.Column verticalAlign='middle' textAlign='right' width={8}>
        <Image fluid src={testOrg.avatar}/>
      </Grid.Column>
      <Grid.Column width={8}>
        <List>
          <List.Item icon='marker' content={testOrg.location}/>
          <List.Item
            icon='linkify'
            content={<a href={testOrg.website}>{testOrg.website}</a>}
          />
          <List.Item icon='tag' content={testOrg.categories.join(', ')}/>
        </List>
        <Header as='h3'>Contact info:</Header>
        <List>
          <List.Item icon='user' content={testOrg.contact.name}/>
          <List.Item
            icon='mail'
            content={<a href={`mailto:${testOrg.contact.email}`}>{testOrg.contact.email}</a>}
          />
          {(testOrg.contact.address) ?
            <List.Item icon='marker' content={testOrg.contact.address}/> : ''}
          {(testOrg.contact.phone) ?
            <List.Item icon='phone' content={testOrg.contact.phone}/> : ''}
        </List>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default OrganizationProfile;

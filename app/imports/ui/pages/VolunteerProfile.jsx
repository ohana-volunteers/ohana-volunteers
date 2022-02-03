import React from 'react';
import { Grid, Header, Card, Button, Image, List, Icon } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple component to render some text for the Volunteer Profile page.
 * NOTE: Text is only a placeholder.  Replace once volunteer profile collection is complete. */

const VolunteerProfile = () => (
  <Grid id={PAGE_IDS.VOLUNTEER_PROFILE} container>
    <Card fluid>
      <Image className="volunteer-bg-banner" src='/images/volunteer_bg_sample.jpeg'/>
      <Card.Content>
        <Grid container row={1}>

          <Grid.Row columns={2}>

            <Grid.Column width={12}>
              <Card.Header as="h1">
                <Image circular size="small" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/> John Foo
              </Card.Header>
              <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Card.Description>
            </Grid.Column>

            <Grid.Column width={4}>
              <Header as="h2">Stats:</Header>
              <List size="massive">
                <List.Item><b>Recorded Hours:</b> 36</List.Item>
                <List.Item><b>Events Participated:</b> 3</List.Item>
              </List>
              <Button primary size="big">Edit</Button>
            </Grid.Column>

          </Grid.Row>

        </Grid>
      </Card.Content>

      <Card.Content>
        <Grid stackable container>

          <Grid.Row>

            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Card.Header>Contact Info</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List size="big">
                    <List.Item><b><Icon name="mail"/>Email:</b> john@foo.com</List.Item>
                    <List.Item><b><Icon name="phone"/>Phone:</b> (808) 123-4567</List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Card.Header>Interests</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List as="ul" size="big">
                    <List.Item as="li">COVID-19 Recovery</List.Item>
                    <List.Item as="li">Education</List.Item>
                    <List.Item as="li">Housing</List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Card.Header>Special Skills</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List as="ul" size="big">
                    <List.Item as="li">Education</List.Item>
                    <List.Item as="li">Event Planning</List.Item>
                    <List.Item as="li">Sales/Marketing</List.Item>
                    <List.Item as="li">Technology</List.Item>
                    <List.Item as="li">Graphic/Web Design</List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Card.Header>Environmental Preference</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List as="ul" size="big">
                    <List.Item as="li">Indoors</List.Item>
                    <List.Item as="li">Outdoors</List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Card.Header>Availability</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List as="ul" size="big">
                    <List.Item as="li">Once a week</List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

          </Grid.Row>

        </Grid>
      </Card.Content>
    </Card>
  </Grid>
);

export default VolunteerProfile;

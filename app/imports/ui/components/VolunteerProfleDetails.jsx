import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Icon, List } from 'semantic-ui-react';

/** The main section of the volunteer profile page that presents the main information of the user. */
const VolunteerProfileDetails = ({ doc }) => (
  <Grid stackable container>
    <Grid.Column width={5}>
      <Card>
        <Card.Content>
          <Card.Header>Contact Info</Card.Header>
        </Card.Content>
        <Card.Content>
          <List size="big">
            <List.Item><b><Icon name="mail"/>Email:</b> {doc.email}</List.Item>
            <List.Item><b><Icon name="phone"/>Phone:</b> {doc.phone}</List.Item>
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
          <List bulleted size="big" items={doc.interests}/>
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column width={5}>
      <Card>
        <Card.Content>
          <Card.Header>Special Skills</Card.Header>
        </Card.Content>
        <Card.Content>
          <List bulleted size="big" items={doc.skills}/>
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
            <List.Item as="li">{doc.environmentalPreference}</List.Item>
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
          <List bulleted size="big" items={doc.availability}/>
        </Card.Content>
      </Card>
    </Grid.Column>
  </Grid>
);

VolunteerProfileDetails.propTypes = {
  doc: PropTypes.object,

};

export default VolunteerProfileDetails;

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Icon, List } from 'semantic-ui-react';
import { volunteerInterests } from '../../api/utilities/VolunteerCategories';

/** The main section of the volunteer profile page that presents the main information of the user. */
const VolunteerProfileDetails = ({ doc }) => (
  <Grid stackable container>
    <Grid.Column width={5}>
      <Card>
        <Card.Content>
          <Card.Header>Contact Info <Icon name="address book outline"/></Card.Header>
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
          <Card.Header>Interests <Icon name="handshake outline"/></Card.Header>
        </Card.Content>
        <Card.Content>
          <List/>
          {doc.interests.map((item, index) => <List.Item key={index}>
            <List.Content>
              <Icon circular size="large" name={volunteerInterests[item].icon}/> {item}
            </List.Content>
          </List.Item>)}
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column width={5}>
      <Card>
        <Card.Content>
          <Card.Header>Special Skills <Icon name="heart outline"/></Card.Header>
        </Card.Content>
        <Card.Content>
          <List bulleted size="big" items={doc.skills}/>
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column width={5}>
      <Card>
        <Card.Content>
          <Card.Header>Environmental Preference <Icon name="map outline"/></Card.Header>
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
          <Card.Header>Availability <Icon name="calendar outline"/></Card.Header>
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

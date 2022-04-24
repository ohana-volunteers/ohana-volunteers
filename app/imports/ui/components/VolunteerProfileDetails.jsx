import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Icon, List, Header, Divider, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { volunteerInterests } from '../../api/utilities/VolunteerCategories';
import OpportunityItem from './OpportunityItem';

/** The main section of the volunteer profile page that presents the main information of the user. */
const VolunteerProfileDetails = ({ doc, opps }) => (
  <Grid stackable container>
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
      <Card>
        <Card.Content>
          <Card.Header>Special Skills <Icon name="heart outline"/></Card.Header>
        </Card.Content>
        <Card.Content>
          <List bulleted size="big" items={doc.skills}/>
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column width={1}>
      <Divider vertical/>
    </Grid.Column>
    <Grid.Column width={10}>
      <Grid.Row>
        <Header as="h3" textAlign="center">Registered Opportunities</Header>
        <Divider/>
        <Grid.Row textAlign="center">
          {(opps.length === 0) ?
            <React.Fragment>
              <Header as="h1" textAlign="center">No Events Registered!</Header>
              <Header as="h2" textAlign="center">Go out and register for an event!</Header>
              <Button as={NavLink} exact to='/browse-opportunities' primary>Browse Opportunities</Button>
            </React.Fragment> :
            <Card.Group centered>
              {opps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={''}/>)}
            </Card.Group> }
        </Grid.Row>
      </Grid.Row>
    </Grid.Column>
  </Grid>
);

VolunteerProfileDetails.propTypes = {
  doc: PropTypes.object,
  opps: PropTypes.array,

};

export default VolunteerProfileDetails;

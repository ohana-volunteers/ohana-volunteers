import React from 'react';
import { Grid, Header, Card, Button, Image, Loader, Container, Statistic, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import VolunteerProfileDetails from '../components/VolunteerProfileDetails';
import { decode } from '../utilities/ImageDecode';

/** A simple component to render some text for the Volunteer Profile page. */

const MyVolunteerProfile = ({ doc, currentUser, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.MY_VOLUNTEER_PROFILE}>
    <Card fluid>
      <Image className="volunteer-bg-banner" src={decode(doc.bannerPicture)}/>
      <Card.Content>
        <Grid container row={1}>
          <Grid.Row columns={4}>
            <Grid.Column width={2}>
              <Image rounded size="small" src={decode(doc.profilePicture)}/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Card.Header as="h1">
                {doc.firstName} {doc.lastName}
                {(doc.email === currentUser) ?
                  <Button primary compact size="large" className="volunteer-edit-button" id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT} as={NavLink} exact to="/edit-my-profile">Edit</Button> : ''}
              </Card.Header>
              <Card.Description><b>Gender: </b>{doc.gender}</Card.Description>
              <Card.Description><b>Bio: </b>{doc.description}</Card.Description>
            </Grid.Column>
            <Grid.Column row={2} verticalAlign="middle" width={6}>
              <Grid.Row centered>
                <Header as="h2" textAlign="center">Stats</Header>
                <Divider/>
              </Grid.Row>
              <Grid.Row centered>
                <Statistic floated='left' size='small' className="volunteer-stats-left">
                  <Statistic.Value>{doc.totalHours}</Statistic.Value>
                  <Statistic.Label>Recorded Hours</Statistic.Label>
                </Statistic>
                <Statistic floated='right' size='small' className="volunteer-stats-right">
                  <Statistic.Value>{doc.eventsParticipated}</Statistic.Value>
                  <Statistic.Label>Events Participated</Statistic.Label>
                </Statistic>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content>
        <VolunteerProfileDetails doc={ doc }/>
      </Card.Content>
    </Card>
  </Container>
) : <Loader active>Getting data</Loader>);

MyVolunteerProfile.propTypes = {
  currentUser: PropTypes.string,
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const subscription = VolunteerProfiles.subscribe();
  const ready = subscription.ready();
  const doc = (ready) ? VolunteerProfiles.findDoc({ email: currentUser }) : undefined;
  return {
    currentUser,
    doc,
    ready,
  };
})(MyVolunteerProfile);

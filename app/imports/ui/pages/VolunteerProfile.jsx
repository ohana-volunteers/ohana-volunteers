import React from 'react';
import { Grid, Header, Card, Button, Image, List, Loader, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import VolunteerProfileDetails from '../components/VolunteerProfleDetails';

/** A simple component to render some text for the Volunteer Profile page. */

const VolunteerProfile = ({ doc, currentUser, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE}>
    <Card fluid>
      <Image className="volunteer-bg-banner" src='/images/volunteer_bg_sample.jpeg'/>
      <Card.Content>
        <Grid container row={1}>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <Card.Header as="h1">
                <Image circular size="small" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/> {doc.firstName} {doc.lastName}
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
              {(doc.owner === currentUser) ?
                <Button primary size="big" id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT}>Edit</Button> : ''}
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

VolunteerProfile.propTypes = {
  doc: PropTypes.object,
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // const { _id } = useParams();
  const user = Meteor.user() ? Meteor.user().username : '';
  // const documentId = _id;
  const subscription = VolunteerProfiles.subscribe();
  const ready = subscription.ready();
  const doc = (ready) ? VolunteerProfiles.findDoc({ email: user }) :
    undefined;
  return {
    doc,
    ready,
  };
})(VolunteerProfile);

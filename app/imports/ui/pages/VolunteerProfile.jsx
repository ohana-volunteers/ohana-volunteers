import React from 'react';
import { Grid, Header, Card, Button, Image, List, Loader, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import VolunteerProfileDetails from '../components/VolunteerProfleDetails';

/** A simple component to render some text for the Volunteer Profile page. */

const VolunteerProfile = ({ doc, currentUser, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE}>
    <Card fluid>
      {/* image is a default temporary background image until issue #34 is complete.
      Citation: https://unsplash.com/photos/apax4M-4kFI */}
      <Image className="volunteer-bg-banner" src='/images/default-bg.jpeg'/>
      <Card.Content>
        <Grid container row={1}>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <Card.Header as="h1">
                {/* image is a default temporary avatar until issue #34 is complete. */}
                <Image circular size="small" src="/images/va-logo/VA-logo-circle-v5.svg"/> {doc.firstName} {doc.lastName}
              </Card.Header>
              <Card.Description>{doc.description}</Card.Description>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as="h2">Stats:</Header>
              <List size="massive">
                <List.Item><b>Recorded Hours:</b> {doc.totalHours}</List.Item>
                <List.Item><b>Events Participated:</b> {doc.eventsParticipated}</List.Item>
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

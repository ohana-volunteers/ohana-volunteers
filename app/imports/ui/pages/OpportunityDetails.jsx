import React from 'react';
import { Grid, Card, Image, Loader, Container, Icon, List, Button, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import Map, { Marker } from 'react-map-gl';
import { PAGE_IDS } from '../utilities/PageIDs';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { decode } from '../utilities/ImageDecode';
import OpportunityItem from '../components/OpportunityItem';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
import { ROLE } from '../../api/role/Role';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';

/** A simple component to render some text for an Opportunity and its details. */
const MAPBOX_TOKEN = 'pk.eyJ1IjoieW9uZ3hpbjAwNTYiLCJhIjoiY2t6cm1ueTkzNnY2dTJvbmszZmhtcHo1cSJ9.jpI6brR6TtGGMO9erkuV8g';

const OpportunityDetails = ({ doc, orgDoc, volunteerDoc, ready, role }) => {
  const openNewTab = () => {
    const link = `https://www.google.com/maps/place/${doc.address}`;
    // eslint-disable-next-line no-undef
    window.open(link);
  };
  const openOutsideResource = () => {
    const link = `${orgDoc.website}`;
    // eslint-disable-next-line no-undef
    window.open(link);
  };

  // Add volunteer to the opp's array of registered volunteers
  const oppRegister = () => {
    const registeredVolunteers = doc.registeredVolunteers.slice();
    const collectionName = Opportunities.getCollectionName();

    registeredVolunteers.push(volunteerDoc._id);
    const updateData = { id: doc._id, registeredVolunteers, isVerified: true };
    updateMethod.callPromise({ collectionName, updateData });
  };

  // Add opp to volunteer's array of opps that they have registered for
  const volunteerRegister = () => {
    const registeredEvents = volunteerDoc.registeredEvents.slice();
    const collectionName = VolunteerProfiles.getCollectionName();

    if (registeredEvents.includes(doc._id)) {
      swal('Wait!', 'You already registered for this event!', 'warning');
      console.log(volunteerDoc.registeredEvents);
      return -1;
    }
    registeredEvents.push(doc._id);
    const updateData = { id: volunteerDoc._id, registeredEvents };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Event Registered!', 'success'));
    oppRegister();
    console.log(doc.registeredVolunteers);
    console.log(volunteerDoc.registeredEvents);
    return 0;

  };

  return (ready) ? (
    <Container id={PAGE_IDS.OPPORTUNITY_DETAILS}>
      <Card fluid>
        {/* Temp image */}
        <Image className="volunteer-bg-banner" src="/images/default_opp_header.jpeg"/>
        <Card.Content>
          <Grid container row={1}>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <Card.Header as="h1">
                  <Image size="tiny" src={decode(doc.img)}/> {doc.event}
                  <br/>
                </Card.Header>
              </Grid.Column>
              <Grid.Column width={6}>
                <List size="massive">
                  <List.Item><b>Organization Host:</b> {doc.organization}</List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content>
          <Grid container row={1} centered>
            <Grid.Row style={{ paddingBottom: '2px' }}>
              <Button color='blue' size="tiny" onClick={openNewTab}>
                <Icon name='map'/>
                Get Directions
              </Button>
              {(orgDoc) ?
                <Button color='blue' size="tiny" href={`mailto:${orgDoc.contact.email}`}>
                  <Icon name='mail'/>
                Send an Email
                </Button> : ''}
              <Button color='blue' size="tiny" href={'#/addhours'}>
                <Icon name='write'/>
                Verify Hours
              </Button>
              <Button color='blue' size="tiny" onClick={openOutsideResource}>
                <Icon name='info'/>
                More about the Organization
              </Button>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Column>
              <Grid.Row>
                <Card fluid>
                  <Card.Content>
                    {(doc.coordinates) ? (
                      <Map
                        initialViewState={{
                          latitude: doc.coordinates.lat,
                          longitude: doc.coordinates.log,
                          zoom: 14,
                        }}
                        style={{ width: 500, height: 400 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={MAPBOX_TOKEN}
                      >
                        <Marker longitude={doc.coordinates.log} latitude={doc.coordinates.lat} color="red"/>
                      </Map>) : (<Map
                      initialViewState={{
                        latitude: 21.315603,
                        longitude: -157.858093,
                        zoom: 14,
                      }}
                      style={{ width: 500, height: 400 }}
                      mapStyle="mapbox://styles/mapbox/streets-v9"
                      mapboxAccessToken={MAPBOX_TOKEN}
                    />)}
                  </Card.Content>
                </Card>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: '40px' }}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header><Icon name="calendar"/> Date </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <List size="big">
                      <List.Item>
                        <List.Content>
                          <Icon name='calendar check outline' style={{ paddingBottom: '20px' }}/>{doc.date.start.toISOString().slice(0, 10).concat('  ')}
                          {doc.date.start.toISOString().slice(11, 16).concat('  ')}<br/>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <Icon name='ellipsis vertical'/>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <Icon name='calendar check outline'/>{doc.date.end.toISOString().slice(0, 10).concat('  ')}
                          {doc.date.end.toISOString().slice(11, 16)}
                        </List.Content>
                      </List.Item>
                    </List>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header><Icon name="bars"/> Description </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <List>
                      <List.Item>{doc.description}</List.Item>
                    </List>
                  </Card.Content>
                </Card>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Card.Header><Icon name="map"/> Address </Card.Header>
                </Card.Content>
                <Card.Content>
                  <List size="big">
                    <List.Item>{doc.address}</List.Item>
                  </List>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header><Icon name="columns"/> Categories </Card.Header>
                </Card.Content>
                <Card.Content>
                  <List as="ul" size="big" horizontal>
                    {doc.categories.map((item, index) => <List.Item key={index}>
                      <List.Content>
                        <Icon circular name={volunteerCategories[item].icon} />{volunteerCategories[item].name}
                      </List.Content>
                    </List.Item>)}
                  </List>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header><Icon name="tree"/> Environment</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List as="ul" size="big">
                    <List.Item as="li">{doc.environment}</List.Item>
                  </List>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header><Icon name="user"/> Age Group</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List as="ul" size="big" horizontal bulleted>
                    {doc.age.map((item, index) => <List.Item key={index} content={item}>
                    </List.Item>)}
                  </List>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header><Icon name='at'/>Contact info</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List>
                    {(orgDoc) ?
                      <List.Item icon='user' content={orgDoc.contact.name}/> : ''}
                    {(orgDoc) ?
                      <List.Item
                        icon='mail'
                        content={<a href={`mailto:${orgDoc.contact.email}`}>{orgDoc.contact.email}</a>}
                      /> : ''}
                    {(orgDoc) ?
                      <List.Item icon='phone' content={orgDoc.contact.phone}/> : ''}
                  </List>
                </Card.Content>
              </Card>
              {(role === ROLE.VOLUNTEER) ?
                <Button primary fluid size="large" onClick={volunteerRegister}>Register With Organization Host</Button> : '' }
            </Grid.Column>
            <Grid container row={1} centered style={{ paddingTop: '150px' }}>
              <Grid.Row>
                <Header as='h2'>More Opportunities supported by {doc.organization} </Header>
              </Grid.Row>
              <Grid.Row>
                <Card.Group centered>
                  { Opportunities.find({ organization: doc.organization }).fetch().map((opp) => <OpportunityItem key={opp._id} opp={opp}/>)}
                </Card.Group>
              </Grid.Row>
            </Grid>
          </Grid>
        </Card.Content>
      </Card>
    </Container>
  ) : <Loader active>Getting opp</Loader>;
};

OpportunityDetails.propTypes = {
  doc: PropTypes.object,
  orgDoc: PropTypes.object,
  volunteerDoc: PropTypes.object,
  role: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const subscription = Opportunities.subscribeOpportunity();
  const subscriptionOrg = Organizations.subscribe();
  const { _id } = useParams();
  const documentId = _id;
  const ready = subscription.ready() && subscriptionOrg.ready();
  const doc = (ready) ? Opportunities.findDoc(documentId) : undefined;
  const orgDoc = (ready) ? Organizations.findOne({ name: doc.organization }) : undefined;
  const volunteerDoc = (ready) ? VolunteerProfiles.findOne({ email: currentUser }) : undefined;
  const role = (VolunteerProfiles.findOne({ email: currentUser })) ? ROLE.VOLUNTEER : '';
  return {
    currentUser,
    doc,
    orgDoc,
    volunteerDoc,
    role,
    ready,
  };
})(OpportunityDetails);

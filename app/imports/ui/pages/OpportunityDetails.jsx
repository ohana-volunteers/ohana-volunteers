import React from 'react';
import { Grid, Card, Image, Loader, Container, Icon, List, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import Map, { Marker } from 'react-map-gl';
import { PAGE_IDS } from '../utilities/PageIDs';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { decode } from '../utilities/ImageDecode';

/** A simple component to render some text for an Opportunity and its details. */
const MAPBOX_TOKEN = 'pk.eyJ1IjoieW9uZ3hpbjAwNTYiLCJhIjoiY2t6cm1ueTkzNnY2dTJvbmszZmhtcHo1cSJ9.jpI6brR6TtGGMO9erkuV8g';

const OpportunityDetails = ({ doc, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.OPPORTUNITY_DETAILS}>
    <Card fluid>
      {/* Temp image */}
      <Image className="volunteer-bg-banner" src="https://volunteerally.org/wp-content/uploads/2021/08/va-default-header_v2.jpg"/>
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
                <List.Item><b>Date: </b>{doc.date.start.toISOString().slice(0, 10).concat('  ')}
                  {doc.date.start.toISOString().slice(11, 16).concat('  ')} to <br/> {doc.date.end.toISOString().slice(0, 10).concat('  ')}
                  {doc.date.end.toISOString().slice(11, 16)}</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content>
        <Grid columns={2}>
          <Grid.Column>
            <Map
              initialViewState={{
                latitude: doc.coordinates.lat,
                longitude: doc.coordinates.log,
                zoom: 14,
              }}
              style={{ width: 500, height: 500 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              <Marker longitude={doc.coordinates.log} latitude={doc.coordinates.lat} color="red"/>
            </Map>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header> Categories <Icon name="map outline"/></Card.Header>
              </Card.Content>
              <Card.Content>
                <List as="ul" size="big">
                  {doc.categories.map((item, index) => <List.Item key={index} as="li">{volunteerCategories[item].name}</List.Item>)}
                </List>
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
                <Card.Header> Environment <Icon name="tree"/></Card.Header>
              </Card.Content>
              <Card.Content>
                <List as="ul" size="big">
                  <List.Item as="li">{doc.environment}</List.Item>
                </List>
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
                <Card.Header> Age Group <Icon name="man"/></Card.Header>
              </Card.Content>
              <Card.Content>
                <List as="ul" size="big">
                  <List.Item as="li">{doc.age}</List.Item>
                </List>
              </Card.Content>
            </Card>
            <Button primary fluid size="large">Contact Organization Hosts</Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  </Container>
) : <Loader active>Getting data</Loader>);

OpportunityDetails.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Opportunities.subscribeOpportunity();
  const { _id } = useParams();
  const documentId = _id;
  const ready = subscription.ready();
  const doc = (ready) ? Opportunities.findDoc(documentId) : undefined;
  return {
    doc,
    ready,
  };
})(OpportunityDetails);

import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieW9uZ3hpbjAwNTYiLCJhIjoiY2t6cm1ueTkzNnY2dTJvbmszZmhtcHo1cSJ9.jpI6brR6TtGGMO9erkuV8g'; // Set your mapbox token here

const MapView = ({ opps, ready }) => ((ready) ? (
  <Map
    initialViewState={{
      latitude: 21.3280193,
      longitude: -157.8691136,
      zoom: 14,
    }}
    style={{ width: 280, height: 500 }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={MAPBOX_TOKEN}
  >
    {opps.map((opp) => <Marker key={opp._id} longitude={opp.coordinates.log} latitude={opp.coordinates.lat} color="red" />)}
  </Map>
) : <Loader active>Getting data</Loader>);
MapView.propTypes = {
  opps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
export default withTracker(() => {
  const subscription = Opportunities.subscribeOpportunity();
  const ready = subscription.ready();
  const opps = Opportunities.find({}).fetch();
  return {
    opps,
    ready,
  };
})(MapView);

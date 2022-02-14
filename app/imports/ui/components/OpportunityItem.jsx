import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const OpportunityItem = ({ opp }) => (
  <Card href={opp.url} id={COMPONENT_IDS.OPPORTUNITY_ITEM}>
    <Card.Content extra>
      <p>
        From {opp.date.start.toISOString().slice(0, 10).concat('  ')}
        {opp.date.start.toISOString().slice(11, 16).concat('  ')}
        <br />
        To {opp.date.end.toISOString().slice(0, 10).concat('  ')}
        {opp.date.end.toISOString().slice(11, 16)}
      </p>
    </Card.Content>
    <Card.Content>
      <Image size='tiny' src={opp.img} />
      <Card.Header>{opp.organization}</Card.Header>
      <Card.Meta>{opp.address}</Card.Meta>
      <Card.Description>{opp.event}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <p>Category: {opp.categories.map(item => volunteerCategories[item].name.concat('  '))}</p>
    </Card.Content>
    <Card.Content extra>
      <p>Environment: {opp.environment}</p>
    </Card.Content>
    <Card.Content extra>
      <p>Age Group: {opp.age}</p>
    </Card.Content>
  </Card>
);
OpportunityItem.propTypes = {
  opp: PropTypes.shape({
    url: PropTypes.string,
    date: PropTypes.object,
    img: PropTypes.string,
    organization: PropTypes.string,
    address: PropTypes.string,
    event: PropTypes.string,
    categories: PropTypes.array,
    environment: PropTypes.string,
    age: PropTypes.string,
  }).isRequired,
};

export default withRouter(OpportunityItem);

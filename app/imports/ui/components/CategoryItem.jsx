import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Icon, Reveal } from 'semantic-ui-react';

const CategoryItem = ({ cat, quantity }) => (
  <Reveal animated='move right' key={cat.name}>
    <Reveal.Content visible>
      <Card key={cat.name} raised >
        <Card.Content>
          <Card.Header><Icon name={cat.icon}/>{cat.name} </Card.Header>
        </Card.Content>
      </Card>
    </Reveal.Content>
    <Reveal.Content hidden>
      <Card key={cat.name} raised color='blue' >
        <Card.Content style={{ backgroundColor: '#2185D0' }}>
          <Card.Header style={{ color: 'white' }}>{quantity} listings</Card.Header>
        </Card.Content>
      </Card>
    </Reveal.Content>
  </Reveal>
);
CategoryItem.propTypes = {
  cat: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default withRouter(CategoryItem);

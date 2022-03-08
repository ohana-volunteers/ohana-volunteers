import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { decode } from '../utilities/ImageDecode';

/** Renders individual card of volunteer profiles that admin can view. */
const AdminViewVolunteers = ({ doc }) => (
  <Card>
    <Image src={decode(doc.profilePicture)}/>
    <Card.Content>
      <Card.Header>{doc.firstName} {doc.lastName}</Card.Header>
      <Card.Meta>{doc.email}</Card.Meta>
      <Card.Description>{doc.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button color='grey' size='tiny'><Icon name='eye'/>View</Button>
      <Button color='orange' size='tiny'><Icon name='pencil'/>Edit</Button>
      <Button color='red' size='tiny'><Icon name='trash'/>Delete</Button>
    </Card.Content>
  </Card>
);

AdminViewVolunteers.propTypes = {
  doc: PropTypes.object,

};

export default AdminViewVolunteers;

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { decode } from '../utilities/ImageDecode';

/** Renders individual card of organization profiles that admin can view. */
const AdminViewOrganizations = ({ doc }) => (
  <Card>
    <Card.Content>
      <Image
        floated='right'
        size='tiny'
        src={decode(doc.logo)}/>
      <Card.Header>{doc.name}</Card.Header>
      <Card.Meta>{doc.email}</Card.Meta>
      <Card.Description><u>Visibility:</u> {doc.status}</Card.Description>
      <Card.Description><u>Location:</u> {doc.location}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button
        color='grey'
        size='tiny'
        as='a'
        href={`#/organization-profile/${doc._id}`}>
        <Icon name='eye'/>View</Button>
      <Button color='orange' size='tiny'><Icon name='pencil'/>Edit</Button>
      <Button color='red' size='tiny'><Icon name='trash'/>Delete</Button>
    </Card.Content>
  </Card>
);

AdminViewOrganizations.propTypes = {
  doc: PropTypes.object,

};

export default AdminViewOrganizations;

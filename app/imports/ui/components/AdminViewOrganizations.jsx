import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid, Header, Icon, Image, Modal } from 'semantic-ui-react';
import swal from 'sweetalert';
import { decode } from '../utilities/ImageDecode';
import { removeOrganizationMethod } from '../../api/user/organization/OrgProfileCollection.methods';

/** Renders individual card of organization profiles that admin can view. */
const AdminViewOrganizations = ({ doc }) => {

  const [open, closed] = useState(false);
  const removeOrganization = () => {
    const docID = doc._id;
    removeOrganizationMethod.callPromise(docID)
      .catch(error => swal('Deletion unsuccessful', error.message, 'error'))
      .then(() => swal('Deletion successful', 'Document has been removed', 'success'));
    closed(false);
  };
  const modalOrganization = (
    <Modal
      onClose={() => closed(false)}
      onOpen={() => closed(true)}
      open={open}
      trigger={<Button color='red' size='small'><Icon name='trash'/>Delete</Button>}>
      <Header>Confirm Deletion</Header>
      <Modal.Content>
        <Grid container centered verticalAlign='middle' rows={2}>
          <Grid.Row>
            <Icon name='warning circle' size='huge' color='yellow'/>
          </Grid.Row>
          <Grid.Row>
            <Header as='h1'>Are you sure you want to delete this organization from the system?</Header>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Grid relaxed padded centered columns={1}>
          <Grid.Row>
            <Button negative size='huge' content='Cancel'
              onClick={() => closed(false)}/>
            <Button positive size='huge' content='Delete Document'
              onClick={() => removeOrganization()}/>
          </Grid.Row>
        </Grid>
      </Modal.Actions>
    </Modal>
  );
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='tiny'
          src={decode(doc.logo)}/>
        <Card.Header>{doc.name}</Card.Header>
        <Card.Meta>{doc.contact.email}</Card.Meta>
        <Card.Meta>{doc.contact.phone}</Card.Meta>
        <Card.Description><u>Location:</u> {doc.location}</Card.Description>
        <Card.Description><u>Visibility:</u> {doc.status}</Card.Description>

      </Card.Content>
      <Card.Content extra>
        <Button
          color='grey'
          size='small'
          as='a'
          href={`#/organization-profile/${doc._id}`}>
          <Icon name='eye'/>View</Button>
        {modalOrganization}
      </Card.Content>
    </Card>
  );
};

AdminViewOrganizations.propTypes = {
  doc: PropTypes.object,

};

export default AdminViewOrganizations;

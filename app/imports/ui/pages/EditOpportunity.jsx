import React from 'react';
import { Grid, Loader, Header, Segment, Divider, Icon, Form, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import ImageUploadField from '../components/form-fields/ImageUploadField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import RadioField from '../components/form-fields/RadioField';

// const formSchema = new SimpleSchema(OpportunitySchema);
const bridge = new SimpleSchema2Bridge(Opportunities._schema);

/** Renders the Page for editing a single document. */
const EditOpportunity = ({ doc, ready }) => {

  // On successful submit, insert the data.
  const submit = (data) => {
    const { date, img, organization, address, coordinates, event, categories, environment, age } = data;
    const collectionName = Opportunities.getCollectionName();
    const updateData = { id: doc._id, date, img, organization, address, coordinates, event, categories, environment, age };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
  };
  let fRef = null;
  return (ready) ? (
    <Container id={PAGE_IDS.EDIT_OPPORTUNITY}>
      <Grid container centered>
        <Grid.Column width={10}>
          <Header as="h2" textAlign="center">Edit Opportunity</Header>
          <Divider/>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment padded color='blue'>
              <Header as="h4" textAlign="center">
                <Icon name='calendar outline'/>
                  Opportunity Date
              </Header>
              <Form.Group widths={'equal'}>
                <DateField name='date.start' label='Start date and time'/>
                <DateField name='date.end' label='End date and time'/>
              </Form.Group>
            </Segment>
            <Segment padded color='blue'>
              <Header as="h4" textAlign="center">
                <Icon name='pencil'/>
                  Basic Information
              </Header>
              <Form.Group widths={'equal'}>
                <TextField name='event' label='Opportunity Title' />
                <TextField name='organization' />
              </Form.Group>
              <TextField name='address'/>
              <ImageUploadField name='img' label='Opportunity Picture'/>
            </Segment>

            <Segment padded color='blue'>
              <Header as="h4" textAlign="center">
                <Icon name='pin'/>
                  Enter coordinates manually to be marked on the map
              </Header>
              <Form.Group widths={'equal'}>
                <NumField name='coordinates.log' decimal={true} showInlineError={true} label='Coordinates longitude (optional)' placeholder='-158.0608245'/>
                <NumField name='coordinates.lat' decimal={true} showInlineError={true} label='Coordinates latitude (optional)' placeholder='21.4561886' />
              </Form.Group>
              <a href='https://www.gps-coordinates.net'>  How to find coordinates ?</a>
            </Segment>

            <Segment padded color='blue'>
              <Header as="h4" textAlign="center">
                <Icon name='pencil'/>
                  Additional Information
              </Header>
              <MultiSelectField name='categories' />
              <RadioField name='age' showInlineError={true} label='Age Group'/>
              <RadioField name='environment' showInlineError={true} label='Environmental Preference'/>
            </Segment>
            <SubmitField value='Update' />
            <ErrorsField />

          </AutoForm>
        </Grid.Column>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditOpportunity.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const documentId = _id;
  // Get access to Stuff documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Opportunities.findDoc(documentId);
  return {
    doc,
    ready,
  };
})(EditOpportunity);

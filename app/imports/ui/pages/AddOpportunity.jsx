import React from 'react';
import { Grid, Segment, Header, Icon, Form, Divider, Container } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import RadioField from '../components/form-fields/RadioField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { OpportunitySchema } from '../../api/utilities/OpportunitySchema';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import ImageUploadField from '../components/form-fields/ImageUploadField';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema(OpportunitySchema);
const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
const AddOpportunity = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { date, img, organization, address, coordinates, event, categories, environment, age } = data;
    // const owner = Meteor.user().username;
    const url = Meteor.user().username;
    const collectionName = Opportunities.getCollectionName();
    const definitionData = { url, date, img, organization, address, coordinates, event, categories, environment, age };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Added Successfully', 'success');
        formRef.reset();
      });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ADD_OPPORTUNITY}>
      <Grid container centered>
        <Grid.Column width={10}>
          <Header as="h2" textAlign="center">Add a Opportunity</Header>
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
              <a href='/https://www.gps-coordinates.net/'>  How to find coordinates ?</a>
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
            <SubmitField value='Submit' />
            <ErrorsField />

          </AutoForm>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default AddOpportunity;

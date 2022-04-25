import React from 'react';
import { Grid, Segment, Header, Icon, Form, Divider, Container, Loader } from 'semantic-ui-react';
import {
  AutoForm,
  DateField,
  ErrorsField,
  NumField,
  SubmitField,
  TextField,
  LongTextField,
  HiddenField,
  BoolField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import RadioField from '../components/form-fields/RadioField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { OpportunitySchema } from '../../api/utilities/OpportunitySchema';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import ImageUploadField from '../components/form-fields/ImageUploadField';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema(OpportunitySchema);
const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
const AddOpportunity = ({ ready, defaultOrg }) => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { date, img, address, description, coordinates, event, categories, environment, age, isVerified } = data;
    // const owner = Meteor.user().username;
    const organization = defaultOrg === undefined ? data.organization : defaultOrg.name;
    const url = Meteor.user().username;
    const collectionName = Opportunities.getCollectionName();
    const definitionData = { url, date, img, organization, address, description, coordinates, event, categories, environment, age, isVerified };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Added Successfully', 'success');
        formRef.reset();
      });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (ready) ? (
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
                {defaultOrg ?
                  <TextField name='organization' placeholder={defaultOrg.name} disabled /> :
                  <TextField name='organization' />
                }
              </Form.Group>
              <TextField name='address'/>
              <LongTextField name='description' placeholder='Please enter a detailed description of the volunteer opportunity.'/>
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
              <MultiSelectField name='age' showInlineError={true}/>
              <RadioField name='environment' showInlineError={true} label='Environmental Preference'/>
              {defaultOrg ?
                <HiddenField name='isVerified' value={false}/> :
                <BoolField name='isVerified' showInlineError={true} label='Verify this Opportunity? '/>
              }
            </Segment>
            {defaultOrg ?
              <SubmitField value='Send to Admin' /> :
              <SubmitField value='Submit' />
            }
            <ErrorsField />

          </AutoForm>
        </Grid.Column>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

AddOpportunity.propTypes = {
  ready: PropTypes.bool.isRequired,
  defaultOrg: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscriptionOrg = Organizations.subscribe();
  // Determine if the subscription is ready
  const ready = subscriptionOrg.ready();
  const currentUser = Meteor.user().username;
  const defaultOrg = Organizations.findOne({ owner: currentUser });
  return {
    ready,
    defaultOrg,
  };
})(AddOpportunity);

import React, { useState } from 'react';
import { Grid, Header, Divider, Card, Segment, Loader, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, ErrorsField, SubmitField, SelectField, DateField } from 'uniforms-semantic';
import RadioField from '../components/form-fields/RadioField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities, OpportunityEnvironment, OpportunityAge } from '../../api/opportunities/OpportunityCollection';
import { volunteerCategories, getVolunteerCategoryNames } from '../../api/utilities/VolunteerCategories';
import CategoryItem from '../components/CategoryItem';

const panes = [
  // eslint-disable-next-line react/display-name
  { menuItem: 'Showing Categories', render: () => <Tab.Pane>
    <Card.Group centered>
      {Object.getOwnPropertyNames(volunteerCategories).map((item) => {
        const cat = volunteerCategories[item];
        const quantity = Opportunities.find({ categories: { $regex: item } }).count();
        return <CategoryItem key={cat.name} cat={cat} quantity={quantity}></CategoryItem>;
      })}
    </Card.Group>
  </Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Map', render: () => <Tab.Pane>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.7520839555564!2d-157.74397644993294!3d21.399664180
      319743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0014deef59ce9d%3A0x3f1c51918d598a31!2s123%20N%20Kaina
      lu%20Dr%2C%20Kailua%2C%20HI%2096734!5e0!3m2!1sen!2sus!4v1645412196556!5m2!1sen!2sus"
      width="280" height="500" allowFullScreen="" loading="lazy"></iframe>
  </Tab.Pane> },
];
const searchForm = new SimpleSchema({
  categories: {
    label: 'Categories',
    type: Array,
    optional: true,
  },
  'categories.$': {
    type: String,
    allowedValues: getVolunteerCategoryNames,
  },
  orderBy: {
    type: String,
    allowedValues: ['Latest', 'A-Z'],
    defaultValue: 'A-Z',
  },
  time: {
    label: 'Start From',
    type: Date,
    defaultValue: new Date(),
  },
  age: {
    label: 'Age Group',
    type: String,
    allowedValues: OpportunityAge,
    uniforms: { checkboxes: true },
    optional: true,
  },
  environmentalPreference: {
    label: 'Environment',
    type: String,
    allowedValues: OpportunityEnvironment,
    uniforms: { checkboxes: true },
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(searchForm);

/** A simple static component to render some text for the landing page. */
const BrowseOpportunities = ({ opps, ready }) => {
  const [datas, setDatas] = useState('');
  const submit = (data, formRef) => {
    setDatas(data);
    formRef.reset();
  };
  const { time } = datas;
  const order = datas.orderBy === 'Latest' ? { sort: { date: -1 } } : { sort: { organization: 1 } };
  const age = datas.age ? { age: datas.age } : {};
  const envir = datas.environmentalPreference ?
    { environment: datas.environmentalPreference } : {};
  const cate = datas.categories ?
    { categories: { $in: datas.categories } } : {};
  const sortOpps = Opportunities.find({
    $and: [
      // { $text: { $search: 'hawaii' } },
      cate,
      envir,
      age,
      { 'date.start': { $gte: time } },
    ],
  }, order);
  const count = sortOpps.count();
  let fRef = null;
  return (ready) ? (
    <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES} textAlign='center' container>
      <Grid.Row centered className ="browse-background">
        <Header as="h1" size="huge">Browse Opportunities</Header>
      </Grid.Row>
      <Divider/>

      <Grid.Row centered columns={3}>
        <Grid.Column>
          <Segment style={{ overflow: 'auto', maxHeight: 500 }}>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => submit(data, fRef)} >
              <Header as="h2" textAlign="center">Volunteer Opportunities</Header>
              <MultiSelectField id='categories' name='categories' showInlineError={true} placeholder={'Education'}/>
              <SelectField id='orderBy' name='orderBy' showInlineError={true} placeholder={'Order By...'}/>
              <DateField id='time' name='time' showInlineError={true}/>
              <RadioField id='age' name='age' showInlineError={true} />
              <RadioField id='environment' name='environmentalPreference' showInlineError={true}/>
              <SubmitField id='submit' value='Filter'/>
              <ErrorsField />
            </AutoForm>
          </Segment>
        </Grid.Column>

        <Grid.Column textAlign="center">
          <Segment style={{ overflow: 'auto', maxHeight: 500 }} padded>
            <Header as='h2' >Showing results</Header>
            <Grid.Row>
              {(datas === '') ?
                <Header as='h4' >Showing all results</Header> :
                <Header as='h4' >Showing {count} results</Header> }
              <Card.Group centered>
                {(datas === '') ?
                  opps.map((opp) => <OpportunityItem key={opp._id} opp={opp} />) :
                  sortOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} />)}
              </Card.Group>
            </Grid.Row>
          </Segment>
        </Grid.Column>

        <Grid.Column textAlign="center">
          <Segment style={{ overflow: 'auto', maxHeight: 500 }} padded>
            <Tab panes={panes} />
          </Segment>
        </Grid.Column>
      </Grid.Row>

    </Grid>
  ) : <Loader active>Getting data</Loader>;
};

// Require an array of Stuff documents in the props.
BrowseOpportunities.propTypes = {
  opps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const opps = Opportunities.find({}, { sort: { organization: 1 } }).fetch();
  return {
    opps,
    ready,
  };
})(BrowseOpportunities);

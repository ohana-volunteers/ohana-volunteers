import React from 'react';
import { Grid, Divider, Item, Icon, Button, Container, Image } from 'semantic-ui-react';

const container1Style = { backgroundColor: 'black', paddingBottom: '325px', marginTop: '-25px', paddingLeft: '0px' };
const container2Style = { backgroundColor: 'black', paddingBottom: '325px', marginTop: '40px', paddingLeft: '0px', marginBottom: '-23px' };
const bodyStyle = {backgroundColor: 'rgba(0, 255, 255, .1)' }
const textStyle = { color: 'white', marginTop: '120px', fontSize: '55px', fontFamily: 'Papyrus' };
const textStyle2 = { color: 'black', textAlign: 'center', marginTop: '100px', fontSize: '40px', fontFamily: 'Copperplate' };
const textStyle3 = { textAlign: 'center', paddingTop: '50px', marginTop: '50px', fontSize: '25px', fontFamily: 'Copperplate' };
const textStyle4 = { textAlign: 'center', paddingTop: '50px', marginTop: '25px', fontSize: '25px', fontFamily: 'Copperplate' };
const textStyle5 = { color: 'white', fontSize: '15px'};
const iconStyle = { paddingLeft: '115px' };
const iconTextStyle = { paddingLeft: '80px', fontsize: '30px' };
const gridStyle = { marginTop: '100px' };
const gridStyle2 = { paddingTop: '150px', paddingBottom: '120px' };
const marginTop = { marginTop: '100px' };

/** A simple static component to render some text for the About Us page. */

const OrganizationLibrary = () => (

    <div style={bodyStyle}>
      <Divider style={container1Style}>
        <Container textAlign='center'>
          <Item.Header as="h1" style={textStyle}> Organization Library </Item.Header>
          <Item.Description style={textStyle5}> Browse the organizations we work with </Item.Description>
        </Container>
      </Divider>

      <Grid container centered columns={4} style={marginTop}>
        <Grid.Column>
          <Image src='/images/aloha-animal-sanctuary/org-logos-01-150x150.png' size='small'/>
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/habitat-for-humanity/org-logos-02-150x150.png' size='small'/>
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/hawaii-foodbank/org-logos-03-150x150.png' size='small' />
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/meals-on-wheels/org-logos-04-150x150.png' size='small'/>
        </Grid.Column>

        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Image src='/images/org-logos-05-150x150.png'/>
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-06-150x150.png' />
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-07-150x150.png'/>
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-08-150x150.png'/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Image src='/images/org-logos-09-150x150.png'/>
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-10-150x150.png'/>
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-11-150x150.png'/>
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-12-150x150.png'/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Image src='/images/org-logos-13-150x150.png' />
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-14-150x150.png'/>
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-15-150x150.png' />
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/org-logos-16-150x150.png' />
          </Grid.Column>
        </Grid.Row>

      </Grid>

      <Image centered src='/images/elissa-garcia-MV1l4f_f1os-unsplash-2048x1365.jpg' fluid size='massive' style={marginTop}/>

      <Item.Header as="h1" style={textStyle2}> Join over 20 organizations already finding the help they need with Volunteer Ally. </Item.Header>

      <Item.Description style={textStyle3}> There are thousands of active volunteers waiting for opportunities to work with qualified organizations.
        Make sure your organization is volunteer-ready with Volunteer Ally. Our system allows you to easily post your volunteer opportunities and have them easily found by qualified volunteers – all for free! </Item.Description>

      <Item.Description style={textStyle4}> Here are some of the great features you’ll find with Volunteer Ally: </Item.Description>

      <Grid style={gridStyle}>
        <Grid.Column width={0.2}>
          <Icon name='check' size='big' style={iconStyle}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Item.Description style={iconTextStyle}> Access to hundreds of volunteers with a wide range of skills and availability </Item.Description>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={0.2}>
          <Icon name='check' size='big' style={iconStyle}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Item.Description style={iconTextStyle}> Direct opportunity RSVPs to your inbox </Item.Description>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={0.2}>
          <Icon name='check' size='big' style={iconStyle}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Item.Description style={iconTextStyle}> Database of volunteers and opportunities </Item.Description>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={0.2}>
          <Icon name='check' size='big' style={iconStyle}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Item.Description style={iconTextStyle}> Integration-ready </Item.Description>
        </Grid.Column>
      </Grid>
      <Divider style={container2Style}>
        <Grid centered columns={1} style={gridStyle2}>
          <Button size='huge' color='black'>Sign Up Today</Button>
        </Grid>
      </Divider>
    </div>
);

export default OrganizationLibrary;

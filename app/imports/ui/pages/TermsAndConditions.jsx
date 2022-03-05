import React from 'react';
import { Grid, Divider, Item, Icon, Button, Container, Image } from 'semantic-ui-react';

const container1Style = { backgroundColor: 'blue', paddingBottom: '325px', marginTop: '-25px', paddingLeft: '0px' };
const textStyle = { color: 'white', marginTop: '150px', fontSize: '35px' };
const textStyle2 = { color: 'blue', textAlign: 'center', marginTop: '100px' };
const textStyle3 = { textAlign: 'center', paddingTop: '50px', marginTop: '50px' };
const textStyle4 = { textAlign: 'center', paddingTop: '50px', marginTop: '25px' };
const textStyle5 = { color: 'white' };
const iconStyle = { paddingLeft: '115px' };
const iconTextStyle = { paddingLeft: '80px', fontsize: '30px' };
const gridStyle = { marginTop: '100px' };
const gridStyle2 = { paddingTop: '30px', paddingBottom: '120px' };
const marginTop = { marginTop: '100px' };

/** A simple static component to render some text for the About Us page. */

const TermsAndConditions = () => (

    <div>
        <Divider style={container1Style}>
            <Container textAlign='center'>
                <Item.Header as="h1" style={textStyle}> Terms & Conditions </Item.Header>
            </Container>
        </Divider>

        <h5>TERMS OF USE</h5>


        <h5>Last updated July 01, 2020</h5>
        <h5>AGREEMENT TO TERMS</h5>
        <h5>INTELLECTUAL PROPERTY RIGHTS</h5>
        <h5>USER REPRESENTATIONS</h5>
        <h5>USER REGISTRATION</h5>
        <h5>PROHIBITED ACTIVITIES</h5>




    </div>
);

export default TermsAndConditions;
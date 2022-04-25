import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const bodyStyle = { backgroundColor: 'rgba(0, 255, 255, .1)', marginTop: '22px' };
const fontStyle = {fontFamily: 'Copperplate' };

const searchResults = () => {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer style={bodyStyle}>
            <div style={divStyle} className="ui center aligned container">
                <hr/>
                ©2021-2022 VolunteerAlly and&nbsp;
                <a href='https://github.com/ohana-volunteers' style={fontStyle}>Ohana Volunteers.</a>&nbsp;
                All rights reserved.&nbsp;
                <a href='#/privacy-policy' style={fontStyle}>Privacy Policy.</a>&nbsp;
                <a href='#/TermsAndConditions' style={fontStyle}>Terms & Conditions</a>&nbsp;
            </div>
            <br/>
        </footer>
    );
};

export default searchResults;
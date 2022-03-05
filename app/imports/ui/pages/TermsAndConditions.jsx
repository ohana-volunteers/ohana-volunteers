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
        <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Volunteer Ally, LLC (“Company“, “we”, “us”, or “our”), concerning your access to and use of the https://volunteerally.org website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.

            Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Use to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.

            The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.

            The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA).

            The Site is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.</p>
        <h5>INTELLECTUAL PROPERTY RIGHTS</h5>
        <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.

            Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.</p>
        <h5>USER REPRESENTATIONS</h5>
        <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation.

            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).</p>
        <h5>USER REGISTRATION</h5>
        <p>You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
        <h5>PROHIBITED ACTIVITIES</h5>
        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.

            As a user of the Site, you agree not to:

            Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
            Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
            Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.
            Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.
            Use any information obtained from the Site in order to harass, abuse, or harm another person.
            Make improper use of our support services or submit false reports of abuse or misconduct.
            Use the Site in a manner inconsistent with any applicable laws or regulations.
            Use the Site to advertise or offer to sell goods and services.
            Engage in unauthorized framing of or linking to the Site.
            Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.
            Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.
            Delete the copyright or other proprietary rights notice from any Content.
            Attempt to impersonate another user or person or use the username of another user.
            Sell or otherwise transfer your profile.
            Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).
            Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.
            Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.
            Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.
            Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
            Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.
            Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.
            Use a buying agent or purchasing agent to make purchases on the Site.
            Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.
            Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</p>
        <h5>USER GENERATED CONTRIBUTIONS</h5>
        <h5>CONTRIBUTION LICENSE</h5>
        <h5>GUIDELINES FOR REVIEWS</h5>
        <h5>SOCIAL MEDIA</h5>
        <h5>SUBMISSIONS</h5>
        <h5>THIRD-PARTY WEBSITE AND CONTENT</h5>
        <h5>ADVERTISERS</h5>
        <h5>SITE MANAGEMENT</h5>
        <h5>PRIVACY POLICY</h5>
        <h5>DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE AND POLICY</h5>
        <h5>Notifications</h5>
        <h5>Counter Notification</h5>
        <h5>TERM AND TERMINATION</h5>
        <h5>MODIFICATIONS AND INTERRUPTIONS</h5>
        <h5>ADVERTISERS</h5>
        <h5>GOVERNING LAW</h5>
        <h5>DISPUTE RESOLUTION</h5>
        <h5>Informal Negotiations</h5>
        <h5>Binding Arbitration</h5>
        <h5>Restrictions</h5>
        <h5>Exceptions to Informal Negotiations and Arbitration</h5>
        <h5>CORRECTIONS</h5>
        <h5>DISCLAIMER</h5>
        <h5>LIMITATIONS OF LIABILITY</h5>
        <h5>INDEMNIFICATION</h5>
        <h5>USER DATA</h5>
        <h5>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h5>
        <h5>CALIFORNIA USERS AND RESIDENTS</h5>
        <h5>MISCELLANEOUS</h5>
        <h5>CONTACT US</h5>
        <h5>Volunteer Ally, LLC</h5>
        <h5>info@volunteerally.org</h5>












    </div>
);

export default TermsAndConditions;
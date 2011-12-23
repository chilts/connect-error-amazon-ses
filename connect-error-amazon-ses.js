// --------------------------------------------------------------------------------------------------------------------
//
// connect-error-amazon-ses.js - Middleware to send errors as email through Amazon SES.
//
// Copyright (c) 2011 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

var awssum = require('awssum');
var amazon = require('awssum/lib/amazon/amazon.js');
var sesService = require('awssum/lib/amazon/ses.js');

module.exports = function(options) {
    options = options || {};

    // remember these (by taking local variables)
    var accessKeyId     = options.accessKeyId;
    var secretAccessKey = options.secretAccessKey;
    var awsAccountId    = options.awsAccountId;
    var region          = options.region;
    var email           = options.email;
    var subject         = options.subject || 'An error occurred in your web application (' + process.title + ')';

    // make an SES object
    var ses = new sesService.Ses(accessKeyId, secretAccessKey, awsAccountId, amazon.US_EAST_1);

    return function errorHandler(err, req, res, next) {
        // create the email
        var data = {
            ToAddresses : [ email ],
            Text : err,
            TextCharset : 'UTF-8',
            Subject : subject,
            SubjectCharset : 'UTF-8',
            Source : email,
        };

        // send the email
        ses.SendEmail(data, function(emailErr, data) {
            if ( emailErr ) {
                // hmm, something went wrong sending the email ... just log
                console.log(emailErr);
           }

            // ... and pass on the original error to the next error middleware
            next(err);
        });
    };
};

// --------------------------------------------------------------------------------------------------------------------

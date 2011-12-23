```
 _______  _______  _        _        _______  _______ _________
(  ____ \(  ___  )( (    /|( (    /|(  ____ \(  ____ \\__   __/
| (    \/| (   ) ||  \  ( ||  \  ( || (    \/| (    \/   ) (   
| |      | |   | ||   \ | ||   \ | || (__    | |         | |   
| |      | |   | || (\ \) || (\ \) ||  __)   | |         | |   
| |      | |   | || | \   || | \   || (      | |         | |   
| (____/\| (___) || )  \  || )  \  || (____/\| (____/\   | |   
(_______/(_______)|/    )_)|/    )_)(_______/(_______/   )_(   
                                                               

            _______  _______  _______  _______  _______ 
           (  ____ \(  ____ )(  ____ )(  ___  )(  ____ )
           | (    \/| (    )|| (    )|| (   ) || (    )|
     _____ | (__    | (____)|| (____)|| |   | || (____)|
    (_____)|  __)   |     __)|     __)| |   | ||     __)
           | (      | (\ (   | (\ (   | |   | || (\ (   
           | (____/\| ) \ \__| ) \ \__| (___) || ) \ \__
           (_______/|/   \__/|/   \__/(_______)|/   \__/
                                                        

                _______  _______  _______  _______  _______  _       
               (  ___  )(       )(  ___  )/ ___   )(  ___  )( (    /|
               | (   ) || () () || (   ) |\/   )  || (   ) ||  \  ( |
         _____ | (___) || || || || (___) |    /   )| |   | ||   \ | |
        (_____)|  ___  || |(_)| ||  ___  |   /   / | |   | || (\ \) |
               | (   ) || |   | || (   ) |  /   /  | |   | || | \   |
               | )   ( || )   ( || )   ( | /   (_/\| (___) || )  \  |
               |/     \||/     \||/     \|(_______/(_______)|/    )_)
                                                                     

                    _______  _______  _______ 
                   (  ____ \(  ____ \(  ____ \
                   | (    \/| (    \/| (    \/
             _____ | (_____ | (__    | (_____ 
            (_____)(_____  )|  __)   (_____  )
                         ) || (            ) |
                   /\____) || (____/\/\____) |
                   \_______)(_______/\_______)
                                                      
```

Middleware to send errors as email through Amazon SES.

# How to get it #

The easiest way to get it is via [npm][]

``` bash
    $ npm install connect-error-amazon-ses
```

# Usage #

    var express = require('express');
    var ses = require('connect-error-amazon-ses');
    var amazon = require('awssum/lib/amazon/amazon');

    var config = {
        accessKeyId     : process.env.ACCESS_KEY_ID,
        secretAccessKey : process.env.SECRET_ACCESS_KEY,
        awsAccountId    : process.env.AWS_ACCOUNT_ID,
        region          : amazon.US_EAST_1,
        email           : process.env.EMAIL,
        subject         : '[example.com error] something went wrong',
    };

    // create your express server
    var app = module.exports = express.createServer();

    // YOUR ROUTES HERE

    // set our Email error handler, which passes it on to the express.errorHandler()
    app.use(ses(config));
    app.use(express.errorHandler());

    app.listen(3000);

    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

Or you could use the Amazon SES error handler in production mode:

    app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
        app.use(ses(config));
        app.use(express.errorHandler());
    });

This way you won't get a load of emails from other people's development machines. :)

# Author #

Written by [Andrew Chilton](http://www.chilts.org/blog/)

Copyright 2011 [AppsAttic](http://www.appsattic.com/)

# License #

MIT. See LICENSE for more details.

[npm]: http://github.com/isaacs/npm

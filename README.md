#Moped-Philetta

Philetta is (going to be) a fast and simple HTTP frontend for Mopidy.

It is inspired by the Philetta series of radios built back in the 1950s by Philips. 

##Build

The build process is fairly simple so far.

You'll need to install the npm dependencies:

    npm install

Then you will need to compile the LESS files:

    gulp less

And finally, the JavaScript:

    r.js.cmd -o require.json
# md5-password-cracker
A md5 hash cracker web app 

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

# Installation:
```
git clone https://github.com/krishpranav/md5-password-cracker
cd md5-password-cracker
npm md5.js
```

A typical CPU can get around 50 million hashes per second, so JavaScript is really slowing things down here. The MD5 algorithm I used is [Joseph Meyer's](http://www.myersdaily.org/joseph/javascript/md5-text.html), which is supposed to be the fastest JS implementation, but even so, it's likely the bottleneck here.

Only tested in Chrome v23.

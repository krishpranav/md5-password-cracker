importScripts('md5.js', 'chars.js')

// cracked settings
var workerId
    , maxPassLength = undefined
    , passToCrack = undefined

// Timer variables
var interval = 100000
    , count = 0
    , startTime = +new Date

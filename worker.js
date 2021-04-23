importScripts('md5.js', 'chars.js')

// cracked settings
var workerId
    , maxPassLength = undefined
    , passToCrack = undefined

// Timer variables
var interval = 100000
    , count = 0
    , startTime = +new Date

// status function
function status(msg) {
    this.postMessage( {cmd: "status", data:msg, id: workerId })
}

// log function
function log(msg) {
    this.postMessage( {cmd: "log", data: msg, id: workerId })
}

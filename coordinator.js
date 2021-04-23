var numWorkers = 8 // Note: cant set this to be more than 8
var workers = []
var startTime = +new Date


for (var i = 0; i < numWorkers; i++) {

    // create worker
    var worker = new Worker('worker.js')
    workers.push(worker)


    // message handler
    worker.addEventListener('message', function (e) {
        switch (e.data.cmd) {
            case "status":
                status(e.data.data, e.data.id)
                break

            case "log":
                log(e.data.data, e.data.id)
                break

            case "setRate":
                status(addCommasToInteger(e.data.data) + " passwords/second", e.data.id)
                break

            case "foundPassword":
                log("Found Password: " + e.data.data)

                var totalTime = (+new Date - startTime) / 1000
                log("Total Time: " + totalTime + " seconds")

                workers.forEach(function(worker) {
                    worker.terminate()
                })
                log("Terminated all workers.")
                break
            default:
                log("Main page doesn/t understand command " + e.data.cmd)
        }
    })

    // error handle
    worker.addEventListener('error', function(e){
        log(['ERROR: Line', e.lineno, 'in', e.filename, ':', e.message].join(''))
    })

    // set worker settings
    worker.postMessage({ cmd: "setWorkerId", data: i })
    worker.postMessage({ cmd: "setMaxPassLength", data: 5 })
    worker.postMessage({ cmd: "setPassToCrack", data: "54d75975e615f0638b6181592a4d929f" })

    // start worker
    worker.postMessage({ cmd: "performCrack", data: {start: i, hop: numWorkers} })
}

status("Searching for password match for hash '54d75975e615f0638b6181592a4d929f'.")
log("Testing uppercase, lowercase, and numbers.")

// helper function

function addCommasToInteger(x) {
    x = parseInt(x) + ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x)) {
        x = x.replace(rgx, '$1' + ',' + '$2')
    }
    return x
}

function status(msg, workerId) {
    var prefix = workerId != null
        ? "Worker " + workerId + " status: "
        : "Main page status: "

    var selector = workerId != null
        ? "#worker" + workerId
        : "#main"

    document.querySelector(selector).textContent = prefix + msg
}
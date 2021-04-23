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
}

const { Worker, isMainThread, parentPort } = require('worker_threads');
if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (msg) => { console.log('Message from worker:', msg); });
} else {
  parentPort.postMessage('Hello world!\nSincerely, A Worker');
}

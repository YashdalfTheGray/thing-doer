# Observer Node

This document details the construction of the observer node. This node is assigned readonly permissions to the datastore and contains visuals to allow users to observe the state of the system. The observer contains two parts - the server and client. Put another way, code that runs within the observer node and code that runs on the user's browser.

## Server

The server part of the observer node is a standard API server coupled with static file server. As mentioned before, the API is read only since the observer node only has read only permissions on the datastore. Using this API, the user can take a peek into the entire system and ask questions like,

- how many processor nodes are in the system?
- how many jobs are being processed?
- how many jobs are queued up?
- what is the status of each node?
- what is the current job queue distribution?

## Client

The client part of the observer is a simple web application that renders the answers to the questions above in an easy to visualize way. It shows the user the cumulative job queue, the status of each node, the status of the current job being processed and what section of the job queue each node is liable for. This UI also updates at both a user configurable interval as well as through a manual refresh button. It maintains an open connection to the server part of the observer node using a websocket connection.

Each websocket messages follows, lightly, the action message pattern that can be seen with the job queue as well. Example below.

```json
{
  "type": "worker_node_status_change",
  "payload": {
    "workerNodeId": "<uuid>",
    "oldStatus": "ACTIVE",
    "newStatus": "BUSY"
  }
}
```

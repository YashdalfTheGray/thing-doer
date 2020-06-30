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

## Websocket messages

Each websocket messages follows, lightly, the action message pattern that can be seen with the job queue as well. Example below.

```json
{
  "type": "worker_node_status_change",
  "payload": {
    "workerNodeId": "<uuid>",
    "oldStatus": "ACTIVE",
    "newStatus": "BUSY",
    "updatedAt": 1593459267416
  }
}
```

## Modes of operation

### Periodic update

The default mode of operation is the periodic update mode. In this mode, the customer can configure an update duration for this mode. The messages that need to be sent to the client are batched on the server until the client requests an update on the system. The messages are then sent in a batch payload. Example of actions below.

The update request action from the client,

```json
{
  "type": "update_request"
  "payload": {
    "update_type": "periodic"
  }
}
```

The batched messages from the server.

```json
{
  "type": "batched_update_response",
  "payload": {
    "messages": [
      {
        "type": "...",
        "payload": {}
      },
      {
        "type": "...",
        "payload": {}
      },
      {
        "type": "...",
        "payload": {}
      }
    ]
  }
}
```

### Live update

If required, customers can also switch the observer node to "live mode", where events that happen in the system are sent to the observer node, processed, and displayed shortly after they happen. A latency calculation is also displayed on the page so that the customer can get a sense of the freshness of the data.

### Manual update

The last mode of operation is the manual update. In this mode, the customer manually clicks the refresh button to tell the observer to update the system state. This mode of operation can be used in conjunction with the periodic update mode but not with the live update mode.

The request looks similar to the periodic update request but with one change. The response from the server is structured the same way.

```json
{
  "type": "update_request"
  "payload": {
    "update_type": "manual"
  }
}
```

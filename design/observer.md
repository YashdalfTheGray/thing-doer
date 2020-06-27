# Observer Node

This document details the construction of the observer node. This node is assigned readonly permissions to the datastore and contains visuals to allow users to observe the state of the system. The observer contains two parts - the server and client. Put another way, code that runs within the observer node and code that runs on the user's browser.

## Server

The server part of the observer node is a standard API server coupled with static file server. As mentioned before, the API is read only since the observer node only has read only permissions on the datastore. Using this API, the user can take a peek into the entire system and ask questions like,

- how many processor nodes are in the system?
- how many jobs are being processed?
- how many jobs are queued up?
- what is the status of each node?
- what is the current job queue distribution?

# Architecture

The purpose of this document is to highlight the overall architecture of the system. It is going to have two components, something that stores and manages state, and the thing doer itself.

## Each node

Since this project is distributed in nature, each node uses a datastore to sync its state with the rest of the nodes in the system. At start time, each node tells the datastore about the job queue that it has created.

## Datastore

The datastore holds the state of the entire system and has multiple collections - one collection for the state of the system and one collection to be the cumulative incoming job queue.

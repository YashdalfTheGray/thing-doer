# Architecture

The purpose of this document is to highlight the overall architecture of the system. It is going to have two components, something that stores and manages state, and the thing doer itself.

## Each node

Since this project is distributed in nature, each node uses a datastore to sync its state with the rest of the nodes in the system. At start time, each node tells the datastore about the job queue that it has created. Each node can be in one of five states, initializing, waiting, working, paused, or dead. More detail on these states and their associated transitions is included in the node specific design documentation.

## Datastore

The datastore holds the state of the entire system and has multiple collections - one collection for the state of the system and one collection to be the cumulative incoming job queue.

## System state

The system state collection holds a record for each node in the system and details about the node-specific job queue for that node. The assumption that this system makes is that each node has the ability to process any job that comes into the job queue, in other words, scheduling does not depend on the capability of nodes and nodes aren't specialized for a certain job type. Each record stores the status of each node, as well as the section of the system level job queue that that node is responsible for.

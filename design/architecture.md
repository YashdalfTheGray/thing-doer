# Architecture

The purpose of this document is to highlight the overall architecture of the system. It is going to have two components, something that stores and manages state, and the thing doer itself.

## Processor node

Since this project is distributed in nature, each node uses a datastore to sync its state with the rest of the nodes in the system. At start time, each node tells the datastore about the job queue that it has created. Each node can be in one of five states, initializing, waiting, working, paused, or dead. More detail on these states and their associated transitions is included in the node specific design documentation.

## Datastore

The datastore holds the state of the entire system and has multiple collections - one collection for the state of the system and one collection to be the cumulative incoming job queue. This part of the system is integral to the ability of the system to function. Consequently, this section will use a cloud hosted database solution with high availability.

### System state

The system state collection holds a record for each node in the system and details about the node-specific job queue for that node. The assumption that this system makes is that each node has the ability to process any job that comes into the job queue, in other words, scheduling does not depend on the capability of nodes and nodes aren't specialized for a certain job type. Each record stores the status of each node, as well as the section of the system level job queue that that node is responsible for.

### Job Queue

The job queue collection holds all of the jobs that are, will, and were processed through the system. Each job coming into the queue is assigned a sequential job ID and this ID is used to determine which processor node will be assigned this job. Once a job gets picked up, the node is then responsible for updating the progress as well as the results of the job.

## Observer node

A special type of node that does not take part in the job scheduling or execution but allows the user to understand the state of the system and how it changes over time. Since this is a distributed system, the observer will be a fully optional part of the system and will be able to be started or stopped on demand.

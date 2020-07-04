# Processor Node

This document goes over the the design of each processor node in detail. It covers the possible states the processor node could be, each of the interactions that the processor node is responsible for in each of the states and how the it does the selection for the job that it's going to do.

The processor node is the actual "thing doer" in the system. Without one or more processor nodes, the job queue will never see a job picked up and processed. Furthermore, since each processor node is also responsible for adding jobs to the queue, no jobs will be queued in the system either. Consideration was given to a design where there is a queue manager node that enqueues jobs for the system but without processor nodes, no jobs would be processed and the job queue would continue to grow. Consequently, the ability to queue jobs is tied to the ability to be able to process the queued jobs.

The trivial case for the processor node is when there is only one processor node in the system. In this case, the entire job queue is owned by one node and all jobs are processed by only one node. If the requirement is to run only one node, it is more optimal for the node to contain the job queue within itself and use an asynchronous method of adding to the job queue while still being able to process the jobs being added.

## States

The states that the processor node can be in are as following

- initializing
- waiting
- working
- paused
- unresponsive

### Initializing

In the initializing state of the node, the proccessor node checks the current state of the world by querying the state collection in the datastore. Then it determines, using the length of the collection, what part of the job queue is owned by the new node. Then it sets up its own job queue by creating its own document in the state collection.

### Waiting

There is not much activity happening in the waiting state for the processor node. This state is marked by the node waiting for a job to land in its job queue. While in this state, the node is periodically checking the state collection in the datastore to check and react to changes in job queue assignments as well as checking the job queue for new jobs.

### Working

This is the state where the node is working on a job. The start of this state is marked by a job document being updated with the "STARTED" current status. Once a job is started by a node, the node will continue to process it until it is finished. This process does not get interrupted by queue assignment changes. Once a job has been started by a node, the only interruption is caused by node failure.

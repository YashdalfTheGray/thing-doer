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

### Paused

This state represents a node that is ready to work on jobs in the system but does not have a job queue assignment. This state can potentially arise when consensus between the nodes hasn't been reached regarding the job queue assignment. Additionally, this state can also be triggered by the user by changing the node runtime configuration. This is helpful in case the user wants to emulate node failure without having to take the node down completely. The ability to trigger a paused state can be blocked by setting a flag in the startup configuration of a node. If set, this will ignore the manual pause trigger from the runtime configuration.

### Unresponsive

This state represents a node that has not checked into the state collection for the preconfigured health check time period. Once a node is considered unresponsive, the other nodes that have checked into the state collection will take over the job queue that was previously owned by the unresponsive node.

## Health checks

There is a health check period that the node reads from the runtime/startup configuration. This health check period specified how often the node checks back into the state collection, updates its own information and pulls new information about the rest of the processor nodes.

If a node fails a configurable number of health checks, another node marks the node's state document status as "unresponsive" and it then has another health check period to respond. If the node fails to response, the job queue that the failed node is reponsible for is redistributed across all the other active nodes.

## API

All the API endpoints for the processor node are going to be mounted under the `/api` URL path and the listings below assume that.

### `GET /ping`

This is the standard ping health check, will always respond with a 200 and the string `pong\n`. Good for determining routing to the application through the network infrastructure.

### `GET /deep_ping`

This is a deeper health check that returns JSON that details the internal state of the processor. It returns JSON so as to be machine parseable. It also provides a `status` field with 3 possible states

- `okay` - all the internal checks passed and the application is ready to go
- `partial_success` - at least one of the internal checks failed, application may not work as intended
- `error` - all the internal checks have failed and the application needs reconfiguration

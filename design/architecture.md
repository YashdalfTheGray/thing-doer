# Architecture

The purpose of this document is to highlight the overall architecture of the system. It is going to have two components, something that stores and manages state, and the thing doer itself.

## Each node

Since this project is distributed in nature, each node will use a datastore to sync its state with the rest of the nodes in the system. At start time, each node will tell the datastore about the job queue that it has created.

# Datastore

This document covers the datastore. It details the schema of the collections and the availability considerations as well. Additionally, it also details potential options for the datastore, both while developing and also in production. The datastore contains the following collections and details and schemas are included below.

- `state`
- `jobs`

## Collections

## The `state` collection

This collection of documents will will be representative of the state of the system at any point during the uptime. It will contain information about each processor node available to take jobs in the system as well as the section of the job queue that they are responsible for. Additionally, this document will also be kept updated with the latest heartbeat information from each node which will serve as a way to determine when a node became unresponsive.

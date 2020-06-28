# Datastore

This document covers the datastore. It details the schema of the collections and the availability considerations as well. Additionally, it also details potential options for the datastore, both while developing and also in production. The datastore contains the following collections and details and schemas are included below.

- `state`
- `jobs`

## Collections

### The `state` collection

This collection of documents is representative of the state of the system at any point during the uptime. It contains information about each processor node available to take jobs in the system as well as the section of the job queue that they are responsible for. Additionally, this document is also kept updated with the latest heartbeat information from each node which serves as a way to determine when a node became unresponsive. The schema is included in Appendix A.

### The `jobs` collection

## Appendices

### Appendix A - `state` collection schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://example.com/example.json",
  "type": "object",
  "title": "node state document",
  "description": "node state document contains all the information about the node",
  "default": {},
  "examples": [
    {
      "name": "node_1",
      "id": "<uuid>",
      "job_queue_section": 2,
      "lastSeenAt": 1593249964788,
      "status": "ACTIVE",
      "metadata": {
        "createdAt": 1593249964732,
        "updatedAt": 1593249964788,
        "updatedBy": "<uuid>"
      }
    }
  ],
  "required": [
    "name",
    "id",
    "job_queue_section",
    "lastSeenAt",
    "status",
    "metadata"
  ],
  "additionalProperties": true,
  "properties": {
    "name": {
      "$id": "#/properties/name",
      "type": "string",
      "title": "The name of the node",
      "description": "Contains a human-readable name for the node.",
      "default": "",
      "examples": ["node_1"]
    },
    "id": {
      "$id": "#/properties/id",
      "type": "string",
      "title": "The id of the node",
      "description": "A <uuid> that the node is indentified by.",
      "default": "",
      "examples": ["<uuid>"]
    },
    "job_queue_section": {
      "$id": "#/properties/job_queue_section",
      "type": "integer",
      "title": "The node's job queue section",
      "description": "The section of the global job queue that the node is responsible for",
      "default": 0,
      "examples": [2]
    },
    "lastSeenAt": {
      "$id": "#/properties/lastSeenAt",
      "type": "integer",
      "title": "The node's last seen time",
      "description": "The last time the node checked in with the global state",
      "default": 0,
      "examples": [1593249964788]
    },
    "status": {
      "$id": "#/properties/status",
      "type": "string",
      "title": "The status of the node",
      "description": "One of the statuses listed below that the node could be in",
      "default": "ACTIVE",
      "examples": ["ACTIVE"],
      "enum": ["ACTIVE", "BUSY", "TERMINATED"]
    },
    "metadata": {
      "$id": "#/properties/metadata",
      "type": "object",
      "title": "The document's metadata",
      "description": "Some information about the document itself.",
      "default": {},
      "examples": [
        {
          "createdAt": 1593249964732,
          "updatedAt": 1593249964788,
          "updatedBy": "<uuid>"
        }
      ],
      "required": ["createdAt", "updatedAt", "updatedBy"],
      "additionalProperties": true,
      "properties": {
        "createdAt": {
          "$id": "#/properties/metadata/properties/createdAt",
          "type": "integer",
          "title": "The document's creation datetime",
          "description": "The datetime point, in UNIX time, that the document was created",
          "default": 0,
          "examples": [1593249964732]
        },
        "updatedAt": {
          "$id": "#/properties/metadata/properties/updatedAt",
          "type": "integer",
          "title": "The document's last update datetime",
          "description": "The datetime point, in UNIX time, that the document was updated",
          "default": 0,
          "examples": [1593249964788]
        },
        "updatedBy": {
          "$id": "#/properties/metadata/properties/updatedBy",
          "type": "string",
          "title": "The document's updater",
          "description": "The last node that updated this document",
          "default": "",
          "examples": ["<uuid>"]
        }
      }
    }
  }
}
```

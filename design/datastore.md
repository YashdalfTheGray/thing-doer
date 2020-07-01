# Datastore

This document covers the datastore. It details the schema of the collections and the availability considerations as well. Additionally, it also details potential options for the datastore, both while developing and also in production. The datastore contains the following collections and details and schemas are included below.

- `state`
- `jobs`
- `logs`
- `metrics`

## Collections

### The `state` collection

This collection of documents is representative of the state of the system at any point during the uptime. It contains information about each processor node available to take jobs in the system as well as the section of the job queue that they are responsible for. Additionally, this document is also kept updated with the latest heartbeat information from each node which serves as a way to determine when a node became unresponsive. The schema is included in Appendix A.

### The `jobs` collection

This collection of documents serves as the cumulative job queue for the system. Each node is assigned a section of this job queue and once a node gets assigned a job, it becomes the owner of the document that represents the job. The node is then expected to keep the document updated with the current state of the job as well as publish the results once the job is complete. Since this system is somewhat multipurpose, this collection maintains a complete history of all the jobs processed from the start of the collection. To be able to cull the size of this collection, a singular job deletion request and a batch job deletion request is supported by the system. The schema is included in Appendix B.

### The `logs` collection

### The `metrics` collection

## Appendices

### Appendix A - `state` collection schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://example.com/example.json",
  "type": "object",
  "title": "Node state document",
  "description": "Node state document contains all the information about the node.",
  "default": {},
  "examples": [
    {
      "name": "node_1",
      "id": "<uuid>",
      "jobQueueSection": 2,
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
    "jobQueueSection",
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
    "jobQueueSection": {
      "$id": "#/properties/jobQueueSection",
      "type": "integer",
      "title": "The node's job queue section",
      "description": "The section of the global job queue that the node is responsible for.",
      "default": 0,
      "examples": [2]
    },
    "lastSeenAt": {
      "$id": "#/properties/lastSeenAt",
      "type": "integer",
      "title": "The node's last seen time",
      "description": "The last time the node checked in with the global state.",
      "default": 0,
      "examples": [1593249964788]
    },
    "status": {
      "$id": "#/properties/status",
      "type": "string",
      "title": "The status of the node",
      "description": "One of the statuses listed below that the node could be in.",
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
          "description": "The datetime point, in UNIX time, that the document was created.",
          "default": 0,
          "examples": [1593249964732]
        },
        "updatedAt": {
          "$id": "#/properties/metadata/properties/updatedAt",
          "type": "integer",
          "title": "The document's last update datetime",
          "description": "The datetime point, in UNIX time, that the document was updated.",
          "default": 0,
          "examples": [1593249964788]
        },
        "updatedBy": {
          "$id": "#/properties/metadata/properties/updatedBy",
          "type": "string",
          "title": "The document's updater",
          "description": "The last node that updated this document.",
          "default": "",
          "examples": ["<uuid>"]
        }
      }
    }
  }
}
```

### Appendix B - `jobs` collection schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://example.com/example.json",
  "type": "object",
  "title": "Job document",
  "description": "A document that represents each job in the system.",
  "default": {},
  "examples": [
    {
      "jobName": "test_job",
      "jobId": "<uuid>",
      "jobNumber": 30,
      "status": "QUEUED",
      "input": {
        "type": "wait",
        "payload": {
          "millis": 5000
        }
      },
      "result": {},
      "metadata": {
        "createdAt": 1593341664912,
        "modifiedAt": 1593341664912,
        "updatedBy": "<uuid>"
      }
    }
  ],
  "required": [
    "jobName",
    "jobId",
    "jobNumber",
    "status",
    "input",
    "result",
    "metadata"
  ],
  "additionalProperties": true,
  "properties": {
    "jobName": {
      "$id": "#/properties/jobName",
      "type": "string",
      "title": "Name of the job",
      "description": "A human-readable job name given by the user.",
      "default": "",
      "examples": ["test_job"]
    },
    "jobId": {
      "$id": "#/properties/jobId",
      "type": "string",
      "title": "UUID of the job",
      "description": "A system generated ID given to the job.",
      "default": "",
      "examples": ["<uuid>"]
    },
    "jobNumber": {
      "$id": "#/properties/jobNumber",
      "type": "integer",
      "title": "The queue number of the job",
      "description": "The queue number determines which node will be assigned this job.",
      "default": 0,
      "examples": [30]
    },
    "status": {
      "$id": "#/properties/status",
      "type": "string",
      "title": "The job status",
      "description": "An enumerated status of the job.",
      "default": "",
      "examples": ["QUEUED"],
      "enum": ["QUEUED", "STARTED", "SUCCESSFUL", "FAILED", "ERROR"]
    },
    "input": {
      "$id": "#/properties/input",
      "type": "object",
      "title": "The input for the job",
      "description": "The input coming from the user for the job.",
      "default": {},
      "examples": [
        {
          "type": "wait",
          "payload": {
            "millis": 5000
          }
        }
      ],
      "required": ["type", "payload"],
      "additionalProperties": true,
      "properties": {
        "type": {
          "$id": "#/properties/input/properties/type",
          "type": "string",
          "title": "The type of the job",
          "description": "An enumeration to tell the node what to do.",
          "default": "",
          "examples": ["wait"]
        },
        "payload": {
          "$id": "#/properties/input/properties/payload",
          "type": "object",
          "title": "The (optional) payload that goes along with the type",
          "description": "The payload will be crosschecked against the expected payload for the type.",
          "default": {},
          "examples": [
            {
              "millis": 5000
            }
          ],
          "additionalProperties": true
        }
      }
    },
    "result": {
      "$id": "#/properties/result",
      "type": "object",
      "title": "The result of the job",
      "description": "This section will contain anything that the job produced as a result.",
      "default": {},
      "examples": [{}],
      "required": [],
      "additionalProperties": true,
      "properties": {}
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
          "description": "The datetime point, in UNIX time, that the document was created.",
          "default": 0,
          "examples": [1593249964732]
        },
        "updatedAt": {
          "$id": "#/properties/metadata/properties/updatedAt",
          "type": "integer",
          "title": "The document's last update datetime",
          "description": "The datetime point, in UNIX time, that the document was updated.",
          "default": 0,
          "examples": [1593249964788]
        },
        "updatedBy": {
          "$id": "#/properties/metadata/properties/updatedBy",
          "type": "string",
          "title": "The document's updater",
          "description": "The last node that updated this document.",
          "default": "",
          "examples": ["<uuid>"]
        }
      }
    }
  }
}
```

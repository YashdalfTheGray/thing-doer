# thing-doer

A distributed doer that does things as asked, in some kind of queue or something. More design to come. A lot of this design is the first thought and will change as the system evolves.

## Sections of this repository

### [Design](design/README.md)

This folder that goes over, in detail, what this thing doer looks like and what the architecture looks like. At a high level, each thing doer adds their state to a table and takes ownership of a job queue. Each incoming job gets assigned to a job queue and then picked up and processed.

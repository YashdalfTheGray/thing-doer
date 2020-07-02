# Processor Node

This document goes over the the design of each processor node in detail. It covers the possible states the processor node could be, each of the interactions that the processor node is responsible for in each of the states and how the it does the selection for the job that it's going to do.

The processor node is the actual "thing doer" in the system. Without one or more processor nodes, the job queue will never see a job picked up and processed. Furthermore, since each processor node is also responsible for adding jobs to the queue, no jobs will be queued in the system either. Consideration was given to a design where there is a queue manager node that enqueues jobs for the system but without processor nodes, no jobs would be processed and the job queue would continue to grow. Consequently, the ability to queue jobs is tied to the ability to be able to process the queued jobs.

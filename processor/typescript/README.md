# Processor - Typescript

This document details how to set up and run the Typescript version of the processor.

## Setup

The first thing that we need to create is a `.env` file. The contents of the file are as follows

```
SECRET_TOKEN=<an_auth_token>
```

## Running

There are two main ways of running this project, using Docker or using just the Node.js executable.

The docker way is to use `docker build -t processor-typescript .` to build the image and then `docker run -it --name test-processor processor-typescript:latest` to run the container built.

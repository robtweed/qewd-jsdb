# Using QEWD-JSdb with Piscina
 
Rob Tweed <rtweed@mgateway.com>  
23 June 2020, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)

# About this Document

This document provides details on how to use QEWD-JSdb with the 
[Piscina](https://github.com/piscinajs/piscina) Node.js Worker Thread Pool Module.

# Why Piscina?

Piscina, like QEWD, can create a run-time environment for safe execution of synchronous code.
By specifying Piscina's *concurrentTasksPerWorker* property value as 1, code that executes in
each Worker Thread has exclusive access to the Worker Thread and does not need to be concerned 
about concurrency.

The reason this is important is because all the QEWD-JSdb APIs are synchronous.

So, Piscina can be used as an alternative run-time environment to QEWD, and, conversely,
users of Piscina can take advantage of the unique Javascript database capabilities 
and very high performance
of QEWD-JSdb instead of using other, more 'traditional' databases.  

See the [other documentation](./README.md)
in this QEWD-JSdb repository to find out more about QEWD-JSdb.

# Pre-requisites

To use QEWD-JSdb with Piscina you'll need (in addition to Piscina itself and Node.js, of course):

- One of the supported databases:
  - [YottaDB](https://yottadb.com)
  - [IRIS](https://www.intersystems.com/products/intersystems-iris/)

- the [mg-dbx](https://github.com/chrisemunt/mg-dbx) interface module

- the [qewd-mg-dbx](https://github.com/robtweed/qewd-mg-dbx) normalising interface module

- the [ewd-document-store](https://github.com/robtweed/ewd-document-store) multi-model abstraction module


# Or use the Dockerised Version of QEWD

If you're not familiar with these databases, the quickest and simplest way to get started 
and try out QEWD-JSdb with Piscina is to use the
Dockerised versions of QEWD:

- *rtweed/qewd-server*: Linux version
- *rtweed/qewd-server-rpi*: Raspberry Pi-compatible version

Both these pre-built Docker Containers include a fully-working, pre-configured copy of YottaDB and
all the other dependencies (including Node.js and Piscina), all ready to run.  They also include a pre-worked
example/demo for you to play with.  Here's the steps:


## Make sure you have Docker Installed

If not, there's plenty of information out there on how to install it.  Remember, you can try this out
on either a Linux machine or a Raspberry Pi.


## Pull the Docker Container

Linux:

        docker pull rtweed/qewd-server

Raspberry Pi:

        docker pull rtweed/qewd-server-rpi


## Install the QEWD-JSdb Demonstration Repository

        cd ~
        git clone https://github.com/robtweed/qewd-jsdb

In the rest of the instructions I'm going to assume you installed it at ~/qewd-jsdb.  Modify the
paths as/where appropriate.


## Start the QEWD Container, but run it in debug mode (so QEWD itself doesn't start):


- Linux (assuming ~ is /home/ubuntu):

        docker run -it --name jsdb --rm -p 8080:8080 -v /home/ubuntu/qewd-jsdb:/opt/qewd/mapped --entrypoint /bin/bash rtweed/qewd-server

- Raspberry Pi

        docker run -it --name jsdb --rm -p 8080:8080 -v /home/pi/qewd-jsdb:/opt/qewd/mapped --entrypoint /bin/bash rtweed/qewd-server-rpi


## Navigate to the *piscina* Folder

        cd mapped/piscina

In there you'll see the following files:

- *jsdb-piscina.js*: Connects a Worker Thread to YottaDB and sets up the QEWD-JSdb abstraction

- *pworker.js*: Example Piscina Worker Thread module, including examples of using QEWD-JSdb

- *ptest.js*: Example Piscina main process module which starts a Worker Thread pool and sends a request to a
Worker Thread running *pworker.js*

## Try out the Demo

Make sure you're in the *mapped/piscina* folder, then:


        node ptest


# Next Steps

Read the QEWD-JSdb documentation and tutorials.  Watch the videos too.

Try setting up the tutorial exercises within the Piscina environment by modifying the example
I've described above.

Enjoy QEWD-JSdb!

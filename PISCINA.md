# Using QEWD-JSdb with Piscina
 
Rob Tweed <rtweed@mgateway.com>  
26 June 2020, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

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

- the [qewd-jsdb-piscina](https://github.com/robtweed/qewd-jsdb-piscina) module, which looks after
the connection between a Piscina Worker Thread and the database.


## Option 1: Use the Dockerised Version of QEWD

If you're not familiar with these databases, the quickest and simplest way to get started 
and try out QEWD-JSdb with Piscina is to use the
Dockerised versions of QEWD:

- *rtweed/qewd-server*: Linux version
- *rtweed/qewd-server-rpi*: Raspberry Pi-compatible version

Both these pre-built Docker Containers include a fully-working, pre-configured copy of YottaDB and
all the other dependencies (including Node.js and Piscina), all ready to run.  They also include a pre-worked
example/demo for you to play with.  Here's the steps:


### Make sure you have Docker Installed

If not, there's plenty of information out there on how to install it.  Remember, you can try this out
on either a Linux machine or a Raspberry Pi.


### Pull the Docker Container

Linux:

        docker pull rtweed/qewd-server

Raspberry Pi:

        docker pull rtweed/qewd-server-rpi


### Install the QEWD-JSdb Demonstration Repository

        cd ~
        git clone https://github.com/robtweed/qewd-jsdb

In the rest of the instructions I'm going to assume you installed it at ~/qewd-jsdb.  Modify the
paths as/where appropriate.


### Start the QEWD Container, but run it in debug mode (so QEWD itself doesn't start):


- Linux (assuming ~ is /home/ubuntu):

        docker run -it --name jsdb --rm -p 8080:8080 -v /home/ubuntu/qewd-jsdb:/opt/qewd/mapped --entrypoint /bin/bash rtweed/qewd-server

- Raspberry Pi

        docker run -it --name jsdb --rm -p 8080:8080 -v /home/pi/qewd-jsdb:/opt/qewd/mapped --entrypoint /bin/bash rtweed/qewd-server-rpi


### Install the Example

Navigate to the *qewd-jsdb-piscina* module folder

        cd node_modules/qewd-jsdb-piscina/examples

In there you'll see the following files:

- *pworker.js*: Example Piscina Worker Thread module, including examples of using QEWD-JSdb

- *pmain.js*: Example Piscina main process module which starts a Worker Thread pool and sends a request to a
Worker Thread running *pworker.js*

Copy them to the */opt/qewd/mapped* folder

        cp * /opt/qewd/mapped

### Try out the Example

Make sure you're in the */opt/qewd/mapped* folder

        cd /opt/qewd/mapped

Then:


        node pmain


You should see output similar to this:

        user@ubuntu:~$ node pmain

        (node:20425) ExperimentalWarning: The ESM module loader is experimental.

        [ ]
        by_id,1,city: Redhill
        by_id,1,gender: m
        by_id,1,name: Rob
        by_id,2,city: St Albans
        by_id,2,gender: m
        by_id,2,name: Simon
        by_id,3,city: Carshalton
        by_id,3,gender: f
        by_id,3,name: Helen
        id_counter: 3
        viewed: Thu, 25 Jun 2020 14:42:13 GMT
        ix = by_id
          ix2: 1
            ix3: city: Redhill
            ix3: gender: m
            ix3: name: Rob
          ix2: 2
            ix3: city: St Albans
            ix3: gender: m
            ix3: name: Simon
          ix2: 3
            ix3: city: Carshalton
            ix3: gender: f
            ix3: name: Helen
        ix = id_counter
        ix = viewed
        worker completed


If so, you have Piscina working correctly with QEWD-JSdb, using the copy of
YottaDB within the Docker Container.

Take a look at the *pworker.js* module file to see how it used QEWD-JSdb.

----

## Option 2: Use a Local Instance of YottaDB on Your Server

### Install and Configure YottaDB

If you've already got Node.js and Piscina installed on a server, it's actually very quick 
and easy to install and 
configure YottaDB for general-purpose usage.  For example, on Ubuntu Linux:

- Ensure you have the necessary dependencies installed:

        sudo apt-get update
        sudo apt-get install binutils

- Fetch the installer:

        mkdir /tmp/tmp
        wget -P /tmp/tmp https://gitlab.com/YottaDB/DB/YDB/raw/master/sr_unix/ydbinstall.sh

- Make it executable:

        cd /tmp/tmp
        chmod +x ydbinstall.sh

- Run the installer with default settings and set up the environment:

        sudo ./ydbinstall.sh --utf8 default --verbose
        source /usr/local/lib/yottadb/r128/ydb_env_set
        cd ~


YottaDB should now be ready for use.


### Install *qewd-jsdb-piscina*

        npm install qewd-jsdb-piscina


### Copy the Example files 

Copy the two files from *node_modules/qewd-jsdb-piscina/examples* to, for
example, your home directory

- *pworker.js*: Example Piscina Worker Thread module, including examples of using QEWD-JSdb

- *pmain.js*: Example Piscina main process module which starts a Worker Thread pool and sends a request to a
Worker Thread running *pworker.js*


### Run the Example

        node pmain

You should see output similar to this:

        user@ubuntu:~$ node pmain

        (node:20425) ExperimentalWarning: The ESM module loader is experimental.

        [ ]
        by_id,1,city: Redhill
        by_id,1,gender: m
        by_id,1,name: Rob
        by_id,2,city: St Albans
        by_id,2,gender: m
        by_id,2,name: Simon
        by_id,3,city: Carshalton
        by_id,3,gender: f
        by_id,3,name: Helen
        id_counter: 3
        viewed: Thu, 25 Jun 2020 14:42:13 GMT
        ix = by_id
          ix2: 1
            ix3: city: Redhill
            ix3: gender: m
            ix3: name: Rob
          ix2: 2
            ix3: city: St Albans
            ix3: gender: m
            ix3: name: Simon
          ix2: 3
            ix3: city: Carshalton
            ix3: gender: f
            ix3: name: Helen
        ix = id_counter
        ix = viewed
        worker completed


If so, you have Piscina working correctly with QEWD-JSdb, using a local copy of YottaDB!

Take a look at the *pworker.js* module file to see how it used QEWD-JSdb.


### Uninstalling YottaDB

Should you decide not to use YottaDB, it can be uninstalled as follows (assuming you used the default installation):

- make sure you've stopped any processes that are accessing YottaDB or QEWD-JSdb

- Run the following commands to clear down YottaDB:

        sudo rm -r /usr/local/lib/yottadb
        sudo rm -r $HOME/.yottadb
        sudo rm /usr/share/pkgconfig/yottadb.pc
        unset $(compgen -v | grep "ydb")
        unset $(compgen -v | grep "gtm")

----


# Next Steps

Read the [QEWD-JSdb documentation and tutorials](https://github.com/robtweed/qewd-jsdb).  Watch the videos too.

Try setting up the tutorial exercises within the Piscina environment by modifying the example
I've described above.

Enjoy QEWD-JSdb!

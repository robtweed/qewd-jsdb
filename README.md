# qewd-jsdb: Showcase for In-process multi-model JavaScript Database
 
Rob Tweed <rtweed@mgateway.com>  
29 November 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)


# About this Repository

This repository is a showcase demonstrating the power and capabilities of *QEWD-JSdb*.

It includes 2 versions:

1) A Dockerised version of QEWD that will run on any Linux system or on a Raspberry Pi

2) A version that will run on the InterSystems 
[AWS Community Edition of IRIS](https://aws.amazon.com/marketplace/pp/B07MSHYLF1?qid=1575041206953&sr=0-1&ref_=srh_res_product_title)


# What is QEWD-JSdb?

Every instance of [QEWD](https://github.com/robtweed/qewd) includes an in-process
multi-model database which we refer to as *QEWD-JSdb*.

This database is powered by one of two actual database technologies:

1) The Open Source [YottaDB](https://yottadb.com/), which is the database bundled into
the ]Dockerised version of QEWD](https://hub.docker.com/r/rtweed/qewd-server)

2) The proprietary [IRIS](https://www.intersystems.com/products/intersystems-iris/) database from InterSystems

As far as QEWD-JSdb is concerned, both these databases work identically, and all the QEWD-JSdb
database models are fully-supported in both databases.

QEWD-JSdb is a mult-model SQL & NoSQL Database which currently supports:

  - document database / persistent JavaScript Objects
  - Redis-like Lists
  - Redis-like Key/Value store
  - Relational Database (with SQL support)
  - Persistent XML DOM (with XPath support)

Further database models (eg Graph) would easily be possible to develop in future.

You can create and maintain any or all of these database models simultaneously, and, indeed you can
apply different views to the same physical database.

What really sets QEWD-JSdb apart from every other database you're likely to come across is that it
runs in-process with Node.js (ie rather than running on a separate server, linked to Node.js via a
network connection).  JavaScript is used to directly manipulate the database, and the various
database models (with the exception of the Relational abstraction) are implemented directly in
JavaScript / Node.js.  You can find the actual logic for these database models in the
[ewd-document-store](https://github.com/robtweed/ewd-document-store) repository.

In QEWD-JSdb, the JavaScript you write in Node.js has an intimate relationship with the database, and
it blurs the use of in-memory versus persistent on-disk data structures.

It's also incredibly fast: both YottaDB and IRIS are extremely high-performance databases, capable of
reading and writing millions of key/value pairs per second, even on modest hardware.

This showcase is designed to allow you to quickly discover the unique and incredible 
capabalities of QEWD-JSdb.


# What is Included in this Showcase Repository?

This repository includes:

- a very rapid installer script for the Dockerised version, which will allow you to be fully up and
running in literally just a few minutes

- alternatively, a simple set of steps to get it fully working with the AWS-based IRIS Community
Edition

- a set of browser-based *explorer* pages, each of which demonstrates the capabilities of 
one of the supported database models:

  - document database / persistent JavaScript Objects
  - Redis-like Lists
  - Redis-like Key/Value store
  - Relational Database (with SQL support)
  - Persistent XML DOM (with XPath support)

- a WebSocket-based browser viewer page that allows you to view, in real-time,
 changes made the physical database via the above explorer web pages



## Try it out

For the IRIS / AWS Version, see [these instructions](./IRIS.md).

However, the quickest way to try out QEWD is using the pre-built Docker version which will run on
any Linux system or even on a Raspberry Pi.

Here's all you need to do:

        cd ~
        git clone https://github.com/robtweed/qewd-jsdb
        cd qewd-jsdb
        source install.sh

Simply answer the questions and within a few minutes you'll have it all ready to run.

Don't worry if you don't have Docker installed (which is the only dependency) - the installer
will also install Docker if necessary (though you'll need to start a new process and re-run
the installer after it installs Docker).


When the installer has completed you have two options for starting the Docker container:

- without database persistence between Container restarts:

        cd ~/qewd-jsdb
        ./start

- with database persistence between Container restarts:


        cd ~/qewd-jsdb
        ./start_p


To stop the Docker Container, you should always use the command:

        cd ~/qewd-jsdb
        ./stop

This cleanly and safely shuts down the database-connected QEWD Worker Processes



# The Viewer Application

Use the following URL in your browser:

        http://xx.xx.xx.xx:8080/viewer

        (Change the IP Address / Domain name to that of your server)

This is a simple QEWD WebSocket application that will display, in real-time,
 any changes made by the explorer applications or during REPL-based exploration of
 QEWD-JSdb.


# The REPL-based Explorer

I'd recommend that you start by exploring QEWD-JSdb using the Node.js REPL.  
You can use the viewer application (see above)
to see, in real-time, the effect on the database of your QEWD-JSdb interactions.  See 
[here for detailed instructions](./REPL.md) on using this REPL explorer mode.  It really
is the best way to begin to understand QEWD-JSdb.


# The Explorer Applications


There's also a QEWD application/page for each of the supported QEWD-JSdb models.  Each application
showcases/demonstrates the capabilities specific to the particular database model.

Start them as follows:

- Document Database / Persistent JavaScript Objects

        http://xx.xx.xx.xx:8080/document

- [Redis-Like Key/Value Store](./KVS.md)

        http://xx.xx.xx.xx:8080/kvs


- [Redis-like Lists](./LISTS.md)

        http://xx.xx.xx.xx:8080/lists


- [Relational Database](./RDB.md)

        http://xx.xx.xx.xx:8080/rdb

- [Persistent XML DOM](./DOM.md)

        http://xx.xx.xx.xx:8080/dom


Each of these allows you to explore many of the capabilities of each database model, showing you, in 
real time, how the data is physically stored and manipulated in the YottaDB database in response to the various
database model APIs, and how that data is projected via
QEWD-JSdb's the persistent JavaScript object abstraction.


# What Can I do with QEWD-JSdb?

The full functionality of QEWD-JSdb is built-in to QEWD, and available for you to use in your
applications if you wish.  You can use QEWD-JSdb instead of any other more "traditional" database.

Take a look at the source code in this *QEWD-jsdb* repository to see how quick, simple and
easy it is to use:

- See how the [front-end of QEWD Web-Socket Applications](https://github.com/robtweed/qewd-jsdb/tree/master/www) 
can be very simply and rapidly built.  In particular look at the *app.js* files, eg:

        https://github.com/robtweed/qewd-jsdb/blob/master/www/document/js/app.js

- See how the [back-end Web-Socket message handler functions](https://github.com/robtweed/qewd-jsdb/tree/master/qewd-apps)
 are defined for each of the explorer applications.

- See [further details on developing QEWD Applications](https://github.com/robtweed/qewd/tree/master/up)

- See also [the Advanced User Guides](https://github.com/robtweed/qewd/tree/master/up/docs)


# Try the QEWD-Monitor Application

Start the QEWD-Monitor application in your browser using the URL:

        http://x.x.x.x:8080/qewd-monitor

You'll need to enter the QEWD Management password which, by default, is *keepThisSecret!*.  You'll
have been asked to specify a password in the installation script.

You'll now see the Overview panel, from where you can monitor your QEWD run-time environment, view the master and worker process activity.

Click the tabs in the banner to view your YottDB Global Storage and inspect any QEWD Sessions.


# Backing up the YottaDB Database

It's a good idea to back up your YottaDB database on a regular basis.  Simply do the following:

- shell into the container:

        docker exec -it jsdb bash

- run the backup command:

        ./backup

Optionally you can specify a file path if you want to create your own named backup file, rather than
use the default:

        ./backup path/to/file


Important: the Docker Container's internal */opt/qewd/mapped* directory is volume-mapped to
the host system's *~/qewd-jsdb* directory, so always create your backup files somewhere within this mapped
directory.



## License

 Copyright (c) 2019 M/Gateway Developments Ltd,                           
 Redhill, Surrey UK.                                                      
 All rights reserved.                                                     
                                                                           
  http://www.mgateway.com                                                  
  Email: rtweed@mgateway.com                                               
                                                                           
                                                                           
  Licensed under the Apache License, Version 2.0 (the "License");          
  you may not use this file except in compliance with the License.         
  You may obtain a copy of the License at                                  
                                                                           
      http://www.apache.org/licenses/LICENSE-2.0                           
                                                                           
  Unless required by applicable law or agreed to in writing, software      
  distributed under the License is distributed on an "AS IS" BASIS,        
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
  See the License for the specific language governing permissions and      
   limitations under the License.      

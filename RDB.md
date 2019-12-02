# The QEWD-JSdb RDB Database Model
 
Rob Tweed <rtweed@mgateway.com>  
2 December 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)

# About this Document

This document provides background information on the *Relational Database (RDB)* database model that
is included with QEWD-JSdb.

# About the RDB Database Model

The *RDB* database model implements a Relational Database model on top of the QEWD-JSdb/Global Storage 
hierarchical storage.

The *RDB* database model includes SQL support.  The supported SQL syntax adheres closely to the
SQL standard, with one or two variations (as is usually the case in the RDBMS world).  The
following are currently supported:

- Table Creates and Drops
- Inserts
- Selects (both within single and across multiple tables)

Before proceeding it is recommended that:

- you first read and complete the [basic QEWD-JSdb tutorial](./REPL.md).  This will ensure you 
understand what's going on in the QEWD-JSdb and why!
- you start the *viewer* browser-based application to allow you to see the effect, in real time,
of the operation of the *KVS* APIs on the physical database storage.


# Starting the Viewer Application

To start the *viewer* application, use the URL:

        http://xx.xx.xx.xx:8080/viewer

Replace the *x'* with the IP address or domain name of the server on which you're running QEWD-JSdb.

Initially it won't show much, but don't worry, it will automatically spring into life!


# Starting the RDB Explorer

Open another browser window.  Ideally you'll also want to be able to see and watch the *viewer*
browser window, so have them in separate windows or screens, rather than in separate tabs where you
can only see one at a time.

To start the *RDB* Explorer application, use the URL:

        http://xx.xx.xx.xx:8080/rdb

Replace the *x'* with the IP address or domain name of the server on which you're running QEWD-JSdb.


# About the RDB Explorer Application

This browser-based application allows you to see the main QEWD-JSdb *RDB* APIs in action, and,
together with the *viewer* application, see, in real-time, how they make use of the underlying Global Storage
database.

## Source Code for the RDB APIs

Unlike the other QEWD-JSdb APIs, the underlying logic used by the *RDB* model actually runs
natively within the Global Storage database environment (known in that environment as *routines*).  

These routines are all Open Source, and
you are free to inspect and use the code as you wish, in accordance with the Apache 2 license under
which they are made available.

The *RDB* APIs themselves are implemented in JavaScript, and provide an interface to the
Global Storage-based *routines*.  Once again, these interface APIs are made available as Apache 2
licensed source code.

Find the [RDB API interface code here](https://github.com/robtweed/ewd-document-store/tree/master/lib/proto/rdb).

if you're interested in seeing the Global Storage-side *routines* source code and
detailed documentation for their use, [click here](https://github.com/chrisemunt/mgsql).



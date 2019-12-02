# The QEWD-JSdb Lists Database Model
 
Rob Tweed <rtweed@mgateway.com>  
2 December 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)

# About this Document

This document provides background information on the *Lists* NoSQL database model that
is included with QEWD-JSdb.

# About the Lists Database Model

The *Lists* database model is inspired by the [Lists data type](https://redis.io/topics/data-types)
 in the Redis NoSQL database.

It's a very simple data model with which you can implement high-performance stacks or queues,
and a good introduction to the additional multi-model database capabilities provided by QEWD-JSdb.

Before proceeding it is recommended that:

- you first read and complete the [basic QEWD-JSdb tutorial](./REPL.md).  This will ensure you 
understand what's going on in the QEWD-JSdb and why!
- you start the *viewer* browser-based application to allow you to see the effect, in real time,
of the operation of the *Lists* APIs on the physical database storage.


# Starting the Viewer Application

To start the *viewer* application, use the URL:

        http://xx.xx.xx.xx:8080/viewer

Replace the *x'* with the IP address or domain name of the server on which you're running QEWD-JSdb.

Initially it won't show much, but don't worry, it will automatically spring into life!


# Starting the Lists Explorer

Open another browser window.  Ideally you'll also want to be able to see and watch the *viewer*
browser window, so have them in separate windows or screens, rather than in separate tabs where you
can only see one at a time.

To start the *Lists* Explorer application, use the URL:

        http://xx.xx.xx.xx:8080/lists

Replace the *x'* with the IP address or domain name of the server on which you're running QEWD-JSdb.


# About the Lists Explorer Application

This browser-based application allows you to see all of the QEWD-JSdb *Lists* APIs in action, and,
together with the *viewer* application, see, in real-time, how they make use of the underlying Global Storage
database.

## Source Code for the Lists APIs

Like all the QEWD-JSdb APIs, they are written in JavaScript.  They are all Open Source APIs, and
you are free to inspect and use the code as you wish, in accordance with the Apache 2 license under
which they are made available.

Find the [Lists source code here](https://github.com/robtweed/ewd-document-store/tree/master/lib/proto/list).




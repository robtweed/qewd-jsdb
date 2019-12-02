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

The Lists application has deliberately been written as a very simple, un-sexy-looking, plain HTML
and JavaScript/jQuery application.  The reason is to allow developers to be able to quickly discover
and understand how it works by looking at its source code, without the obfuscation that would result
from the addition of a JavaScript framework such as Angular, Vue or React.  However, all the logic
can be applied to and integrated with any front-end JavaScript framework.

## Source Code for the Lists Explorer Application

Click the links below to view the code.

- [browser-side HTML](https://github.com/robtweed/qewd-jsdb/blob/master/www/lists/index.html)
- [browser-side JavaScript/jQuery](https://github.com/robtweed/qewd-jsdb/blob/master/www/lists/js/app.js)
- [server-side message handlers](https://github.com/robtweed/qewd-jsdb/tree/master/qewd-apps/jsdb-lists)

The application has been built in accordance with the [QEWD-Up](https://github.com/robtweed/qewd/blob/master/up/docs/InteractiveApps.md)
 design framework for interactive applications.

## Source Code for the QEWD-JSdb Lists APIs

Like all the QEWD-JSdb APIs, the QEWD-JSDB Lists APIs that are used by the Lists Explorer application
 are written in JavaScript.  They are all Open Source APIs, and
you are free to inspect and use the code as you wish, in accordance with the Apache 2 license under
which they are made available.

Find the [Lists source code here](https://github.com/robtweed/ewd-document-store/tree/master/lib/proto/list).


## Usage Notes on the Lists Explorer Application

In the top row of the table you'll see the first of a set of pre-created record objects which will
be used to populate a *List*.  Each time you push a record into the *List* using either the
*lpush()* or *rpush()* methods, the next one will appear in the top table row.

You can click the button in the second table row at any time to clear down the *List*.  If you do so, 
the first table row will return to displaying the first of its pre-created records.

Records are added to the *List* using:

- lpush(): adds the record to the top of the *List*
- rpush(): adds the record to the end of the *List*
- insert_before(): inserts the record to the *List* before the specified list sequence position

Record can be popped off the *List* and returned as a JavaScript object using:

- lpop(): removes and returns the record on the top of the *List*
- rpop(): removes and returns the last record on the *List*

You can view a range of members of the *List* using the *lrange()* method.  It takes two arguments:

- from: integer specifying the start position in the *List* from which you're interested in viewing
- to: integer specifying the end position in the *List* at which you're interested in viewing

Note that *lrange()* does not remove the items from the *List*.

You can trim the *List* using the *ltrim()* method.  This removes all *List* members apart from those
initially in the position range you specify.  The arguments are the same as for *lrange()*.






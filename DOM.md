# The QEWD-JSdb DOM Database Model
 
Rob Tweed <rtweed@mgateway.com>  
2 December 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)

# About this Document

This document provides background information on the *Persistent XML Document Object Model (DOM)*
 NoSQL database model that is included with QEWD-JSdb.

# About the DOM Database Model

The *DOM* database model is an implementation of the [W3C XML DOM API](https://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/introduction.html).
The implementation is currently somewhere between W3C's Levels 2 and 3 in terms of its standards adherence,
but is sufficiently complete to integrate correctly with the 3rd-party [Node.js XPath module](https://www.npmjs.com/package/xpath)
which is a dependency of the DOM API implementation. 

Unlike the usual XML DOM implementations, it is implemented in the persistent storage provided
by QEWD-JSdb, rather than in-memory.  This means that the documents can be stored as pre-parsed
XML DOMs, and can be searched at any time in-situ within the database using standard XPath queries.

In effect, the QEWD-JSdb *DOM* model provides you with a [Native XML Database](http://www.rpbourret.com/xml/XMLAndDatabases.htm).
One of the most well-known of such products is [MarkLogic](https://en.wikipedia.org/wiki/MarkLogic) which
has evolved from its original XML database roots.

A good resource for learning about the XML DOM APIs, how they work and how they can be used is the
[W3Schools XML DOM Tutorial](https://www.w3schools.com/xml/dom_intro.asp).  The only difference is that
the examples in those tutorials will be working with in-memory XML DOMs, whereas you'll be using
DOMs in database storage.


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


# Starting the DOM Explorer

Open another browser window.  Ideally you'll also want to be able to see and watch the *viewer*
browser window, so have them in separate windows or screens, rather than in separate tabs where you
can only see one at a time.

To start the *DOM* Explorer application, use the URL:

        http://xx.xx.xx.xx:8080/dom

Replace the *x'* with the IP address or domain name of the server on which you're running QEWD-JSdb.


# About the DOM Explorer Application

This browser-based application allows you to see some of the most commonly-used 
QEWD-JSdb *DOM* APIs in action, and,
together with the *viewer* application, see, in real-time, how they make use of the underlying Global Storage
database.

## Source Code for the DOM APIs

Like all the QEWD-JSdb APIs, they are written in JavaScript.  They are all Open Source APIs, and
you are free to inspect and use the code as you wish, in accordance with the Apache 2 license under
which they are made available.

Find the [DOM source code here](https://github.com/robtweed/ewd-document-store/tree/master/lib/proto/dom).


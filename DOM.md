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

The Lists application has deliberately been written as a very simple, un-sexy-looking, plain HTML
and JavaScript/jQuery application.  The reason is to allow developers to be able to quickly discover
and understand how it works by looking at its source code, without the obfuscation that would result
from the addition of a JavaScript framework such as Angular, Vue or React.  However, all the logic
can be applied to and integrated with any front-end JavaScript framework.


## Source Code for the DOM Explorer Application

Click the links below to view the code.

- [browser-side HTML](https://github.com/robtweed/qewd-jsdb/blob/master/www/dom/index.html)
- [browser-side JavaScript/jQuery](https://github.com/robtweed/qewd-jsdb/blob/master/www/dom/js/app.js)
- [server-side message handlers](https://github.com/robtweed/qewd-jsdb/tree/master/qewd-apps/jsdb-dom)

The application has been built in accordance with the [QEWD-Up](https://github.com/robtweed/qewd/blob/master/up/docs/InteractiveApps.md)
 design framework for interactive applications.


## Source Code for the DOM APIs

Like all the QEWD-JSdb APIs, they are written in JavaScript.  They are all Open Source APIs, and
you are free to inspect and use the code as you wish, in accordance with the Apache 2 license under
which they are made available.

Find the [DOM source code here](https://github.com/robtweed/ewd-document-store/tree/master/lib/proto/dom).


## Enabling Use of the DOM APIs

You can create and maintain a *DOM* at any QEWD-JSdb Document Node Object.

Having instantiated the Document Object Node object, you must enable its use of the *DOM* APIs.
For example, from within a QEWD-Up back-end message handler module:

        doc = this.documentStore.use('jsdbDom', 'demo')
        doc.enable_dom()

or when using the *jsdb_shell* REPL module:

        doc = jsdb.use('jsdbDom', 'demo')
        doc.enable_dom()

The Document Node object will be augmented with a *dom* property object, via which you can invoke
the *DOM* APIs, eg:


        documentNode = doc.dom.createDocument();


# Usage Notes on the DOM Explorer Application


## Test Data Sources

In the top row of the table you'll see an example XML document which will
be used to populate the *DOM*.

You'll also see a *Toggle* button which, when pressed, will reveal a JSON document
(for those who work in healthcare, you'll recognise it as a FHIR Patient Resource
document).

The QEWD-JSdb *DOM* APIs can optionally parse and ingest JSON and convert them to
DOM format (ie rather than using the more usual ingestion mechanism using *setDocument()*.
We'll see later when and why this alternative DOM-based approach is of benefit.

Click the *Toggle* button again and the XML document will re-appear.

## Clearing Down the DOM

You can click the button in the second table row at any time to clear down the *DOM*.


## Ingesting an XML Document and Saving it as a DOM

Make sure in Row 1 that the sample XML Document is showing.

Then, in Row 3, click the *Parse as XML* button.

In the *viewer* application you'll see a large amount of records appearing.  What has happened
is that the XML document has been parsed - which is a 2-layer process:

- the QEWD-JSdb DOM parser uses the 3rd-party [Node.js *sax* parser](https://www.npmjs.com/package/sax)
- events fired by the *sax* parser invoke QEWD-JSDB DOM API methods to create the persistent
representations of the various Nodes that represent the structure and content of the XML 
document.

So we now have the XML Document stored in DOM format in our database.  Now we can begin exploring and
manipulating it via the XML DOM API methods.


## Outputting the DOM as XML

One of the things we'll want to do is return the original XML Document from its DOM format.  See 
the DOM Explorer Table row 4.

Click the *Output as XML* button and you'll see the original XML being returned.  This has been
created by the QEWD-JSdb DOM *output()* API which traverses its way through the child and sibling
properties of the DOM, constructing the XML along the way.

Optionally you can set the indentation applied to the output formatting at each level of 
XML tree hierarchy.


## getElementsByTagName

One of probably the two most frequently used DOM APIs is *getElementsByTagName*.  You're probably
familiar with this API as it is part of the HTML DOM API (which is closely related to the XML DOM API).
However, whereas in the HTML DOM, the API is being applied against an in-memory DOM, here we're
applying it against an on-disk DOM.

You can try out this API in row 5 of the Explorer.

Enter a tag name to search for in the *TagName* text box, eg try:

      foo

What you'll see returned is an array of objects, with each object containing key properties of the
DOM Node that represents each *<foo>* element it found, specifically its:

- nodeName: which will of course, be *foo*
- nodeType: which will always be 1 for an XML Element
- text: any text between the opening and closing *<foo>* tag
- attributes: any attributes belonging to the *<foo>* tag


Interestingly, according to the XML DOM specification, *getElementsByTagName()* should return a
data structure it calls a *NodeList*, which is an *active* structure, in the sense that if
any physical changes are made to the DOM (like insertions or deletions of *foo* nodes), then
the *NodeList* should automatically change (ie you shouldn't need to make a further call to
*getElementsByTagName()* to refresh the results).

QEWD-JSdb implements this active *NodeList* using a Node.js *Proxy Object*.  It's actually a
good use-case for these somewhat estoric types of Object in Node.js.  If you're
interested in its implementation, [click here](https://github.com/robtweed/ewd-document-store/blob/master/lib/proto/dom/getElementsByTagName.js).


## getElementById

The second most frequently used DOM APIs is probably *getElementById*.  You're probably
also familiar with this API as it is also part of the HTML DOM API (which is closely related to the XML DOM API).
However, whereas in the HTML DOM, the API is being applied against an in-memory DOM, here we're
applying it against an on-disk DOM.

You can try out this API in row 6 of the Explorer.

Enter the value of an *id* attribute that you want to find in the DOM into the 
*Id* text box.  For example try:

      peters

As *id* attributes must be unique in an XML Document, this API just returns a single matching
object, containing the same Node properties as you saw returned by *getElementsByTagName()* above.


## XPath Queries

The most commonly used way to query an XML DOM is to use [XPath](https://www.w3schools.com/xml/xml_xpath.asp).
  The QEWD-JSdb actually makes use of the standard 3rd-party [Node.js XPath module](https://www.npmjs.com/package/xpath)
which has no idea that the DOM it's processing is on-disk rather than in-memory!

You can try firing XPath queries at your persist DOM in the Explorer's row 7.

Enter the XPath query into the text box, eg try this:

      //foo

What this is requesting is to return any *<foo>* tag that appears anywhere in the DOM.


The output format of the result (see the right-hand column of the Explorer) 
is the same as for *getElementsByTagName()* above.

If you're new to XPath, take a look at [this document](https://github.com/robtweed/qewd-jsdb/blob/master/xpath_query_examples.txt) 
that I've created.  It lists a wide variety of both simple and complex XPath queries to try out.



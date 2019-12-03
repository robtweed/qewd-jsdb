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

One key piece of XML DOM terminology, by the way: Elements are, in effect, XML tags, eg *<foo />*.


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


## Modifying the DOM In-situ


One of the powerful features of the XML DOM API is the ability it provides you with to modify the
document it represents.  You can extract out entire sub-trees of the XML document hierarchy and 
move them by re-attaching them somewhere else in the DOM.  

You can even remove individual intermediate Element whilst
shuffling-up its child nodes to take its place.

The DOM Explorer provides you with 2 demonstrations of what's possible.

### Removing an Element and its Children

In Row 8, you can specify a target Element by its Id Attribute value and remove it and all its
child Elements.  For example, in the *Parent Element Id* text box enter:

        foo2

Click the *Remove an Element and Children* button.  You'll probably see in the *viewer* page
that something has changed, but scroll back up to row 4 and click the *Output as XML* button and
you'll see what's happened to the XML Document - the entire *foo2* sub-tree of XML has
been removed!

You can re-instate the DOM by Clicking the *Clear Down Saved DOM* button in row 2, and then
re-parse the XML Document in row 3.


## Removing an Element, but Leaving its Children In the XML Document

In Row 9 you can do the same thing as before, ie in the *Element Id* text box, enter again:

        foo2

and Click the *Remove Element Leave Children* button.  Again you might see some changes in
the *viewer* application, but to see what's actually occurred, go back and click the
*Output as XML* button (row 4)

This time you'll see that the *foo2* tag has disappeared, and its child Elements have moved
up in the tree hierarchy to take its place.  All done with 1 command - this is powerful stuff!


## Adding new Elements into an XML Document

It's just as easy to add new Elements anywhere you like into the XML Document.  
This is demonstrated in row 10, showing the *appendElement* API in action.

Let's start by applying it to our parsed XML Document (make sure you re-instate
the full example by deleting and re-parsing).

First you need to identify an existing Element that you want to use as the parent Element for the
one you're going to add.  In the *Parent Element (#id or XPath)* text box you can either enter
an *id* Attribute value or an XPath query in order to identify the target parent Element.

To specify an *id*, prefix it with a *#*, eg:

        #foo2

If you use an XPath query, it must be one that returns a single matching node, for example,
you could get to the same Element by a query to find the 2nd *<foo>* tag:

        //foo[2]

or the *<foo>* tag with a *location* Attribute having a value of *Town*:

        //foo[@location="Town"]


Next, in the *New Element Tag* text box, enter a complete XML tag.  It can include Attributes and
text.  If it includes text, it must also include a closing tag.  If it doesn't include text,
it must use the *self-closing* XML tag syntax.  Here's some examples:

        <example />

        <example id="myNewTag" />

        <example id="myNewTag" hello="world" />

        <example>Some text</example>

        <example id="myNewTag" hello="world">Some text</example>

Click the *AppendElement* button and then go back and use the *Output as XML* button
to see what's happened.  You should see that your new tag has been appended as the
last child Element of the parent Element you'd selected!


# Using the DOM API to build an XML Document From Scratch

So now let's have some real fun.  So far we've been working with an existing XML
document that we ingested into the DOM.  However, that's not the only way you
can use the XML DOM API.  You can actually use it to build an XML document from
scratch manually.

First thing is to go back to row 2 and delete the DOM, so we have a clean slate.
Make sure you also have the *viewer* application in sight - you'll be able to see
how the tags you add are abstracted into the DOM data structures.

Scroll back down the DOM Explorer and for the *Parent Element*, this time, in the
*Parent Element* text box specify

        #document

That's a shorthand for the DOM's *DocumentNode* - the very top of the DOM hierarchy, and a 
"notional* node you don't normally need to worry about or see.  

If you'd tried specifying *#document* before, you'd
have received an error, because in an XML DOM there can only be 1 instance of what's called
the *DocumentElement* which is the actual XML tag at the top of the hierarchy.

However, we've just cleared down the DOM, so there's now neither a *DocumentNode* nor a *DocumentElement*.

In the *New Element Tag* text box, let's just add a very simple self-closing tag with an id:

        <foo id="top" />

Click the *appendElement* button

Take a look in the *viewer* and you'll see that it's created quite a lot of stuff!

        ^jsdbDom("demo","documentElement")=2
        ^jsdbDom("demo","documentNode")=1
        ^jsdbDom("demo","index","by_id","top")=2
        ^jsdbDom("demo","index","by_nodeName",1,"foo",2)=""
        ^jsdbDom("demo","index","by_nodeName",2,"id",3)=""
        ^jsdbDom("demo","index","by_nodeName",9,"#document",1)=""
        ^jsdbDom("demo","index","by_nodeType",1,2)=""
        ^jsdbDom("demo","index","by_nodeType",2,3)=""
        ^jsdbDom("demo","index","by_nodeType",9,1)=""
        ^jsdbDom("demo","nextNodeNo")=3
        ^jsdbDom("demo","node",1,"firstChild")=2
        ^jsdbDom("demo","node",1,"lastChild")=2
        ^jsdbDom("demo","node",1,"nodeName")="#document"
        ^jsdbDom("demo","node",1,"nodeNo")=1
        ^jsdbDom("demo","node",1,"nodeType")=9
        ^jsdbDom("demo","node",2,"attr","id")=3
        ^jsdbDom("demo","node",2,"nodeName")="foo"
        ^jsdbDom("demo","node",2,"nodeNo")=2
        ^jsdbDom("demo","node",2,"nodeType")=1
        ^jsdbDom("demo","node",2,"parent")=1
        ^jsdbDom("demo","node",3,"nodeName")="id"
        ^jsdbDom("demo","node",3,"nodeNo")=3
        ^jsdbDom("demo","node",3,"nodeType")=2
        ^jsdbDom("demo","node",3,"nodeValue")="top"
        ^jsdbDom("demo","node",3,"parent")=2


What has happened is that 3 DOM nodes were created.  These are defined in these Global Nodes:

        ^jsdbDom("demo","node")

Each node has an arbitrary number - a simple integer incremented from this Global node:

        ^jsdbDom("demo","nextNodeNo")

The first thing that happened when you clicked the *appendChild* button was that it
discovered there was no existing DOM in place, so it invoked the *doc.dom.createDocument()*
API.  This created the first node - the *DocumentNode*:

        ^jsdbDom("demo","node",1,"nodeName")="#document"
        ^jsdbDom("demo","node",1,"nodeNo")=1
        ^jsdbDom("demo","node",1,"nodeType")=9

At the very top of the DOM, it knows where to find this *DocumentNode* by this:

        ^jsdbDom("demo","documentNode")=1

This gave it a parent on which to attach your *<foo>* Element, which it added as node 2:

        ^jsdbDom("demo","node",2,"nodeName")="foo"
        ^jsdbDom("demo","node",2,"nodeNo")=2
        ^jsdbDom("demo","node",2,"nodeType")=1

It then linked this as the first child of the *DocumentNode*, which meant adding these pointers to
the *DocumentNode*:

        ^jsdbDom("demo","node",1,"firstChild")=2
        ^jsdbDom("demo","node",1,"lastChild")=2

and this pointer to the *<foo>* Element node:

        ^jsdbDom("demo","node",2,"parent")=1

As this was appended to the *documentNode*, it was deemed to be the *documentElement*, so the
top level DOM knows where to find it using this:

        ^jsdbDom("demo","documentElement")=2

It then had to add the *id="top"* attribute, which is also represented as a node:

        ^jsdbDom("demo","node",3,"nodeName")="id"
        ^jsdbDom("demo","node",3,"nodeNo")=3
        ^jsdbDom("demo","node",3,"nodeType")=2
        ^jsdbDom("demo","node",3,"nodeValue")="top"

and it needed attaching to its *<foo>* *ownerElement* node:

        ^jsdbDom("demo","node",3,"parent")=2

while the *<foo>* node was given the link to its Attribute node:

        ^jsdbDom("demo","node",2,"attr","id")=3


Additionally, a number of indices were created:

- by_id: these are used by the *getElementById* API to find matching nodes:

        ^jsdbDom("demo","index","by_id","top")=2

- by_nodeName: these are mainly used by the *getElementsByTagName* API to find matching elements:

        ^jsdbDom("demo","index","by_nodeName",1,"foo",2)=""

- by_nodeType: maintained for potential future use, and not really used


So now you understand how the DOM is physically represented in QEWD-JSdb, you can
watch how it changes as we build out our XML document from scratch.  But first, let's see
what our XML document looks like.  Scroll up and click the *Output as XML* button:

	
        <foo id="top" />

And there is our tag!

So now let's add a child Element to this top XML tag:

Parent Element:  #top
New Element Tag: <bar id="bar1">Frog and Ferkin</bar>

Click the *appendElement* tag, and now you'll see further nodes have been added to the DOM.  
See if you can figure out how and why they have been added.  The one I'll draw your
attention to is this:

        ^jsdbDom("demo","node",6,"nodeName")="#text"
        ^jsdbDom("demo","node",6,"nodeNo")=6
        ^jsdbDom("demo","node",6,"nodeType")=3
        ^jsdbDom("demo","node",6,"nodeValue")="Frog and Ferkin"
        ^jsdbDom("demo","node",6,"parent")=4

which is how the text in XML is represented - ie as yet another node.

Click the *Output as XML* button again and you'll see how our XML document now looks:

        <foo id="top">
          <bar id="bar1">
            Frog and Ferkin
          </bar>
       </foo>


Next, try this:

- Parent Element:  #top
- New Element Tag: <bar id="bar2">The Plough</bar>

and clicking *Output as XML* should now show:

        <foo id="top">
          <bar id="bar1">
            Frog and Ferkin
          </bar>
          <bar id="bar2">
            The Plough
          </bar>
        </foo>


So you can now continue experimenting with this, and build out any XML document you like, just using
the *appendElement* DOM API!


# Uses of the XML DOM API

Clearly the XML DOM API is very useful and powerful for manipulating and storing XML Documents in a form
they can be queried using XPath.  However, isn't XML a technology that is dying out, so is this
just a somewhat adademically-interesting showcase of cool stuff?

Not really.  If you think about it, XML, like JSON, is a syntax for describing a hierarchical structure,
and XPath provides a standard query syntax for searching and locating information within that
hierarchical structure.  The DOM API also provides powerful mechanisms for adding, removing, changing
and moving sub-sets of that hierarchy.

So what if we simply used XML as a convenient abstraction of some other hierarchical structure?  For
example, JSON?

Remember in the DOM Explorer, in row 1, that *Toggle* button?  Click it now and you'll
see that it reveals a JSON document that we can now experiment with.

You'll also see that, having clicked the *Toggle* button, that row 3 of the DOM Explorer
is showing *Parse as JSON* rather than *Parse as XML*.

So first, clear down the DOM and then click that *Parse as JSON* button.

You'll see in the *viewer* that a DOM has been created.  Let's take a look at the XML
it represents.  Click the *Output as XML* button.

What you'll see is an XML document that has been constructed to accurately represent the information
that was in the original JSON document.  The JSON property names are represented as XML tags, and
the JSON leaf node property values are represented as text of the corresponding tag.  Attributes
are used to define the data type (text | number | boolean | array).  Arrays have a special representation
using *<val>* tags to represent each array element, eg:


        <telecom type="array">
          <val>
            <use type="string">
              home
            </use>
          </val>
          <val>
            <system type="string">
              phone
            </system>
            <value type="string">
              (03) 5555 6473
            </value>
            <use type="string">
              work
            </use>
          </val>
        </telecom>


This abstraction of XML is designed so that it is reversible.

You'll have noticed that, in the DOM Explorer, below the *Output as XML* button there is now
an *Output as JSON* button.  Try clicking it now.  Back will come the original JSON!

So now that the JSON document is in the DOM, you can apply all the same things you previously
did with the XML document.  For example, you can try searching it using XPath, eg:


        //telecom/val/value

and you'll get all the nodes representing telephone numbers

You could also use *getElementsByTagName*, eg, try *birthDate* and see what it returns.

Just as before, you could also try removing pieces of the DOM and seeing the effect on the
reconstructed JSON.  And then try adding new elements to see how you could modify the
reconstructed JSON.


JSON is just one potential hierarchical structure.  QEWD-JSdb doesn't currently include a 
parser/outputter for it, but, for example, YAML should also be possible to map bi-directionally to XML and hence
be processible as a DOM.

The XML DOM is an amazingly powerful piece of technology.  QEWD-JSdb allows you to play around with and
explore that power for yourself!


# XML DOM versus setDocument/getDocument?

One last thing to consider.  We've seen above how you can ingest and recover JSON via the DOM.  But
QEWD-JSdb also has the *setDocument()* and *getDocument()* APIs for mapping JSON directly to and
from Global Storage.  What are the relevant pros and cons of using these versus the DOM?

The key differences are:

- *setDocument()* and *getDocument()* will be significantly faster / more efficient, particularly for
large documents.  The DOM involves a lot more data storage and walking the DOM's pointer links is a 
lot more arduous.

- the DOM brings you all the power of XPath and the DOM APIs for manipulating the document

- there's a key technical issue to consider.  Whilst Global Storage doesn't impose any logical
limit on the number of subscripts you use to define a hierarchy, each vendor of Global Storage
has to impose a technical limit on the maximum total character length of those subscripts.

  In fact, the technical limit is on the combined length of the Global name and all the subscripts,
appended together as one long string.  That maximum string length is actually longer in YottaDB that
IRIS (1019 versus 511 characters).  

  This means that when applying *setDocument()* to a JSON document with very long intermediate property
names and/or large numbers of levels to its hierarchy, the mapping to Global Storage using 
subscripts to represent those intermediate properties could break that string limit.

  By comparison, the DOM representation breaks a JSON document into a linear list of nodes whose
relationship is defined by linking parent/child/sibling pointers.  Therefore in the
DOM representation, the maximum Global Storage subscript depth and length is
unaffected by the content or structure of the XML document

  In summary, if you're handling JSON documents that break the limits of *setDocument()*'s mapping
to Global Storage, the DOM can come to your rescue!



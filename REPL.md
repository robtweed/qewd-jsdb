# Using the QEWD-JSdb REPL Explorer
 
Rob Tweed <rtweed@mgateway.com>  
30 November 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)

# Starting the Node.js REPL

To use the QEWD-JSdb REPL Explorer, you first need to shell into the *jsdb* container:

        docker exec -it jsdb bash


Once you're in the container's *bash* shell, switch to the *mapped* folder:


        cd mapped

You can now start the Node.js REPL:

        node

You'll see this:

        root@f300aaeefa1e:/opt/qewd/mapped# node
        Welcome to Node.js v12.13.0.
        Type ".help" for more information.
        >

Now start up the QEWD-JSdb shell:

        var jsdb = require('./jsdb_shell');

You'll see this:

        > var jsdb = require('./jsdb_shell')
        undefined
        >


The *jsdb* object provides you with access to QEWD-JSdb.  


# Start the Viewer Application

Behind the scenes, the *jsdb_shell* module makes use of event handlers that fire every time 
you create or delete data in the database.
Specifically, these event handlers have now been set up to update the *viewer* application.  


So, make sure you now start the *viewer* application
in your browser!  You'll be able to see, in real-time, the effect to the physical database of your
interactions with QEWD-JSdb. This facility really brings the whole thing to life!

To start the *viewer* application, use the URL:

        http://xx.xx.xx.xx:8080/viewer

Initially it won't show much, but don't worry, it will automatically spring into life as soon as you start
using QEWD-JSdb commands!

## How the Viewer Application Works

For those interested to know how the *viewer* application manages to work the way it does, it's
all done by the magic of WebSockets.  Whenever the QEWD-JSdb event handlers fire (which happens every time
you *set* or *delete* a database record), they send a REST request to the running *jsdb* QEWD instance which,
in turn, triggers a handler method that locates any active QEWD sessions and sends them the QEWD-JSdb reference
information as a WebSocket message.  The *viewer* application's browser-side JavaScript has an event handler
that waits for such incoming WebSocket messages and updates the display with the information in the message.

QEWD makes such applications very simple to create.  You can explore the source code as follows:

- [browser-side HTML](https://github.com/robtweed/qewd-jsdb/blob/master/www/viewer/index.html)
- [browser-side JavaScript](https://github.com/robtweed/qewd-jsdb/blob/master/www/viewer/js/app.js)
- [server-side REST message handler](https://github.com/robtweed/qewd-jsdb/blob/master/apis/qewd_refresh_viewer/index.js)
- [server-side module that gets the information and updates all viewer browsers with it](https://github.com/robtweed/qewd-jsdb/blob/master/utils/sendToViewers.js)

There's also a *keepAlive* mechanism that just ensures the QEWD Session for the *viewer* application
never times out.  You'll see in the browser-side JavaScript (see link above) a *setInterval()* that
sends out a *keepAlive* message every minute.  This just invokes a 
["do nothing" back-end handler method](https://github.com/robtweed/qewd-jsdb/blob/master/qewd-apps/jsdb-viewer/keepAlive/index.js).
That has the effect of updating the QEWD Session timeout.


# Getting Started with QEWD-JSdb

You're now ready to try something out.  In the REPL, type the following:

        var doc = jsdb.use('demo', 'x')
        doc.value = 123

As soon as you entered the second line, you should have seen the *viewer* page update!

In its left-hand panel you should see:

        Global Reference: ^demo(*)
         
        
        ^demo("x")=123


while in the right-hand panel you'll see:

        JSDB Document Reference: doc = this.documentStore.use('demo')
        JSDB Retrieval Command: doc.getDocument(true)
        
        
        {
          "x": 123
        }


# So What Just Happened?

The left-hand panel is showing you how the so-called *Global Storage* of YottaDB (or IRIS)
has physically stored the data you created when you invoked that second command.

As this is probably the first time you've seen a Global Storage database in action, it's worth
providing some background information.

## Global Storage in a Nut-shell

Global Storage uses a hierarchical database structure.  The "unit of storage" is known as a 
*Global* to which you assign a name - an alphanumeric value that must start with a letter.  You can
have as many differently named Globals as you want in the database, and it's up to you what you name them.

The data in each global is stored in what's known as a *Global Node*, which is defined by:

- the Global name (by convention denoted by a prefixed ^ character)
- a list of subscripts, each of which can be strings or numbers
- a value which can be a string or a number

You've just created a node: ^demo("x")=123:

- Global Name = demo
- Just a single subscript: "x"
- a value of 123

Think persistent associative arrays and you're in the right ball-park conceptually.  You can *set* or
*delete* Global Nodes.  So you can delete that node now by typing:

        doc.delete()

and you'll see it disappear in the *viewer*.

Amazingly, that's pretty much it in terms of how a Global Storage database works!

Global Storage is schema-free.  There's nothing to pre-declare, no schema to define up-front or
to modify down-stream.  Just like JavaScript objects, they are completely dynamic and free-form - which
actually makes them a perfect companion to JavaScript!

A key piece is those subscripts, which can be used to define a hierarchical tree structure of any depth
or complexity you like.

Global Storage comes with little else built-in.  There's no automatic indexing, for example.  However, both
YottaDB and IRIS support record locking and transactions.  That's beyond the scope of what
this showcase / demo / exploration will get into.  For advanced, business-critical applications, just be
aware that they are supported if you need them in future.

If it seems like this is an incredibly basic, low-level database management system, 
that's exactly what it is!  But in that deceptive simplicity lies an incredibly flexible and
powerful database for you to harness. Its
power comes from being able to implement all manner of database model abstractions on top of 
that basic hiearchical structure, and
QEWD-JSdb allows those abstractions to be implemented in JavaScript itself.  It's like a "proto-database"
just waiting to be built upon.

QEWD-JSdb comes with several ready-to-use, pre-created database models, each of which is showcased
in this repository.  However, to be honest, they
simply scratch the surface of what's possible.  If you spend some time familiarising yourself with
QEWD-JSdb and the underlying Global Storage, you'll be rewarded with a new world of possibilities!

All that might sound like a lot of hype at this stage, and is probably difficult to 
appreciate on the basis of the single record we've managed to create thus far, so let's
proceed with some further exploration.

## What's that Right-Hand Panel in the Viewer Application All About?

One of the easiest and simplest abstractions of Global Storage is its mapping to and from JSON.  If
you think about it, a JSON document is simply a hierarchical structure, with data values at its leaf-nodes:
just like a Global Node in fact!

As a JavaScript developer, you're probably more used to envisioning a hierarchical structure in JSON terms,
so what the *viewer*'s right-hand panel is doing is using the QEWD-JSdb *getDocument()* method to 
display the Global hierarchy as a corresponding JSON structure.

In this respect, you can regard QEWD-JSdb as providing you with persistent JSON storage.  Everything
stored in QEWD-JSdb, regardless of the database model abstraction you use, can also (and
simultaneously) be represented and handled as a persistent JSON document.  As we continue exploring QEWD-JSdb,
that should begin to become clear as you watch what's displayed in that right-hand *JSON View* panel.


## The Document Node Object

The first thing we typed was this line:

        var doc = jsdb.use('demo', 'x')

So let's explain what that is all about.

The *use()* method instantiates what, in QEWD-JSdb, we refer to as a *Document Node Object*.  It
provides an object that represents a physical Global node.  It's your fundamental starting point
for QEWD-JSdb.

The *use()* method's arguments are:

- 1st argument: the physical Global name (without any prefixed ^)
- optionally the 2nd and subsequent arguments specify the subscripts for the Global Node

Note that the *use()* method does NOT create a corresponding physical Global node.  However, the
Document Node object that it returns provides you with a range of properties and methods that
allow you to manipulate that phsyical Global Node and also to navigate from it to any other related
Global Nodes.

### Document Node Object Properties

The properties of a Document Node Object are:

- exists: Does the corresponding Global Node physically exists in the database? (true | false)
- hasValue: Is the corresponding Global Node a leaf node with a value? (true | false)
- hasChildren: Is the corresponding Global Node an intermediate node within the
hierarchy? (true | false)

- value: a read/write property that either sets a value for the Document Node, or returns its value.  If
the Node does not exist, an empty string value is returned.  Note that it is quite valid for a Global
Node to also have an empty string as a value.

- parent: returns a Document Node Object representing the hierarchical parent of the current Document Node.
- firstChild: returns a Document Node Object representing the first child Node (if it exists) of the current Document Node.
- lastChild: returns a Document Node Object representing the last child Node (if it exists) of the current Document Node.
- nextSibling: returns a Document Node Object representing the current Document Node's next sibling node (if it exists).
- previousSibling: returns a Document Node Object representing the current Document Node's previous sibling node (if it exists).

- path: returns an array of the subscripts for this Document Node
- documentName: returns the documentName, aka the corresponding Global name
- name: the Node's property name, ie the last subscript for this Node


### Document Node Object Methods

The methods of a Document Node Object are:

- delete(): deletes the corresponding Global Node from the physical database.  The Document Node Object will, however, continue to exist
- increment(by): increments the value of the Document Node by the amount specified in the argument (default = 1).  
Useful for counters or automatic assignment of identifiers
- countChildren(): returns the number of Child Document Nodes that physically exist in the database below the current Document Node
- $(subscript) or $(arrayOfSubscripts): returns a new Document Node object that represents the additional level of 
Global Node subscripting below the current Node
- getDocument(useArrays): retrieves the data represented in the sub-tree starting with the current Document Node as 
a JSON document.  If useArrays is *true*, it will attempt to retrieve arrays where consecutive numeric
subsript values exist in the physical Global storage.  Unless you're sure that the stored data did
not include arrays, use *true*.  However, setDocument(false) is faster to execute, but will return numeric
subscript as properties in the returned JSON.
- setDocument(object): Stores the specified JavaScript object/JSON as a sub-tree of Global Nodes beneath the
current Document Node.
- forEachChild(): allows you to iterate through the child subscripts of the current Document Node.
- forEachleafNode: allows you to iterate through any leaf nodes that are descendents of the current
Document Node.
- lock(timeout): attempts to set a lock on the Document Node.  If unable to within the specified timeout (seconds),
it returns *false*, otherwise *true* if successful.  Once locked, any other process attempting to apply a 
lock() to the same Document Node will be unsuccessful.
- unlock(): removes a previously set lock on the Document Node.



# Time to Continue Exploring!

Now that we've run through the underlying concepts and explained the various method and properties you
can use in QEWD-JSdb, we can begin exploring it in earnest.  So back to the REPL, and remember to keep
that *viewer* browser page open and available to watch!

So let's start with that first node again:

        doc.value = 123

You should see in the *viewer* that this caused this Global Node to be stored in the database:

        ^demo("x")=123

That's because *doc* is a Document Node Object we defined using:

 
        var doc = jsdb.use('demo', 'x')

which meant a Document Object Node representing a physical Global named *demo* with a single
subscript: *x*

We then applied its *value* property to assign the value *123*

We can now retrieve its value from the database:

        console.log(doc.value)

and you'll see *123* displayed

You can change its value to something else:

        doc.value="abcdef"

and you'll immediately see that new value appearing in the *viewer*.


Now let's create another Document Node Object.  We can do that in several ways:

- using an absolute reference with use();
- using a reference relative to the current Document Node using the $() function.


## Absolute References for instantiating Document Node Objects

Try the first way:

        var doc2 = jsdb.use('demo', 'y', 'z')
        doc2.value = "xyz"

The *viewer's* Global Storage view will now be showing:

        ^demo("x")="abcdef"
        ^demo("y","z")="xyz"

and in its left-hand panel, the corresponding JSON view:

        {
          "x": "abcdef",
          "y": {
            "z": "xyz"
          }
        }

In fact we can retrieve that JSON for ourselves in the repl, but we'll need to use a 
Document Node object that represents the top of the hierarchy - ie just using the Global
name and no subscripts:

        var topDoc = jsdb.use('demo')
        var obj = topDoc.getDocument()

Then display it using, for example:

        console.log(JSON.stringify(obj, null, 2))

So what was returned was a JavaScript object corresponding to the data we saved into those Global Storage
nodes, so, for example, we could now refer to:

        console.log(obj.y.z)

and get the value *xyz*.



## Relative References for instantiating Document Node Objects

Very often, having instantiated one Document Node Object, we'll want to access or manipulate
other nodes that are descendents of it.

For example, we used this above:

        var doc2 = jsdb.use('demo', 'y', 'z')

Let's first delete its value:

        doc2.delete()

and now we'll instantiate a child Document Node:

        var child1 = doc2.$('child1')

Now if you set a value for this, see what happens in the *viewer*:

        child1.value = 'hello world'

Now you'll see this was created in the database:

        ^demo("y","z","child1")="hello world"

Of course, we could have achieved exactly the same thing using the absolute reference approach:

        var child1 = jsdb.use('demo', 'y', 'z', 'child1')

Which you use is up to you, but the relative technique using $() is very convenient, particularly
if you're repetitively creating child Nodes of a parent Node. So, for example, we can now create another child:

        var child2 = doc2.$('child2')
        child2.value = "another world"

and let's create one more:

        var child3 = doc2.$('child3')
        child3.value = "last world"

Hopefully what's been appearing in the *viewer* as you've been doing this is beginning to make sense!


# Exploring the Properties of Document Nodes

So now let's go back to *doc2* which represented ^demo("y","z") and look at some of its properties:

        console.log(doc2.exists)

That's true because, although no data physically exists at that Node - ie it's an intermediate, rather
than a leaf node, a value does physically exist in the database for at least one of its descendents.

How about:

        console.log(doc2.hasValue)

That's *false* because it's an intermediate node with no actual data of its own.

Then try:

        console.log(doc2.hasChildren)

That is *true* because it's an intermediate Node, and at least one of its Child Nodes has a
value physically stored in the database.

Compare those results with what you see for a leaf node such as child3:

        console.log(child3.exists)
        console.log(child3.hasValue)
        console.log(child3.hasChildren)


## Parent, Child and Sibling Properties

If we take the *child3* Node, which represents ^demo("y","z","child3"), then see what happens
if we do this:

        console.log(JSON.stringify(child3.parent.getDocument(), null, 2))


You should see:

        {
          "child1": "hello world",
          "child2": "another world",
          "child3": "last world"
        }


Because child3.parent represents ^demo("y","z"), the previous level up the hieararchy.

Of course we could further chain up the parents:

        console.log(JSON.stringify(child3.parent.parent.getDocument(), null, 2))

and now we see this:

        {
          "z": {
            "child1": "hello world",
            "child2": "another world",
            "child3": "last world"
          }
        }


Now let's start with *doc2* which, if you remember, represented ^demo("y","z")

        console.log(doc2.firstChild.value)


This returns "hello world" as the first child node of doc2 represents ^demo("y","z","child1")


        console.log(doc2.lastChild.value)


This returns "last world" as the last child node of doc2 represents ^demo("y","z","child3")


        console.log(doc2.firstChild.nextSibling.value)


This returns "another world" because:

- doc2.firstChild represents ^demo("y","z","child1")
- and its nextSibling Node represents ^demo("y","z","child2")


Hopefully you can understand why we get the same result if we do this:

        console.log(doc2.lastChild.previousSibling.value)


By the way, if, rather than getting the value of a node, you want to know the property name (aka
Global Subscript name), you can use the Node's *name* property, eg:


        console.log(doc2.lastChild.name)

will return *child3*, because this is the node's property name


# Saving JSON in a Document Node

So far we've seen how you can assign a value to a single Document Node.  However, you can
save entire Javacript objects / JSON documents into a Document Node with the single
command *setDocument()*.  It begins to show the real power of this database, so let's take
a look at it in operation:

We'll create a new Document Node:

        var jsonNode = jsdb.use('demo', 'json')

Now let's create a JavaScript Object, eg:

        var obj = {hello: {world: 123, there: 'xyz', you: 'abc123'}}

So that's an in-memory JavaScript object.  Now we'll persist it into that
Document Node we instantiated:

        jsonNode.setDocument(obj)


In the *viewer* Global Storage view you'll see this has been created:

        ^demo("json","hello","there")="xyz"
        ^demo("json","hello","world")=123
        ^demo("json","hello","you")="abc123"

and in the JSON view:


  "json": {
    "hello": {
      "there": "xyz",
      "world": 123,
      "you": "abc123"
    }
  },

and its added it into the rest of the data in that physical database Global.

So that previously in-memory JSON object is now also physically in the database.

Of course you can retrieve it again as an in-memory object using getDocument():


        var objCopy = jsonNode.getDocument()

So now you can get to the same values either via in-memory:

        console.log(objCopy.hello.world)

or directly from disk (ie from the database):

        console.log(jsonNode.$('hello').$('world').value)

Note that instead of using two chained $() methods, we could alternatively have done this:

        console.log(jsonNode.$(['hello', 'world']).value)
 
which is less verbose and also more efficient as it has instantiated just one resulting
Document Node object rather than two (one for each $() invocation).


Also one further little trick to be aware of: when you invoke the $() method for a specific
node value, a shortcut property is created in the parent Document Node.  This 
shortcut property name is created from $ followed by the property name.

So having done this:

        console.log(jsonNode.$('hello').$('world').value)

I could now do the same thing using this notation:

        console.log(jsonNode.$hello.$world.value)

demonstrating how much the distinction between in-memory and on-disk JavaScript Objects is now
blurred in QEWD-JSdb!

QEWD-JSdb also demonstrates something else.  Consider a Document Database such as MongoDB which is
designed for the storage of JSON documents.  In MongoDB, the "unit of storage" is an entire
document.  To manipulate or access its contents, you must first fetch the document from the database into
an in-memory JavaScript object before working on it.  If you modify any of its contents, you save back
the modified object to the database.

Now compare with what you've just been doing with QEWD-JSdb.  Sure, just like MongoDB you can save an
in-memory object to disk and retrieve a JSON object from the database as an in-memory instance.  But
your "unit of storage" is now right down to an individual name/value pair, anywhere in the JSON document!
You can view that name/value pair's value *in situ* directly from the database using its Document Node's *value* property.
You can also modify that name/value pair's value *in situ*, directly into the database.

Furthermore, you can work with sub-sets of the JSON, retrieving sub-sections of the hierarchy.  You can
also insert new sub-sections of JSON into the saved document.  And of course you can delete whole
sections of the stored JSON using the *delete()* method.

We've previously seen the *delete()* method applied to a leaf node.  However, if applied to 
an intermediate node, the entire sub-tree of Global Nodes that are descendents of the Node are
deleted too.

Indeed, apply the *delete()* method to the top-level Document Node (ie representing the Global Node alone, 
without any subscripts), and the entire document disappears from the database.

So, in summary, QEWD-JSdb provides you with the basis of a uniquely powerful and flexible persistent 
JavaScript Object / JSON document database, quite different from anything else you've probably used before!


# Traversing a QEWD-JSdb Document

A key part of the power of Global Storage is the ability to highly-efficiently traverse your way around
the hierarchical structure.  This ability is provided to you in QEWD-JSdb through two methods available
to a Document Node Object:

- forEachChild(): iterates through the Document Node's child Nodes
- forEachLeafNode(): iterates through the Document Node's descendent leaf nodes.

Let's take a look at both in action.

## forEachChild()

This is the most frequently used method of the two, and once again its apparent simplicitly is highly deceptive.

 Cooy and paste the following into your REPL and hit the Enter key:

        jsonNode.$('hello').forEachChild(function(name, node) {
          console.log(name)
        });

You should see the result:

        there
        world
        you

which are the property names (aka Global subscript values) of each of the child nodes of the jsonNode.$('hello') node

Of course, you can probably guess that we could have written the same logic like this instead:

        jsonNode.$hello.forEachChild(function(name, node) {
          console.log(name)
        });

since we've already previously accessed the *hello* subscript via the *$()* method.

So how and why did we get this result?

Remember, *jsonDemo* represented this physical Global Node:

        ^demo("json")

and *jsonDemo.$('hello') therefore represents:

        ^demo("json","hello")

and so what happened was that the *forEachChild()* function iterated through its child subscripts:

        ^demo("json","hello","there")  <== name = 'there'
        ^demo("json","hello","world")  <== name = 'world'
        ^demo("json","hello","you")    <== name = 'you'

So, that's how to iterate through a Document Node's child node property names, but what if we want the values of those child nodes, or if
we want to perform some manipulation on some or all of the child Document Nodes?

That's where the second argument of the *forEachChild()* method comes in.  It provides you with the Document Node
Object for the child node at each iteration.  So try cuttiing and pasting this variation on the code:

        jsonNode.$hello.forEachChild(function(name, node) {
          console.log(name, ': ' + node.value)
        });

and this time it returns:

        there : xyz
        world : 123
        you : abc123


The *forEachChild()* method can be nested.  We could iterate through the first 3 levels of our document's hiearchy.
If you remember we had earlier instantiated *topDoc* as a Document Node object that represented the top-leve of our
persistent document named *demo*.  So try cutting and pasting the following:


        topDoc.forEachChild(function(name, lvl1Node) {
          if (lvl1Node.hasValue) {
            console.log('level 1: ' + name + ': ' + lvl1Node.value)
          }
          else {
            lvl1Node.forEachChild(function(name, lvl2Node) {   
              if (lvl2Node.hasValue) {
                console.log('  level 2: ' + name + ': ' + lvl2Node.value)
              }
              else {
                lvl2Node.forEachChild(function(name, lvl3Node) {
                  if (lvl3Node.hasValue) {
                    console.log('    level 3: ' + name + ': ' + lvl3Node.value)
                  }
                });
              }
            });
          }
        });


So this time you should see:

            level 3: there: xyz
            level 3: world: 123
            level 3: you: abc123
        level 1: x: abcdef
            level 3: child1: hello world
            level 3: child2: another world
            level 3: child3: last world

and if you compare with the Global Storage view in the *viewer* application, you can see that we've iterated through the entire
Global:

        ^demo("json","hello","there")="xyz"
        ^demo("json","hello","world")=123
        ^demo("json","hello","you")="abc123"
        ^demo("x")="abcdef"
        ^demo("y","z","child1")="hello world"
        ^demo("y","z","child2")="another world"
        ^demo("y","z","child3")="last world"


### forEachChild() Modifiers

You can control and modify the behaviour of the *forEachChild()* method via an optional first argument.

#### Traversal Direction

You can control the direction of the traversal.  By default the direction is *forwards*, but you can change it to 
"reverse", eg:


        jsonNode.$hello.forEachChild({direction: 'reverse'}, function(name, node) {
          console.log(name)
        });

and this time you'll see the child property names returned in reverse order:


        you
        world
        there


#### Ranges

You can specify a range of child property names within which to limit the traversal.  To demonstrate this properly, let's
first add the following data to the *demo* document:

        var data = {
          "james": "",
          "frederick": "",
          "william": "",
          "alan": "",
          "andrew": "",
          "anthony": "",
          "brian": "",
          "brendan": "",
          "billy": "",
          "charles": "",
          "colin": ""
        }
        topDoc.$('names').setDocument(data)

Take a look at the *viewer* page - notice how the names are displaying in alphabetic order,even though we defined them
in a somewhat jumbled fashion.  This is something that the Global Storage database does automatically - basically
subscripts are always automatically ordered in alphanumeric collating sequence.  Let's try adding a couple more names to
see that happening:

        topDoc.$names.$('david').value = ''

        topDoc.$names.$('richard').value = ''

So what happens if we add a name starting with an upper-case letter?  Let's try it out:

        topDoc.$names.$('Graham').value = ''

That's interesting - that's been put at the top of the list.  Why?  Because upper-case letters precede lower case ones
in the ASCII collating sequence.  You need to be aware of this when using Global storage for indexing - a topic we'll
explore in more detail later.

However, for now we have some good data with which to demonstrate *forEachChild()* ranges.

We can specify a starting point for the range in which to iterate:

        topDoc.$names.forEachChild({range: {from: 'd'}}, function(name, node) {
          console.log(name)
        });

and you should get back:

        david
        frederick
        james
        richard
        william


We can alternatively specify an endpoint to the range:


        topDoc.$names.forEachChild({range: {to: 'd'}}, function(name, node) {
          console.log(name)
        });

and now you should see:

        Graham
        alan
        andrew
        anthony
        billy
        brendan
        brian
        charles
        colin
        david

Naturally they can be combined.  Try this:


        topDoc.$names.forEachChild({range: {from: 'b', to: 'd'}}, function(name, node) {
          console.log(name)
        });

You should now just get these names back:

        billy
        brendan
        brian
        charles
        colin
        david

You're not restricted to a single letter for the *from* and *to* values.  Try this:

        topDoc.$names.forEachChild({range: {from: 'br', to: 'col'}}, function(name, node) {
          console.log(name)
        });

Now we just see:


      brendan
      brian
      charles
      colin

If a *from* or *to* value isn't present in the actual subscripts, that doesn't matter - they are just seed/terminating
values, so this:

        topDoc.$names.forEachChild({range: {from: 'elvis', to: 'kelly'}}, function(name, node) {
          console.log(name)
        });

will return

        frederick
        james


The *from* and *to* values can be the same, in which case all subscript names starting with the specified values are
returned, eg:

        topDoc.$names.forEachChild({range: {from: 'br', to: 'br'}}, function(name, node) {
          console.log(name)
        });


will return

        brendan
        brian


Note that ranges can be specified together with direction:

        topDoc.$names.forEachChild({direction: 'reverse', range: {from: 'br', to: 'br'}}, function(name, node) {
          console.log(name)
        });

which now returns

        brian
        brendan








# The QEWD-JSdb KVS Database Model
 
Rob Tweed <rtweed@mgateway.com>  
2 December 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)

# About this Document

This document provides background information on the *Key/Value Store (KVS)* NoSQL database model that
is included with QEWD-JSdb.

# About the KVS Database Model

The *KVS* database model is inspired by the [Sets and Hashes data types](https://redis.io/topics/data-types)
 in the Redis NoSQL database.

It's a pretty simple data model, but rather than just being a simple key/value store,
it effectively implements a key/object store with which you can save and retrieve JavaScript objects.
Retrieval of stored objects is via either a key or a field that you have opted to index.

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


# Starting the KVS Explorer

Open another browser window.  Ideally you'll also want to be able to see and watch the *viewer*
browser window, so have them in separate windows or screens, rather than in separate tabs where you
can only see one at a time.

To start the *KVS* Explorer application, use the URL:

        http://xx.xx.xx.xx:8080/kvs

Replace the *x'* with the IP address or domain name of the server on which you're running QEWD-JSdb.


# About the KVS Explorer Application

This browser-based application allows you to see the main QEWD-JSdb *KVS* APIs in action, and,
together with the *viewer* application, see, in real-time, how they make use of the underlying Global Storage
database.

The *KVS* application has deliberately been written as a very simple, un-sexy-looking, plain HTML
and JavaScript/jQuery application.  The reason is to allow developers to be able to quickly discover
and understand how it works by looking at its source code, without the obfuscation that would result
from the addition of a JavaScript framework such as Angular, Vue or React.  However, all the logic
can be applied to and integrated with any front-end JavaScript framework.

## Source Code for the KVS Explorer Application

Click the links below to view the code.

- [browser-side HTML](https://github.com/robtweed/qewd-jsdb/blob/master/www/kvs/index.html)
- [browser-side JavaScript/jQuery](https://github.com/robtweed/qewd-jsdb/blob/master/www/kvs/js/app.js)
- [server-side message handlers](https://github.com/robtweed/qewd-jsdb/tree/master/qewd-apps/jsdb-kvs)

The application has been built in accordance with the [QEWD-Up](https://github.com/robtweed/qewd/blob/master/up/docs/InteractiveApps.md)
 design framework for interactive applications.

## Source Code for the KVS APIs

Like all the QEWD-JSdb APIs, they are written in JavaScript.  They are all Open Source APIs, and
you are free to inspect and use the code as you wish, in accordance with the Apache 2 license under
which they are made available.

Find the [KVS source code here](https://github.com/robtweed/ewd-document-store/tree/master/lib/proto/kvs).


## Enabling Use of the KVS APIs

You can create and maintain a *Key/Value Store (KVS)* at any QEWD-JSdb Document Node Object.

Having instantiated the Document Object Node object, you must enable its use of the *KVS* APIs.
For example:

        doc = this.documentStore.use('jsdbKvs', 'demo')
        doc.enable_kvs()

The Document Node object will be augmented with a *kvs* property object, via which you can invoke
the *KVS* APIs, eg:

        var key = 123;
        var record = {a: 1, b: 2};

        doc.kvs.add(key, record);


## Usage Notes on the KVS Explorer Application

In the top row of the table you'll see the first of a set of pre-created record objects which will
be used to populate a *Key/Value Store (KVS)*.  Each time you add a record to the *KVS* using the
*add()* method, the next one will appear in the top table row.

You can click the button in the second table row at any time to clear down the *KVS*.  If you do so, 
the first table row will return to displaying the first of its pre-created records.

## Adding records to the KVS

Records are added to the *KVS* using the *add()* method.  See table row 3.

You have to specify a key in the text box, against which the record object is saved.  The key can be
any non-empty number, string or alphanumeric value.  You can only use the key once.  Attempting to
add a record using a key that is already in use in the *KVS* will return an error.

## Editing records in the KVS

The object saved against a key can be edited *in-situ* in the *KVS* by using the *edit()* method.  See
table row 4.

You have to specify a key in the text box, against which a record must already exist in the *KVS*.
The Explorer application will invoke the *edit()* method to replace the existing saved record object with
the one displayed in table row 1.

## Removing records from the KVS

You can remove a record from the KVS by using the *delete()* method.  See table row 5.

You have to specify a key in the text box, against which a record must already exist in the *KVS*. On
clicking the *delete* button, the record with the specified key will be deleted from the *KVS*.

Specifying a key value that is not currently in use in the *KVS* will return an error.

## Retrieving a record from the KVS

You can retrieve a record from the KVS by using the *get_by_key()* method.  See table row 6.

You have to specify a key in the text box, against which a record must already exist in the *KVS*. On
clicking the *get_by_key* button, the record with the specified key will be returned as a JavaScript object.
Note that the saved record will remain in the *KVS*.

Specifying a key value that is not currently in use in the *KVS* will return an error.


## Adding an Index to the KVS

By default, you can only retrieve records by its key.  However, you can optionally define any or all
of the field names in the saved objects to be indexed.  There are actually two steps to setting
up an index, but the Explorer collapses them into a single step (see table row 7):

- specify a property name to be an indexed field.  Note that only 1st-level property names in the
saved record objects can be specified as indexed fields.  Once a field has been specified as an index, 
whenever any new records are added, if they contain a value for that field, an index record will be
added to the *KVS*

- if you have specified a new index field, but records already exist in the database, they won't
automatically be re-indexed.  You must invoke the *reindex()* method to force a re-indexing of all existing
records. 

In the Explorer interface, enter the name of the field you want to index, eg: *lastName*

You can also optionally select a modifier transform from the drop-down list. The most common
to use would be *toLowerCase*.

Now click the button.  In the *viewer* application you'll see that any existing *KVS* records are 
automatically re-indexed using this index field.


## Seeing what fields are specified as Indexed fields

You can discover which fields are index fields by using the *getIndices()* method. See table row 8.


## Retrieving records from the KVS via an Index

If one or more fields have been specified, you can retrieve records using them.  This is done using
the *get_by_index()* method.  See table row 9.

In the Explorer interface you must enter:

- the name of the index field you want to use (eg *lastName*)
- a value for that index field you want to search for (eg *Tweed*) (Note, if you specified a modifier
transform when adding the index (eg *toLowerCase), you could specify the transformed value to search for
(eg *tweed*).
- you can select whether you want to return just an array of keys of matching values, or an object
of matching key/record object pairs.

## Removing an Index Field

You may want to stop indexing by a field, for example if you'd added one by mistake. See table row 10.

As when you added an index, this is usually a two step process:

- specify the field to be deleted as an index field
- re=index the *KVS* to remove any existing index records for that field.

They are collapsed into a single step in the Explorer Interface:

Enter the name of the field that should no longer be used as an index field (eg *lastName*)

Click the button and in the *viewer* application you will see that any previous index records for that
field will have disappeared.











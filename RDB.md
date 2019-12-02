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

The *RDB* Explorer application has deliberately been written as a very simple, un-sexy-looking, plain HTML
and JavaScript/jQuery application.  The reason is to allow developers to be able to quickly discover
and understand how it works by looking at its source code, without the obfuscation that would result
from the addition of a JavaScript framework such as Angular, Vue or React.  However, all the logic
can be applied to and integrated with any front-end JavaScript framework.

## Source Code for the RDB Explorer Application

Click the links below to view the code.

- [browser-side HTML](https://github.com/robtweed/qewd-jsdb/blob/master/www/rdb/index.html)
- [browser-side JavaScript/jQuery](https://github.com/robtweed/qewd-jsdb/blob/master/www/rdb/js/app.js)
- [server-side message handlers](https://github.com/robtweed/qewd-jsdb/tree/master/qewd-apps/jsdb-rdb)

The application has been built in accordance with the [QEWD-Up](https://github.com/robtweed/qewd/blob/master/up/docs/InteractiveApps.md)
 design framework for interactive applications.

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

# Enabling Use of the RDB APIs

The *RDB* APIs work a little differently from the other database model APIs.

You can create a *Relational Database (RDB)* Table at any QEWD-JSdb Document Node Object.

To do so, having instantiated the Document Object Node object, you must enable its use of the *RDB* APIs.
For example, from within a QEWD-Up back-end message handler module:

        doc = this.documentStore.use('jsdbRdb', 'demo')
        doc.enable_rdb()

or when using the *jsdb_shell* REPL module:

        doc = jsdb.use('jsdbRdb', 'demo')
        doc.enable_rdb()


The Document Node object will be augmented with an *rdb* property object, via which you can invoke
the *RDB Create Table* APIs, eg:

        sql = 'create table jsdbdemo (' +
          'id int not null,' +
          'firstName varchar(255),' +
          'lastName  varchar(255),' +
          'city varchar(255),' +
          'gender varchar(10),' +
          'constraint pk_jsdbdemo primary key (id)' +
        ')';
        results = doc.rdb.sql(sql)

The underlying [SQL engine](https://github.com/chrisemunt/mgsql) now knows that this table (*jsdbdemo* in
the example above) will reside at and under the Global Storage node represented by our
QEWD-JSdb Document Node.

The special QEWD-JSdb-specific *create index* SQL command must also be applied via the
Document Node object against which the table was created.

However, once a Table has been created, all other SQL commands should
 be invoked with respect to the QEWD-JSdb top-level Document Store
object, via its *sql()* method.

For example, within a QEWD-Up back-end message handler module:

        resultSet =  this.documentStore.sql('select * from jsdbdemo')

or when using the *jsdb_shell* REPL module:

        resultSet =  jsdb.sql('select * from jsdbdemo')


# Usage Notes on the RDB Explorer Application

In the top row of the table you'll see the first of a set of pre-created record objects which will
be used to populate a *Relational Database Table (RDB)*.  Each time you add a record to the *RDB* table using the
*insert into {table_name}* SQL command, the next one will appear in the top table row.

You can click the button in the second table row at any time to clear down the *RDB*.  If you do so, 
the first table row will return to displaying the first of its pre-created records.


## Creating an RDB Table

An *RDB* Table is created using the *create table* SQL command.  See the RDB Explorer table row 3.

Clicking this button will invoked a pre-built *create table* command as shown in the right-hand column.

## Adding an Index for the Table

To optimise the search path used by the SQL engine's query optimiser, you should define indices for the
most common/most likely SQL queries (otherwise the SQL engine will do an exhaustive search through the
table data records).

You can create indices in table row 4.

Enter a name for the index, eg *byName*

Then in the second text box, enter the fieldnames to be idexed.  For example, if we wanted an index
by lastName, we would enter: 

    lastName, id

*id* should always be in the list of fields, and usually the last in the list.

Clicking the *Create Index* button will activate the index, but you won't see any change in the *viewer*
application.


## Inserting Records into a Table

Records are added, or inserted, into an *RDB* table using the *insert into* SQL command.  See
table row 5.

Clicking the *Insert Record* button will add the record that is currently 
showing in the first Explorer table row,

In the *viewer* application you should now see that record saved in the database.  If you had
added any indices, you should also see the index records in the database, eg:

        ^jsdbRdb("demo","index","byName","Tweed",1)=""

Click the *Insert Record* button a few more times to add some more data to the table.


## Querying the *RDB* database

We can now apply SQL queries to the *RDB* database.

### Simple Select All Query

Let's start with a simple *select \* from jsdbdemo* query.  See Explorer table row 6.

You should see the returned *resultSet* appear in the right hand Explorer column, returning
all the records you inserted into the table.
 

### A More Specific Query

In the Explorer table's row 7 (*Custom Select*) you can try a more specific query.

In the *select* text entry box enter the field name or field names you want to retrieve, eg
enter *firstName, lastName*.  Separate the field names with a comma.  Whitespace around the commas is OK.

In the *where* text entry box, enter an SQL *where predicate*, eg try:

     city = "Redhill"

Make sure you put a space on either side of the = sign.

Then press the *Custom Select* button and you should see a resultSet appear in the right hand column
of the Explorer.


## Deleting Records

You can delete records from your *RDB* table in the Explorer table's row 8.

Fill out the *where* text box in the same way as described above for *Custom Selects*, eg:

    firstName = "Simon"

Click the *Delete* button, and in the viewer you should see the record disappear, along with any
associated index record(s).






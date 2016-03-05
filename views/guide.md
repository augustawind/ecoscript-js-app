# Creating your own ecosystem 

Creating your own ecosystem is easy and requires no programming experience.
To get started, download the example configuration
[here](example) and open it with your favorite text editor.
I recommend using [this online text
editor](http://www.cleancss.com/json-editor/). It will automatically check
your file for syntax errors as you type.

## Syntax

Ecosystems are configured in text files that use a simple format called
**JSON** (short for *JavaScript Object Notation*, but don't worry about that).
In order for the program to read your configuration file correctly, it must be
formatted properly.

Here is a simple example of properly formatted JSON:

    {

      "year": 2016,

      "person": {
        "name": "Dustin",
        "age": 24,
        "birthday": "November 14, 1991",
        "awesome": true
      },

      "things": ["ball", "tree", "car"]

    }

JSON files are written as a list of key -> value pairs, surrounded by curly
brackets. In the example above,
there are two keys: "things" and "person". *Keys* must always be surrounded by
quotations, and their *values* are specified after the ":". Entries are
separated by commas. While not necessary, it's also a good practice to put
each entry on a separate line. This drastically increases readability. This
format can be thought of as a dictionary, a list of words and their definitions. 

Values can take many formats. If they are numbers, just write the number as-is:

    "year": 2016

If they are words (or contain any non-numeric characters), they must be
surrounded by quotations:

    "name": "Dustin"

The only exception to this are the values *true* and *false*, which should not
be surrounded by quotations:

    "awesome": true

JSON *objects* are lists of key -> value pairs surrounded by curly brackets.
Sound familiar? Actually, the whole JSON file is just one big object! Objects can
contain other objects, which can contain other objects, and so on:

      "person": {
        "name": "Dustin",
        "age": 24,
        "birthday": "November 14, 1991",
        "awesome": true,

        "bodyParts": {
          "fingers": 10,
          "toes": 10,
          "arms": 2,
          "legs" 2
        }
      }

Indentation isn't strictly necessary, but I recommend using it to increase
readability.

Values can also be *arrays*. Arrays are lists of values. Each value in the array 
can be any type of JSON value, including objects and more arrays. Values are
separated by commas, and the whole array must be enclosed in square brackets:

    "things": ["ball", "tree", "car"]

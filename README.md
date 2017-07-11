# JSONArray to custom format

## Usage

Check out the `SHOW EXAMPLE` button ;)

Take a json array and paste it into the `Input` text area. As example serves following snippet:

```JSON
[
  {
    "name": "white",
    "hex":  "FFFFFF"
  },
  {
    "name": "black",
    "hex":  "000000"
  }
]
```

The text area `formatting` is used to specify a custom order of the key-value pairs of the input. Words which are wrapped in `$` and match any key of the JSON input are replaced by the corresponding value. Here is a example formatting:

```CSS
.text-color-$name$ {
  color: #$hex$;
}

```

This example formatting represents a CSS style which sets the text color (do not miss the extra empty line after at the end).
Click on the `CONVERT` button and watch the output:

```CSS
.text-color-white {
  color: #FFFFFF;
}
.text-color-black {
  color: #000000;
}
```

Finished! Either copy the output by clicking on `COPY OUTPUT TO CLIPBOARD` or clear and restart.

## Development setup

Clone the repository and install all dependencies with

`npm install`

finally build the production code by executing

`gulp build`

When developing, remove the comments around the `link` and `script` tags in the `index.html` file. Comment those lines again when building the production code.
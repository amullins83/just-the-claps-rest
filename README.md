Just the Claps
==============

Simple web interface for creating all-caps text with clap emojis between each word.

JSON Endpoint
-------------

So far, there's only one API endpoint, accessible at `/tr` or `/transform`. You can either send it a `GET` or `POST` request, with the parameters `text` and `symbol` representing the input text and the symbol to interject between words. If no symbol is provided, we assume you want... just the claps.

*Examples*

```
GET /tr?text=no%20war%20but%20the%20class%20war&symbol=%E2%98%AD
{"text": "NO☭WAR☭BUT☭THE☭CLASS☭WAR"}
```

```
POST /transform
{
	"text": "no you didn\'t",
	"symbol": "😠"
}

{"text": "NO😠YOU😠DIDN'T"}
```

Props
-----

The name of this project was inspired by Strong Bad's song from [Strong Bad Email #68 - Caper](https://www.youtube.com/watch?v=HBUP2jAPExU) by the Brothers Chapps.

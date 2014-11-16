meteor-prerenderio
==================

A meteor wrapper for https://prerender.io/

In your settings.json file include:

`settings.json`

```
{
  "PrerenderIO": {
    "token": "yourtoken"
  }
}
```

You can also specify the token in your code:
```javascript
prerenderio.set('prerenderToken', 'YOUR_TOKEN'));
```

For more options, take a look at the [prerender-node package](https://github.com/prerender/prerender-node)


Thanks to @electricjesus for 99% of the development.

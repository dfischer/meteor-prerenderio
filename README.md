meteor-prerenderio
==================

A meteor wrapper for https://prerender.io/

In your settings.json file include:

`settings.json`

```
{
  "PrerenderIO": {
    "prerenderServiceUrl": "http://localhost:3000/",
    "token": "yourtoken"
  }
}
```

You can also specify the token in your code:
```javascript
prerenderio.set('prerenderServiceUrl', 'http://localhost:3000/');
prerenderio.set('prerenderToken', 'YOUR_TOKEN'));
```

The `prerenderServiceURL` is optional and only used to test the Prerender server locally. [Test It](https://prerender.io/documentation/test-it)


For more options, take a look at the [prerender-node package](https://github.com/prerender/prerender-node)


Thanks to @electricjesus for 99% of the development.

# Google Translate JavaScript module

This module exposes two functions: the [`token()`](#token) funciton and the [`translate()`](#translate) function. To translate you need a google translate token. From there it's pretty easy!

# Documentation:

## Functions

<dl>
<dt><a href="#translate">translate(text, token, [opts])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Translates text using google translate</p>
</dd>
<dt><a href="#token">token([cors], [seed], [storage])</a> ⇒ <code>Object</code></dt>
<dd><p>Gets a translation token from google translate.</p>
</dd>
</dl>

<a name="translate"></a>

## translate(text, token, [opts]) ⇒ <code>Promise.&lt;string&gt;</code>
Translates text using google translate

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - Returns a promise that is resolved by the translated version.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>String</code> |  | The text to translate |
| token | <code>Object</code> |  | A token generated by the token function. |
| [opts] | <code>Object</code> | <code>{to: &#x27;en&#x27;}</code> | The options, these can include "text", "from" and "to". |

<a name="token"></a>

## token([cors], [seed], [storage]) ⇒ <code>Object</code>
Gets a translation token from google translate.

**Kind**: global function  
**Returns**: <code>Object</code> - Returns an object with the token. {name: 'query param name for use in translate request', value: 'a number that is generated'}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [cors] | <code>String</code> | <code>&#x27;https://cors.explosionscratc.repl.co/&#x27;</code> | The URL to put before the request URL to google. For example 'https://cors.explosionscratc.repl.co/' (Needs to have the trailing slash) |
| [seed] | <code>String</code> | <code>Math.floor(performance.now() * 10000000000).toString(36)</code> | A string seed |
| [storage] | <code>Object</code> | <code>{get: (i) &#x3D;&gt; localStorage.getItem(i), set: (item, val) &#x3D;&gt; localStorage.setItem(item, val)}</code> | An optional object to store the key in. Pass an object such as this: {get: (item) => 'return this', set: (item, value) => 'set an item to a value'} Defaults to localStorage methods. |


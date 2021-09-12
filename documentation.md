<a name="translate"></a>

## translate(text, target, source) ⇒ <code>Promise.&lt;object&gt;</code>
Translates text to a certain language.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Returns a promise resolving into an object with the translated text, raw response JSON, the original text, and the target and source languages.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to translate (or an options object) |
| target | <code>String</code> | The target language to translate to. |
| source | <code>String</code> | The source language. |

**Example**  
```js
var translated = await translate("Hello world", "fr");
// --> {
// source: "en", 
// original: "Hello world",
// translated: "Bonjour le monde",
// result: "weird google stuff here"
//}
```

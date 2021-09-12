/**
 * Translates text to a certain language.
 * @param {String} text The text to translate (or an options object)
 * @param {String} target The target language to translate to.
 * @param {String} source The source language.
 * @returns {Promise.<object>} Returns a promise resolving into an object with the translated text, raw response JSON, the original text, and the target and source languages.
 * @example
 * var translated = await translate("Hello world", "fr");
 * &#47;* ⇒ 
 * {
 *  source: "en", 
 *  original: "Hello world",
 *  translated: "Bonjour le monde",
 *  result: "weird google stuff here"
 * }
 * *&#47;
 */
async function translate(text, target, source, proxy) {
  if (typeof text == "object") {
    target = text.target;
    source = text.source;
    proxy = text.proxy;
    text = text.text;
  }
  var opts = {
    text: text || "",
    source: source || 'auto',
    target: target || "en",
    proxy: proxy || "",
	}
  var result = await fetch(
    `https://${opts.proxy}translate.googleapis.com/translate_a/single?client=gtx&sl=${opts.source}&tl=${opts.target}&dt=t&q=${encodeURI(opts.text)}`
  ).then(res => res.json());
  return {
    source: opts.source,
    target: opts.target,
    original: text,
    translated: result[0]?.[0]?.[0],
    result,
  };
}

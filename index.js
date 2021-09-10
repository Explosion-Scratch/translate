/**
* Translates text using google translate
* @param {String} text The text to translate
* @param {Object} [opts={to: 'en'}] The options, these can include "text", "from" and "to".
* @param {Object} token A token generated by the token function.
* @returns {Promise.<string>} Returns a promise that is resolved by the translated version.
*/
function translate(text, opts, token) {
  opts = {
    to: "en",
    text,
    ...opts,
  };
  var data = {
    client: "p",
    sl: opts.from,
    tl: opts.to,
    hl: opts.to,
    ie: "UTF-8",
    oe: "UTF-8",
    otf: 1,
    ssel: 0,
    tsel: 0,
    kc: 7,
    q: opts.q || opts.text,
  };
  data[token.name] = token.value;

  var query = new URLSearchParams(data);
  //Don't ask
  for (let i of ["at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"]) {
    query.append("dt", i);
  }

  fetch(
    `https://cors.explosionscratc.repl.co/translate.google.com/translate_a/t?${query.toString()}`
  ).then((res) => res.json());
}

//This is used like this:
/*
await token("https://cors.explosionscratc.repl.co/", "This is a seed, it can be any string");
// --> {name: "tk", "value": 12409.35209}
*/
/**
* Gets a translation token from google translate.
* @param {String} [cors='https://cors.explosionscratc.repl.co/'] The URL to put before the request URL to google. For example 'https://cors.explosionscratc.repl.co/' (Needs to have the trailing slash)
* @param {String} [seed=Math.floor(performance.now() * 10000000000).toString(36)] A string seed 
* @param {Object} [storage={get: (i) => localStorage.getItem(i), set: (item, val) => localStorage.setItem(item, val)}] An optional object to store the key in. Pass an object such as this: {get: (item) => 'return this', set: (item, value) => 'set an item to a value'} Defaults to localStorage methods.
* @return {Object} Returns an object with the token. {name: 'query param name for use in translate request', value: 'a number that is generated'}
*/
function token(cors = 'https://cors.explosionscratc.repl.co/', seed = Math.floor(performance.now() * 10000000000).toString(36), storage = {get: (i) => localStorage.getItem(i), set: (item, val) => localStorage.setItem(item, val)}) {
  function sM(a) {
    var b;
    if (null !== yr) b = yr;
    else {
      b = wr(String.fromCharCode(84));
      var c = wr(String.fromCharCode(75));
      b = [b(), b()];
      b[1] = c();
      b = (yr = window[b.join(c())] || "") || "";
    }
    var d = wr(String.fromCharCode(116)),
      c = wr(String.fromCharCode(107)),
      d = [d(), d()];
    d[1] = c();
    c = "&" + d.join("") + "=";
    d = b.split(".");
    b = Number(d[0]) || 0;
    for (var e = [], f = 0, g = 0; g < a.length; g++) {
      var l = a.charCodeAt(g);
      128 > l
        ? (e[f++] = l)
        : (2048 > l
            ? (e[f++] = (l >> 6) | 192)
            : (55296 == (l & 64512) &&
              g + 1 < a.length &&
              56320 == (a.charCodeAt(g + 1) & 64512)
                ? ((l =
                    65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                  (e[f++] = (l >> 18) | 240),
                  (e[f++] = ((l >> 12) & 63) | 128))
                : (e[f++] = (l >> 12) | 224),
              (e[f++] = ((l >> 6) & 63) | 128)),
          (e[f++] = (l & 63) | 128));
    }
    a = b;
    for (f = 0; f < e.length; f++) (a += e[f]), (a = xr(a, "+-a^+6"));
    a = xr(a, "+-3^+b+-f");
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1e6;
    return c + (a.toString() + "." + (a ^ b));
  }

  var yr = null;
  var wr = function (a) {
      return function () {
        return a;
      };
    },
    xr = function (a, b) {
      for (var c = 0; c < b.length - 2; c += 3) {
        var d = b.charAt(c + 2),
          d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d),
          d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
        a = "+" == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
      }
      return a;
    };
  
  window.TKK = storage.get("TKK") || "0";

  function updateTKK(opts) {
    opts = opts || {
      tld: "com",
    };
    return new Promise(function (resolve, reject) {
      var now = Math.floor(Date.now() / 3600000);

      if (Number(window.TKK.split(".")[0]) === now) {
        resolve();
      } else {
        fetch(`${cors}translate.google.` + opts.tld)
          .then((res) => res.text())
          .then(function (res) {
            var matches = res.match(/tkk:\s?'(.+?)'/i);

            if (matches) {
              window.TKK = matches[1];
              storage.set("TKK", window.TKK);
            }

            /**
             * Note: If the regex or the eval fail, there is no need to worry. The server will accept
             * relatively old seeds.
             */

            resolve();
          })
          .catch(function (err) {
            var e = new Error();
            e.code = "BAD_NETWORK";
            e.message = err.message;
            reject(e);
          });
      }
    });
  }

  function get(text, opts) {
    return updateTKK(opts)
      .then(function () {
        var tk = sM(text);
        tk = tk.replace("&tk=", "");
        return {
          name: "tk",
          value: tk,
        };
      })
      .catch(function (err) {
        throw err;
      });
  }
  return get(seed);
}

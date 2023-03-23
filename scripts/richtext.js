function edjsHTML() {
  var e = ["left", "right", "center", "justify"],
    t = {
      delimiter: function () {
        return "<br/>";
      },
      header: function (e) {
        var t = e.data;
        return "<h" + t.level + ">" + t.text + "</h" + t.level + ">";
      },
      paragraph: function (t) {
        var r = t.data,
          n = r.alignment || r.align;
        return void 0 !== n && e.includes(n)
          ? '<p style="text-align:' + n + ';">' + r.text + "</p>"
          : "<p>" + r.text + "</p>";
      },
      list: function (e) {
        var t = e.data,
          r = "unordered" === t.style ? "ul" : "ol",
          n = function (e, t) {
            var r = e.map(function (e) {
              if (!e.content && !e.items) return "<li>" + e + "</li>";
              var r = "";
              return (
                e.items && (r = n(e.items, t)),
                e.content ? "<li> " + e.content + " </li>" + r : void 0
              );
            });
            return "<" + t + ">" + r.join("") + "</" + t + ">";
          };
        return n(t.items, r);
      },
      image: function (e) {
        var t = e.data,
          r = t.caption ? t.caption : "Image";
        return (
          '<img src="' +
          (t.file && t.file.url ? t.file.url : t.url) +
          '" alt="' +
          r +
          '" />'
        );
      },
      quote: function (e) {
        var t = e.data;
        return "<blockquote>" + t.text + "</blockquote> - " + t.caption;
      },
      code: function (e) {
        return "<pre><code>" + e.data.code + "</code></pre>";
      },
      embed: function (e) {
        var t = e.data;
        switch (t.service) {
          case "vimeo":
            return (
              '<iframe src="' +
              t.embed +
              '" height="' +
              t.height +
              '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
            );
          case "youtube":
            return (
              '<iframe width="' +
              t.width +
              '" height="' +
              t.height +
              '" src="' +
              t.embed +
              '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            );
          default:
            throw new Error(
              "Only Youtube and Vime Embeds are supported right now."
            );
        }
      },
    };
  function r(e) {
    return new Error(
      '[31m The Parser function of type "' +
        e +
        '" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m'
    );
  }
  var n = function (e) {
    void 0 === e && (e = {});
    var i = Object.assign({}, t, e);
    return {
      parse: function (e) {
        return e.blocks.map(function (e) {
          return i[e.type] ? i[e.type](e) : r(e.type);
        });
      },
      parseBlock: function (e) {
        return i[e.type] ? i[e.type](e) : r(e.type);
      },
      parseStrict: function (e) {
        var t = e.blocks,
          o = n(i).validate({ blocks: t });
        if (o.length)
          throw new Error(
            "Parser Functions missing for blocks: " + o.toString()
          );
        for (var a = [], u = 0; u < t.length; u++) {
          if (!i[t[u].type]) throw r(t[u].type);
          a.push(i[t[u].type](t[u]));
        }
        return a;
      },
      validate: function (e) {
        var t = e.blocks
            .map(function (e) {
              return e.type;
            })
            .filter(function (e, t, r) {
              return r.indexOf(e) === t;
            }),
          r = Object.keys(i);
        return t.filter(function (e) {
          return !r.includes(e);
        });
      },
    };
  };
  return n;
}
function ParseEditorJsBlocks(data) {
  const editorjs_data = {
    blocks: data,
  };
  //可以自定义转换函数
  const edjsParser = edjsHTML()();
  let htmlarray = edjsParser.parse(editorjs_data);

  let html = "";
  htmlarray.forEach((element) => {
    html += element;
  });
  return html;
}
function test() {
  return ParseEditorJsBlocks([
    { id: "QyYn8M-ly4", type: "paragraph", data: { text: "12" } },
    { id: "1ZWwAAOA70", type: "paragraph", data: { text: "12" } },
    {
      id: "2Feuo_P1q_",
      type: "list",
      data: {
        style: "unordered",
        items: [
          { content: "222", items: [] },
          { content: "23123", items: [] },
          { items: [], content: "1231" },
        ],
      },
    },
    { id: "tOt5YiHPW7", type: "paragraph", data: { text: "1" } },
  ]);
}

# 📦 Next-Editor-Engine
This is the core engine library of the editor, which has the basic functions required for general editing.

## Engine basic functions
+ bold (ctrl + b)
+ italic (ctrl + i)
+ underline (ctrl + u)
+ alignment (left: ctrl + shift + l , center: ctrl + shift + c , right: ctrl + shift + r , justify: ctrl + shift + j)
+ backcolor
+ fontcolor
+ fontsize
+ heading (h1 ctrl+alt+1,h2 ctrl+alt+2,h3 ctrl+alt+3,h4 ctrl+alt+4,h5 ctrl+alt+5,h6 ctrl+alt+6)
+ tasklist (orderedlist (ctrl+shift+7) , unorderedlist (ctrl+shift+8) , tasklist (ctrl+shift+9))
+ code (ctrl + e)
+ link (ctrl + k)
+ hr (ctrl + shift + e)
+ strikethrough (ctrl+shift+x)
+ quote (ctrl+shift+u)
+ sub (ctrl+,)
+ sup (ctrl+.)
+ indent (ctrl+])
+ outdent (ctrl+[)
+ undo (ctrl + z)
+ redo (ctrl + y)
+ removeformat (ctrl+\)
+ markdown


## Usage

**JS**

constructor.js  
```
import Engine from "next-editor-engine";

const EDITOR_CLS = "next-editor";
const TOOLBAR_BTN_CLS = "toolbar-btn";
const headingGroup = ["h1", "h2", "h3", "h4", "h5", "h6"];
const listGroup = ["orderedlist", "unorderedlist", "tasklist"];
const defaultToolbarItem = [
  [...headingGroup],
  ["bold", "italic", "underline", "quote"],
  [...listGroup],
];

/**
 * Constructor
 */
function Constructor({ editorElement }) {
  const editWrap =
    typeof editorElement === "string" ? document.getElementById(editorElement) : editorElement;

  if (!editWrap) {
    if (typeof editorElement === "string") {
      throw Error(
        `[NextEditor.create.fail] The element for that id was not found (ID: "${editorElement}")`
      );
    }
    throw Error("[NextEditor.create.fail] NextEditor requires html element or element id");
  }

  this.editArea = (() => {
    const editArea_div = document.createElement("DIV");
    editArea_div.className = `${EDITOR_CLS}_content`;
    return editArea_div;
  })();

  /**
   * Engine Create
   */
  this.engine = (() => {
    const engine = Engine.create(this.editArea, {});
    engine.on("change", (value) => {
      console.log(value);
      this.updateState();
    });

    engine.on("select", (e) => {
      console.log(e);
      this.updateState();
    });
    return engine;
  })();

  this.updateState = () => {
    //
  };

  /**
   * Editor init
   * @param {*} param
   */
  this.init = ({ toolbarItem }) => {
    editWrap.className = `${EDITOR_CLS}`;
    if (
      !toolbarItem ||
      !Array.isArray(toolbarItem) ||
      (Array.isArray(toolbarItem) && toolbarItem.length === 0)
    ) {
      toolbarItem = defaultToolbarItem;
    }
    const toolbar = this.createToolbar(toolbarItem);
    editWrap.insertAdjacentElement("afterbegin", toolbar);
    editWrap.appendChild(this.editArea);
  };

  const onHeading = (event, btn, type) => {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("heading", type);
      const btnSiblings = btn.parentNode.children;
      const headingType = this.engine.command.queryState("heading");
      const boldBtn = document.getElementsByClassName(`${TOOLBAR_BTN_CLS} btn-bold`)?.[0];
      if (boldBtn) {
        boldBtn.setAttribute("disabled", true);
        if (headingType !== type) {
          boldBtn.removeAttribute("disabled");
        }
      }
      const defaultCls = `${TOOLBAR_BTN_CLS} btn-${type}`;
      Array.prototype.forEach.call(btnSiblings, (ele) => {
        ele.className = defaultCls;
        ele.removeAttribute("disabled");
      });
      btn.className = headingType === type ? `${defaultCls} active` : defaultCls;
    }
  };

  const onList = (event, btn, type) => {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("tasklist", type);
      const btnSiblings = btn.parentNode.children;
      const cmdType = this.engine.command.queryState("tasklist");
      const defaultCls = `${TOOLBAR_BTN_CLS} btn-${type}`;
      Array.prototype.forEach.call(btnSiblings, (ele) => {
        ele.className = defaultCls;
        ele.removeAttribute("disabled");
      });
      btn.className = cmdType === type ? `${defaultCls} active` : defaultCls;
    }
  };

  const onCommon = (event, btn, type) => {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute(type);
      const cmdType = this.engine.command.queryState(type);
      const defaultCls = `${TOOLBAR_BTN_CLS} btn-${type}`;
      btn.className = cmdType ? `${defaultCls} active` : defaultCls;
      if (type === "bold") {
        const tag = this.engine.command.queryState("heading") || "p";
        if (/^h\d$/.test(tag)) {
          btn.setAttribute("disabled", true);
        } else {
          btn.removeAttribute("disabled");
        }
      }
    }
  };

  /**
   * @description Create editor toolbar
   * @param {Array} toolbarItem option.toolbarItem
   */
  this.createToolbar = (toolbarItem) => {
    // toolbar wrapper
    const toolbar_div = document.createElement("DIV");
    toolbar_div.className = `${EDITOR_CLS}__toolbar`;

    toolbarItem.forEach((itemGroup) => {
      // toolbar group
      const buttonGroup = document.createElement("DIV");
      buttonGroup.className = `${EDITOR_CLS}__toolbar-group`;

      if (Array.isArray(itemGroup)) {
        itemGroup.forEach((item) => {
          let btn = document.createElement("button");
          let btn_txt = document.createTextNode(item);
          // toolbar button className
          btn.className = `${TOOLBAR_BTN_CLS} btn-${item}`;
          if (headingGroup.includes(item)) {
            btn.onclick = (e) => onHeading(e, btn, item);
          } else if (listGroup.includes(item)) {
            btn.onclick = (e) => onList(e, btn, item);
          } else {
            btn.onclick = (e) => onCommon(e, btn, item);
          }
          btn.appendChild(btn_txt);
          buttonGroup.appendChild(btn);
        });
      }

      toolbar_div.appendChild(buttonGroup);
    });

    return toolbar_div;
  };
}

export default Constructor;
```

editor.js
```
import constructor from "./constructor";
import "./index.less";

const renderEditor = () => {
  const editor = new constructor({
    editorElement: document.getElementById("root"),
  });
  editor.init({});
};

export default renderEditor;
```

html
```
<div id="root"></div>
```


**React**
```
import React from "react";
import Engine from "next-editor-engine";
import "./index.less";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editArea = React.createRef();
  }

  componentDidMount() {
    this.engine = this.renderEditor();
  }

  componentWillUnmount() {
    this.engine && this.engine.destroy();
  }

  renderEditor() {
    const engine = Engine.create(this.editArea.current, {});
    engine.on("change", (value) => {
      console.log(value);
      this.updateState();
    });
    engine.on("select", () => {
      this.updateState();
    });
    return engine;
  }

  updateState() {
    if (!this.engine) {
      return;
    }

    const h1State = {
      className: this.engine.command.queryState("heading") === "h1" ? "toolbar-btn active" : "toolbar-btn",
    };

    const h2State = {
      className: this.engine.command.queryState("heading") === "h2" ? "toolbar-btn active" : "toolbar-btn",
    };

    const h3State = {
      className: this.engine.command.queryState("heading") === "h3" ? "toolbar-btn active" : "toolbar-btn",
    };

    const boldState = {
      className: this.engine.command.queryState("bold") ? "toolbar-btn active" : "toolbar-btn",
      disabled: function () {
        const tag = this.engine.command.queryState("heading") || "p";
        return /^h\d$/.test(tag);
      }.call(this),
    };

    const italicState = {
      className: this.engine.command.queryState("italic") ? "toolbar-btn active" : "toolbar-btn",
    };

    const underlineState = {
      className: this.engine.command.queryState("underline") ? "toolbar-btn active" : "toolbar-btn",
    };

    const quoteState = {
      className: this.engine.command.queryState("quote") ? "toolbar-btn active" : "toolbar-btn",
    };

    const orderedlistState = {
      className: this.engine.command.queryState("tasklist") === "orderedlist" ? "toolbar-btn active" : "toolbar-btn",
    };

    const unorderedlistState = {
      className: this.engine.command.queryState("tasklist") === "unorderedlist" ? "toolbar-btn active" : "toolbar-btn",
    };

    const tasklistState = {
      className: this.engine.command.queryState("tasklist") === "tasklist" ? "toolbar-btn active" : "toolbar-btn",
    };

    this.setState({
      h1State,
      h2State,
      h3State,
      boldState,
      italicState,
      underlineState,
      quoteState,
      orderedlistState,
      unorderedlistState,
      tasklistState,
    });
  }

  onHeading = (event, type) => {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("heading", type);
    }
  };

  onList = (event, type) => {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("tasklist", type);
    }
  };

  onCommon = (event, type) => {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute(type);
    }
  };

  render() {
    const {
      boldState,
      italicState,
      underlineState,
      quoteState,
      h1State,
      h2State,
      h3State,
      orderedlistState,
      unorderedlistState,
      tasklistState,
    } = this.state;
    return (
      <div className="example-layout">
        <h2 className="example-title">NEXT-EDITOR-ENGINE Example</h2>
        <div className="next-editor">
          <div className="next-editor__toolbar">
            <div className="next-editor__toolbar-group">
              <button
                {...h1State}
                onClick={(event) => {
                  this.onHeading(event, "h1");
                }}
              >
                h1
              </button>
              <button
                {...h2State}
                onClick={(event) => {
                  this.onHeading(event, "h2");
                }}
              >
                h2
              </button>
              <button
                {...h3State}
                onClick={(event) => {
                  this.onHeading(event, "h3");
                }}
              >
                h3
              </button>
            </div>
            <div className="next-editor__toolbar-group">
              <button
                {...boldState}
                onClick={(event) => {
                  this.onCommon(event, "bold");
                }}
              >
                bold
              </button>
              <button
                {...italicState}
                onClick={(event) => {
                  this.onCommon(event, "italic");
                }}
              >
                italic
              </button>
              <button
                {...underlineState}
                onClick={(event) => {
                  this.onCommon(event, "underline");
                }}
              >
                underline
              </button>
              <button
                {...quoteState}
                onClick={(event) => {
                  this.onCommon(event, "quote");
                }}
              >
                quote
              </button>
            </div>
            <div className="next-editor__toolbar-group">
              <button
                {...orderedlistState}
                onClick={(event) => {
                  this.onList(event, "orderedlist");
                }}
              >
                orderedlist
              </button>
              <button
                {...unorderedlistState}
                onClick={(event) => {
                  this.onList(event, "unorderedlist");
                }}
              >
                unorderedlist
              </button>
              <button
                {...tasklistState}
                onClick={(event) => {
                  this.onList(event, "tasklist");
                }}
              >
                tasklist
              </button>
            </div>
          </div>
          <div className="next-editor_content" ref={this.editArea}></div>
        </div>
      </div>
    );
  }
}
export default Editor;
```
# License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

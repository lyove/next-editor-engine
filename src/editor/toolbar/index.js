import {
  EDITOR_CLS,
  TOOLBAR_BTN_CLS,
  headingGroup,
  listGroup,
  fontsizeGroup,
  fontcolorGroup,
  backcolorGroup,
  alignmentGroup,
} from "../constants";
import { toolbarConfig } from "../config/toolbar";

/**
 * Toolbar
 */
class Toolbar {
  constructor(engine) {
    this.engine = engine;
    this.buttons = {};
  }

  // Common
  commonExecute(event, btn, type) {
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
  }

  // Heading
  headingExecute(event, btn, type) {
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
  }

  // List
  listExecute(event, btn, type) {
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
  }

  // Fontsize
  fontsizeExecute(event, btn, type) {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("fontsize", type);
    }
  }

  // Fontcolor
  fontcolorExecute(event, btn, type) {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("fontcolor", type);
    }
  }

  // Backcolor
  backcolorExecute(event, btn, type) {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("backcolor", type);
    }
  }

  // Alignment
  alignmentExecute(event, btn, type) {
    event.preventDefault();
    if (this.engine) {
      this.engine.command.execute("alignment", type);
      const btnSiblings = btn.parentNode.children;
      const cmdType = this.engine.command.queryState("alignment");
      const defaultCls = `${TOOLBAR_BTN_CLS} btn-${type}`;
      Array.prototype.forEach.call(btnSiblings, (ele) => {
        ele.className = defaultCls;
      });
      btn.className = cmdType === type ? `${defaultCls} active` : defaultCls;
    }
  }

  render(toolbarItem) {
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
          const config = toolbarConfig[item] || {};
          let btn_txt = document.createTextNode(config.icon || item);
          // toolbar button className
          btn.className = `${TOOLBAR_BTN_CLS} btn-${item}`;
          btn.title = config.title || item;

          if (headingGroup.includes(item)) {
            btn.onclick = (e) => this.headingExecute(e, btn, item);
          } else if (listGroup.includes(item)) {
            btn.onclick = (e) => this.listExecute(e, btn, item);
          } else if (fontsizeGroup.includes(item)) {
            btn.onclick = (e) => this.fontsizeExecute(e, btn, item);
          } else if (fontcolorGroup.includes(item)) {
            btn.onclick = (e) => this.fontcolorExecute(e, btn, item);
          } else if (backcolorGroup.includes(item)) {
            btn.onclick = (e) => this.backcolorExecute(e, btn, item);
          } else if (alignmentGroup.includes(item)) {
            btn.onclick = (e) => this.alignmentExecute(e, btn, item);
          } else {
            btn.onclick = (e) => this.commonExecute(e, btn, item);
          }
          btn.appendChild(btn_txt);
          this.buttons[item] = btn;
          buttonGroup.appendChild(btn);
        });
      }

      toolbar_div.appendChild(buttonGroup);
    });

    return toolbar_div;
  }

  updateButtons() {
    // Update all buttons state based on current selection
    Object.keys(this.buttons).forEach((key) => {
      const btn = this.buttons[key];
      const config = toolbarConfig[key];

      if (headingGroup.includes(key)) {
        const headingType = this.engine.command.queryState("heading");
        const defaultCls = `${TOOLBAR_BTN_CLS} btn-${key}`;
        btn.className = headingType === key ? `${defaultCls} active` : defaultCls;
      } else if (alignmentGroup.includes(key)) {
        const alignType = this.engine.command.queryState("alignment");
        const defaultCls = `${TOOLBAR_BTN_CLS} btn-${key}`;
        btn.className = alignType === key ? `${defaultCls} active` : defaultCls;
      } else if (config.tag) {
        const isActive = this.engine.command.queryState(key);
        const defaultCls = `${TOOLBAR_BTN_CLS} btn-${key}`;
        btn.className = isActive ? `${defaultCls} active` : defaultCls;
      }
    });
  }
}
export default Toolbar;

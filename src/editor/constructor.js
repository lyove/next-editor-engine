import Engine from "../engine";

import {
  EDITOR_CLS,
  TOOLBAR_BTN_CLS,
  defaultToolbarItem,
  headingGroup,
  listGroup,
} from "./constants";

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

import Engine from "../engine";
import Toolbar from "./toolbar";
import { createElement } from "./help/dom";
import { EDITOR_CLS, defaultToolbarItem } from "./constants";

/**
 * Constructor
 */
class Editor {
  constructor(options) {
    this.options = options;
    this.editArea = createElement("div", {
      attributes: { class: `${EDITOR_CLS}_content` },
    });
    this.engine = Engine.create(this.editArea, {});
    this.engine.on("change", (value) => {
      console.log(value);
      this.updateState();
    });
  }

  updateState() {
    //
  }

  /**
   * Editor init
   * @param {*} param
   */
  init({ toolbarItem }) {
    const { editorElement } = this.options;
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
    editWrap.className = `${EDITOR_CLS}`;
    if (
      !toolbarItem ||
      !Array.isArray(toolbarItem) ||
      (Array.isArray(toolbarItem) && toolbarItem.length === 0)
    ) {
      toolbarItem = defaultToolbarItem;
    }
    const toolbar = new Toolbar(this.engine).render(toolbarItem);
    editWrap.insertAdjacentElement("afterbegin", toolbar);
    editWrap.appendChild(this.editArea);
  }
}

export default Editor;

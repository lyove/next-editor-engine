import getNodeModel from "../models/node";
import { getClosestBlock } from "../changes/utils";

class Checkbox {
  constructor(engine) {
    this.hasFocus = false;
    if (engine) {
      this.engine = engine;
      this.card = engine.card;
    }
  }

  onClick(node) {
    if (!this.card) {
      return;
    }
    const isChecked = node.hasClass("xEditor-checkbox-checked");
    if (isChecked) {
      node.removeClass("xEditor-checkbox-checked");
      this.cardRoot.find(".xEditor-checkbox-input").removeAttr("checked");
    } else {
      node.addClass("xEditor-checkbox-checked");
      this.cardRoot.find(".xEditor-checkbox-input").attr("checked", "checked");
    }
    this.value = !isChecked;
    this.card.setValue(this.cardRoot, this.value);
    this.engine.history.save();
  }

  setListChecked = (value) => {
    const block = getClosestBlock(this.cardRoot);
    if (block && block.hasClass("xEditor-list-task")) {
      block.attr("data-xEditor-checked", value);
    }
  };

  render(container, value) {
    const html =
      '\n    <span class="xEditor-checkbox">\n      <input type="checkbox" class="xEditor-checkbox-input" value="">\n      <span class="xEditor-checkbox-inner"></span>\n    </span>\n    ';
    const node = getNodeModel(html);
    if (value) {
      node.addClass("xEditor-checkbox-checked");
      node.find(".xEditor-checkbox-input").attr("checked", "checked");
    }
    container.append(node);
    this.setListChecked(value);
    if (!this.engine) {
      return;
    }

    node.on("click", () => {
      return this.onClick(node);
    });
  }
}

Checkbox.type = "inline";
Checkbox.singleSelectable = false;
Checkbox.canCollab = true;
export default Checkbox;

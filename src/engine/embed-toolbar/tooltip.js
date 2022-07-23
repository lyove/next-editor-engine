import getNodeModel from "../models/node";
import { escape } from "../utils/string";

const template = (options) => {
  return '\n  <div data-xEditor-element="embed-tooltip" class="xEditor-tooltip xEditor-tooltip-placement-'.concat(
    options.placement,
    ' xEditor-embed-tooltip" style="transform-origin: 50% 45px 0px;">\n    <div class="xEditor-tooltip-content">\n      <div class="xEditor-tooltip-arrow"></div>\n      <div class="xEditor-tooltip-inner" data-role="tooltip"></div>\n    </div>\n  </div>\n  '
  );
};

export default {
  show: function (node, title, options) {
    options = options || {
      placement: "top",
    };
    this.hide();
    const root = getNodeModel(template(options));
    // 设置提示文字
    title = escape(title);
    root.find("[data-role=tooltip]").html(title);
    // 计算定位
    const container = getNodeModel(document.body);
    container.append(root);
    const rootWidth = root[0].clientWidth;
    const rootHeight = root[0].clientHeight;
    const nodeWidth = node[0].clientWidth;
    const offset = node.offset();
    const left = Math.round(window.pageXOffset + offset.left + nodeWidth / 2 - rootWidth / 2);
    const top = Math.round(window.pageYOffset + offset.top - rootHeight - 2);
    root.css({
      left: left + "px",
      top: top + "px",
    });
    root.addClass("xEditor-embed-tooltip-active");
  },
  hide: function () {
    getNodeModel("div[data-xEditor-element=embed-tooltip]").remove();
  },
};

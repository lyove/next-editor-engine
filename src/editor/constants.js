export const EDITOR_CLS = "next-editor";
export const TOOLBAR_BTN_CLS = "toolbar-btn";

export const headingGroup = ["h1", "h2", "h3", "h4", "h5", "h6"];
export const listGroup = ["orderedlist", "unorderedlist", "tasklist"];
export const fontsizeGroup = [9, 10, 11, 12, 13, 14];
export const fontcolorGroup = ["#b943ff", "#ff4343", "#4395ff"];
// export const backcolorGroup = ["#b943ff", "#ff4343", "#4395ff"];

export const defaultToolbarItem = [
  ["undo", "redo"],
  [...headingGroup],
  ["bold", "italic", "underline", "strikethrough", "quote", "code", "mark", "sup", "sub"],
  // ["fontsize", "fontcolor", "backcolor"],
  [...fontsizeGroup],
  [...fontcolorGroup],
  // [...backcolorGroup],
  [...listGroup],
  ["indent", "outdent", "alignment"],
  // ["removeformat"],
];

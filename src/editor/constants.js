export const EDITOR_CLS = "next-editor";
export const TOOLBAR_BTN_CLS = "toolbar-btn";

export const headingGroup = ["h1", "h2", "h3", "h4", "h5", "h6"];
export const listGroup = ["orderedlist", "unorderedlist", "tasklist"];
export const fontsizeGroup = [9, 10, 11, 12, 13, 14];
export const fontcolorGroup = ["#b943ff", "#ff4343", "#4395ff", "#2d7d32", "#f0c239"];
export const backcolorGroup = ["#ffe7e7", "#fff8c5", "#e7f8ff", "#e7ffe7", "#f3e7ff"];
export const alignmentGroup = ["left", "center", "right", "justify"];

export const defaultToolbarItem = [
  ["undo", "redo", "selectall"],
  [...headingGroup],
  ["bold", "italic", "underline", "strikethrough", "mark", "quote", "code"],
  ["sup", "sub", "link", "removeformat", "paintformat"],
  ["fontsize", ...fontsizeGroup],
  ["fontcolor", ...fontcolorGroup],
  ["backcolor", ...backcolorGroup],
  [...alignmentGroup],
  ["indent", "outdent"],
  [...listGroup],
  ["hr", "checkbox"],
  ["markdown"],
];

export const demoContent = `
<h1>Welcome to Next Editor Engine</h1>
<p>This is a powerful rich text editor engine demonstration.</p>
<h2>Main Features:</h2>
<ul>
  <li>Text Formatting: <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, <s>Strikethrough</s></li>
  <li>Heading Styles: H1-H6 multiple heading levels</li>
  <li>List Support: Ordered list, Unordered list, Task list</li>
  <li>Code Block Support</li>
  <li>Blockquote Support</li>
  <li>Link Insertion</li>
  <li>Horizontal Divider</li>
  <li>Font Size and Color Adjustment</li>
  <li>Alignment Control</li>
  <li>Markdown Support</li>
  <li>Undo/Redo</li>
</ul>
<blockquote>Start editing and experience the powerful rich text editing features!</blockquote>
`;

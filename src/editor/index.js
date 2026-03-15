import Editor from "./editor";
import "./index.less";

const renderEditor = () => {
  const editor = new Editor({
    editorElement: document.getElementById("root"),
  });
  editor.init({
    toolbarItem: [
      ["undo", "redo", "selectall"],
      ["h1", "h2", "h3", "h4", "h5", "h6"],
      ["bold", "italic", "underline", "strikethrough", "mark", "quote", "code"],
      ["sup", "sub", "link", "removeformat", "paintformat"],
      ["fontsize", 9, 10, 11, 12, 13, 14],
      ["fontcolor", "#b943ff", "#ff4343", "#4395ff", "#2d7d32", "#f0c239"],
      ["backcolor", "#ffe7e7", "#fff8c5", "#e7f8ff", "#e7ffe7", "#f3e7ff"],
      ["left", "center", "right", "justify"],
      ["indent", "outdent"],
      ["orderedlist", "unorderedlist", "tasklist"],
      ["hr", "checkbox"],
      ["markdown"],
    ],
  });
};

export default renderEditor;

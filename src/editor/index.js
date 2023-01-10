import Editor from "./editor";
import "./index.less";

const renderEditor = () => {
  const editor = new Editor({
    editorElement: document.getElementById("root"),
  });
  editor.init({
    toolbarItem: [
      ["undo", "redo"],
      ["h1", "h2", "h3", "h4", "h5", "h6"],
      ["bold", "italic", "underline", "strikethrough", "quote", "code", "mark", "sup", "sub"],
      [9, 10, 11, 12, 13, 14],
      ["#b943ff", "#ff4343", "#4395ff"],
      ["orderedlist", "unorderedlist", "tasklist"],
      ["indent", "outdent", "alignment"],
    ],
  });
};

export default renderEditor;

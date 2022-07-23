import constructor from "./constructor";
import "./index.less";

const renderEditor = () => {
  const editor = new constructor({
    editorElement: document.getElementById("root"),
  });
  editor.init({});
};

export default renderEditor;

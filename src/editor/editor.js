import Engine from "../engine";
import Toolbar from "./toolbar";
import { createElement } from "./help/dom";
import { EDITOR_CLS, defaultToolbarItem, demoContent } from "./constants";

/**
 * Constructor
 */
class Editor {
  constructor(options) {
    this.options = options;
    this.editArea = createElement("div", {
      attributes: { class: `${EDITOR_CLS}_content` },
    });
    this.statusBar = null;
    this.toolbar = null;
    this.engine = Engine.create(this.editArea, {
      lang: "en",
      placeholder: "Start typing...",
    });
    this.engine.on("change", (value) => {
      console.log(value);
      this.updateState();
      this.updateStatusBar();
    });
    this.engine.on("selectionchange", () => {
      this.updateToolbarState();
      this.updateStatusBar();
    });
  }

  get content() {
    return this.engine.editArea.html() || "";
  }

  set content(html) {
    this.engine.setValue(html);
  }

  updateState() {
    //
  }

  updateToolbarState() {
    if (this.toolbar) {
      this.toolbar.updateButtons();
    }
  }

  updateStatusBar() {
    if (!this.statusBar) return;

    const range = this.engine.change.getRange();
    const content = this.content || "";
    const textContent = content.replace(/<[^>]*>/g, " ").trim();
    const wordCount = textContent
      ? textContent.split(/\s+/).filter((word) => word.length > 0).length
      : 0;
    const charCount = textContent.length;

    const pathEl = this.statusBar.querySelector(".editor-status-path");
    const countEl = this.statusBar.querySelector(".editor-status-count");

    if (pathEl && range) {
      const path = this.getNodePath(range.startContainer);
      pathEl.textContent = path.length > 0 ? path.join(" > ") : "Body";
    }

    if (countEl) {
      countEl.textContent = `Chars: ${charCount} | Words: ${wordCount}`;
    }
  }

  getNodePath(node) {
    const path = [];
    while (node && node.nodeType === 1) {
      let nodeName = node.nodeName.toLowerCase();
      if (node.className) {
        nodeName += "." + node.className.split(" ")[0];
      }
      path.unshift(nodeName);
      node = node.parentNode;
    }
    return path.length > 0 ? path : ["body"];
  }

  exportHTML() {
    return this.content;
  }

  exportMarkdown() {
    return Engine.MarkdownParser.toMarkdown(this.content);
  }

  importHTML(html) {
    this.content = html;
  }

  importMarkdown(markdown) {
    const html = Engine.MarkdownParser.toHTML(markdown);
    this.content = html;
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
    this.toolbar = new Toolbar(this.engine).render(toolbarItem);
    editWrap.insertAdjacentElement("afterbegin", this.toolbar);
    editWrap.appendChild(this.editArea);

    // Create status bar
    this.createStatusBar(editWrap);

    // Set default content
    this.importHTML(demoContent);

    // Add export buttons
    this.addExportButtons(editWrap);

    // Initialize status bar display
    setTimeout(() => {
      this.updateStatusBar();
    }, 100);
  }

  createStatusBar(editWrap) {
    this.statusBar = document.createElement("div");
    this.statusBar.className = `${EDITOR_CLS}__status-bar`;
    this.statusBar.innerHTML = `
      <div class="editor-status-path">Body</div>
      <div class="editor-status-count">Chars: 0 | Words: 0</div>
    `;
    editWrap.appendChild(this.statusBar);
  }

  addExportButtons(editWrap) {
    const exportDiv = document.createElement("div");
    exportDiv.className = `${EDITOR_CLS}__export`;
    exportDiv.innerHTML = `
      <button class="export-btn" id="export-html">Export HTML</button>
      <button class="export-btn" id="export-markdown">Export Markdown</button>
      <button class="export-btn" id="clear-content">Clear Content</button>
    `;
    editWrap.insertBefore(exportDiv, this.statusBar);

    // Bind events
    const htmlBtn = exportDiv.querySelector("#export-html");
    const markdownBtn = exportDiv.querySelector("#export-markdown");
    const clearBtn = exportDiv.querySelector("#clear-content");

    if (htmlBtn) {
      htmlBtn.onclick = () => {
        const html = this.exportHTML();
        this.showExportDialog("HTML", html);
      };
    }

    if (markdownBtn) {
      markdownBtn.onclick = () => {
        const markdown = this.exportMarkdown();
        this.showExportDialog("Markdown", markdown);
      };
    }

    if (clearBtn) {
      clearBtn.onclick = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to clear all content?")) {
          try {
            this.content = "<p><br/></p>";
            this.updateStatusBar();
            if (this.toolbar) {
              this.toolbar.updateButtons();
            }
          } catch (error) {
            console.error("Failed to clear content:", error);
          }
        }
      };
    }
  }

  showExportDialog(type, content) {
    const dialog = document.createElement("div");
    dialog.className = "export-dialog";
    dialog.innerHTML = `
      <div class="export-dialog-overlay">
        <div class="export-dialog-content">
          <h3>Export ${type}</h3>
          <textarea readonly>${this.escapeHtml(content)}</textarea>
          <div class="export-dialog-actions">
            <button class="copy-btn">Copy</button>
            <button class="close-btn">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    dialog.querySelector(".copy-btn").onclick = () => {
      const textarea = dialog.querySelector("textarea");
      textarea.select();
      document.execCommand("copy");
      alert("Copied to clipboard");
    };

    dialog.querySelector(".close-btn").onclick = () => {
      dialog.remove();
    };

    dialog.querySelector(".export-dialog-overlay").onclick = (e) => {
      if (e.target === e.currentTarget) {
        dialog.remove();
      }
    };
  }

  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
}

export default Editor;

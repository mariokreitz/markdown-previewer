import React from "react";
import { TbResize } from "react-icons/tb";
import { marked } from "marked";
import { prism } from "prismjs";
import "./App.css";
class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textAreaRow: "",
    };

    marked.setOptions({
      breaks: true,
      highligh: function (code) {
        return prism.highlight(code, prism.language.javascript, "javascript");
      },
    });

    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      return (
        <a target="_blank" href={href}>
          {text}
        </a>
      );
    };
  }
  componentDidMount() {
    this.setState({
      text: this.defaultMarkDownText,
      textAreaRow: "12",
    });
  }

  defaultMarkDownText = `
# Header (H1 size)

## Subheader (H2 size)

[Link to Google](https://www.google.com)

Inline code: \`console.log('Hello, world!')\`

Code block:

\`\`\`javascript
function greet() {
  console.log('Hello, world!');
}
greet();
\`\`\`

- List item 1
- List item 2

> Blockquote: This is a blockquote.

![Image](https://via.placeholder.com/150)

**Bolded text**
`;

  toggleSize() {
    if (this.state.textAreaRow === "12") {
      return "32";
    } else if (this.state.textAreaRow === "32") {
      return "12";
    } else {
      return "12";
    }
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }
  handleClick() {
    this.setState({
      text: this.state.text,
      textAreaRow: this.toggleSize(),
    });
  }
  render() {
    return (
      <>
        <h1 style={{ textAlign: "center", margin: "16px" }}>
          Markdown Previewer
        </h1>
        <div className="boxes-container">
          <div className="markdown-input">
            <div className="tool-bar">
              <div className="resize-icon">
                <TbResize onClick={this.handleClick.bind(this)}></TbResize>
              </div>
            </div>
            <textarea
              name="editor"
              id="editor"
              value={this.state.text}
              onChange={this.handleChange.bind(this)}
              rows={this.state.textAreaRow}
            ></textarea>
          </div>
          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: marked(this.state.text, { renderer: this.renderer }),
            }}
          ></div>
        </div>
      </>
    );
  }
}

export default MarkdownPreviewer;

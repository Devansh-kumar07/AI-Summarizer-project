import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(` Enter Your Text
`)
  const [lesson, setLesson] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function learnFromCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setLesson(response.data)
    } catch (error) {
      console.error('Error getting lesson:', error)
      setLesson('Sorry, there was an error processing your Text. Please try again.')
    }
  }

  return (
    <>
      <div className="header">
        <h1>AI Text Summarizer</h1>
      </div>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={learnFromCode}
            className="review">Summarize</div>
        </div>
        <div className="right">
          {!lesson ? (
            <div className="empty-state">
              <h2>Ready to learn?</h2>
              <p>Enter your text on the left and click "Summarize" to get personalized summary</p>
            </div>
          ) : (
            <Markdown
              rehypePlugins={[rehypeHighlight]}
            >{lesson}</Markdown>
          )}
        </div>
      </main>
    </>
  )
}



export default App

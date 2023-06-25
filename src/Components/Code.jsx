import React from "react"
import { useState, useEffect } from "react";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import {Controlled as ControlledEditorComponent } from 'react-codemirror2';


const Code = ({language, value, setEditorState}) => {
    const [theme, setTheme] = useState(() => {
        const localValue = localStorage.getItem("codeTheme")
        if (localValue == null) {return "dracula"}
        else {return localValue}
    })
    const handleChange = (editor, data, value) => {
        setEditorState(value);
    }
    useEffect(() => {
        window.localStorage.setItem("codeTheme", theme);
    }, [theme])
    const themeArray = ['dracula', 'material', 'mdn-like', 'the-matrix', 'night']
    return (
        <div className="editor-container">
            <div style={{marginBottom: "10px"}}>
                <label htmlFor="theme">Choose a theme: </label>
                <select id="theme" name="theme" defaultValue={theme} onChange={(el) => {
                    setTheme(el.target.value)
                 }}>
                   {
                   themeArray.map( theme => (
                <option value={theme} key={theme}>{theme}</option>
                ))
                 }
                </select>
            </div>
            <ControlledEditorComponent
        onBeforeChange={handleChange}
        value= {value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: theme,
          autoCloseTags: true,
          autoCloseBrackets: true,
        }}
      />
        </div>
    )
}
export default Code
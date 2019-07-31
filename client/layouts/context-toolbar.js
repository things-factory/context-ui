import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'

import '@material/mwc-icon'

import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'

class ContextToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _context: Object,
      _tools: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          position: relative;

          background-color: var(--context-toolbar-background-color);
          justify-content: space-between;
          box-shadow: var(--context-toolbar-shadow-line);
        }
        #front-end {
          padding-left: var(--context-toolbar-side-padding);
        }
        #rear-end {
          padding-right: var(--context-toolbar-side-padding);
        }
        #front-end mwc-icon,
        #front mwc-icon {
          background-color: var(--context-toolbar-function-button-background-color);
          border: var(--context-toolbar-function-button-border);
          height: var(--context-toolbar-function-button-height);
          margin: var(--context-toolbar-button-margin);
          padding: var(--context-toolbar-function-button-padding);
          color: var(--context-toolbar-function-button-color);
          line-height: var(--context-toolbar-function-button-lineheight);
          cursor: pointer;
        }
        #front-end mwc-icon:first-child,
        #front mwc-icon:first-child {
          border-top-left-radius: var(--context-toolbar-function-button-radius);
          border-bottom-left-radius: var(--context-toolbar-function-button-radius);
        }
        #front-end mwc-icon:last-child,
        #front mwc-icon:last-child {
          border-top-right-radius: var(--context-toolbar-function-button-radius);
          border-bottom-right-radius: var(--context-toolbar-function-button-radius);
        }

        #front-end mwc-icon {
          background-color: var(--primary-color);
        }
        #front-end mwc-icon:hover {
          background-color: var(--context-toolbar-function-button-background-color);
        }
        #front mwc-icon:hover {
          background-color: var(--context-toolbar-function-button-hover-background-color);
        }

        #center {
          flex: 1;
          justify-content: center;
          align-items: center;
        }

        #center > * {
          justify-content: center;
          align-items: center;
        }
        #rear-end > *,
        #rear > * {
          margin: var(--context-toolbar-button-margin);
        }
        #rear-end {
          align-items: start;
        }

        div > * {
          align-items: center;
        }

        div {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          overflow: hidden;
          padding: 0;
        }
      `
    ]
  }

  render() {
    let contextKeys = Object.keys(this._context)
    let tools = (this._tools || []).filter(tool => {
      if (!tool.context || contextKeys.includes(tool.context)) return tool
    })

    let frontEndTools = tools.filter(tool => tool.position == TOOL_POSITION.FRONT_END)
    let frontTools = tools.filter(tool => tool.position == TOOL_POSITION.FRONT)
    let centerTools = tools.filter(tool => tool.position == TOOL_POSITION.CENTER)
    let rearTools = tools.filter(tool => tool.position == TOOL_POSITION.REAR)
    let rearEndTools = tools.filter(tool => tool.position == TOOL_POSITION.REAR_END)

    return html`
      <div id="front-end">
        ${frontEndTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </div>

      <div id="front">
        ${frontTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </div>

      <div id="center">
        ${centerTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </div>

      <div id="rear">
        ${rearTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </div>

      <div id="rear-end">
        ${rearEndTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </div>
    `
  }

  stateChanged(state) {
    this._tools = state.context.tools
    this._context = state.route.context
  }
}

customElements.define('context-toolbar', ContextToolbar)

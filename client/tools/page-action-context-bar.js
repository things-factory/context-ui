import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin'

import '@material/mwc-button'

import { store, sleep } from '@things-factory/shell'

class PageActionContextBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _actions: Array
    }
  }

  static get styles() {
    return [
      css`
        :host *:focus {
          outline: none;
        }
        button {
          background-color: var(--context-toolbar-button-background-color);
          text-transform: capitalize;
          cursor: pointer;
          padding: var(--context-toolbar-button-padding);
          height: var(--context-toolbar-button-height);
          border: var(--context-toolbar-border);
          border-radius: var(--border-radius);
          font: var(--context-toolbar-button);
          color: var(--context-toolbar-button-color);
        }
        button:active,
        button:hover {
          color: var(--primary-color);
          border: var(--context-toolbar-border-hover);
        }
        button mwc-icon {
          vertical-align: middle;
          margin-bottom: var(--context-toolbar-iconbutton-margin);
          display: var(--context-toolbar-iconbutton-display);
          font-size: var(--context-toolbar-iconbutton-size);
        }
      `
    ]
  }

  render() {
    return html`
      ${this._actions.map(
        action => html`
          ${action.select && action.select.length > 0
            ? html`
                <select @change=${action.action}>
                  ${action.select.map(
                    option => html`
                      <option>${option}</option>
                    `
                  )}
                </select>
              `
            : html`
                <button
                  @click=${async e => {
                    /* all actions should be bloked for a second */
                    const button = e.currentTarget
                    const icon = button.querySelector('mwc-icon')
                    icon.innerText = 'block'
                    button.disabled = true

                    try {
                      await action.action()
                    } finally {
                      await sleep(1000)
                      button.disabled = false
                      icon.innerText = 'done_all'
                    }
                  }}
                >
                  <mwc-icon>done_all</mwc-icon> ${action.title}
                </button>
              `}
        `
      )}
    `
  }

  stateChanged(state) {
    this._actions = (state.route && state.route.context && state.route.context.actions) || []
  }
}

customElements.define('page-action-context-bar', PageActionContextBar)

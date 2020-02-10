import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin'

import '@material/mwc-button'

import { store } from '@things-factory/shell'
import { sleep } from '@things-factory/utils'

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
          max-width: var(--context-toolbar-button-max-width);
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
          font-size: var(--context-toolbar-iconbutton-size);
        }
        button mwc-icon[working] {
          animation: rotate 1.5s linear infinite;
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `
    ]
  }

  render() {
    return html`
      ${this._actions.map($action => {
        let { type, title, icon, action, select, href } = $action
        return type == 'text'
          ? html`
              <span>${title}</span>
            `
          : type == 'select' || (select && select.length > 0)
          ? html`
              <select @change=${action}>
                ${select.map(
                  option => html`
                    <option>${option}</option>
                  `
                )}
              </select>
            `
          : type == 'link'
          ? html`
              <a href=${href}>${title}</a>
            `
          : html`
              <button
                @click=${async e => {
                  /* all actions should be bloked for a second */
                  const button = e.currentTarget
                  const buttonIcon = button.querySelector('mwc-icon')
                  buttonIcon.innerText = 'rotate_right'
                  buttonIcon.setAttribute('working', true)
                  button.disabled = true

                  try {
                    await action()
                  } finally {
                    await sleep(1000)
                    button.disabled = false
                    buttonIcon.innerText = icon || 'done_all'
                    buttonIcon.removeAttribute('working')
                  }
                }}
              >
                <mwc-icon>${icon || 'done_all'}</mwc-icon> ${title}
              </button>
            `
      })}
    `
  }

  stateChanged(state) {
    this._actions = (state.route && state.route.context && state.route.context.actions) || []
  }
}

customElements.define('page-action-context-bar', PageActionContextBar)

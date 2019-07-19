import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'

export class ContextToolbarOverlay extends connect(store)(LitElement) {
  static get properties() {
    return {
      template: Object
    }
  }

  static get styles() {
    return css`
      :host {
        margin: 0;
        padding: 0;
      }
    `
  }

  render() {
    return html`
      ${this.template}
    `
  }

  stateChanged(state) {
    var viewpart = state.layout.viewparts['context-toolbar-viewpart']

    if (viewpart && viewpart.template) {
      this.template = viewpart.template
    }
  }
}

customElements.define('context-toolbar-overlay', ContextToolbarOverlay)

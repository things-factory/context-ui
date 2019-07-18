import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'

export class ContextToolbarOverlay extends connect(store)(LitElement) {
  static get properties() {
    return {
      show: Boolean,
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
    this.style.display = this.show ? 'block' : 'none'

    return html`
      ${this.template}
    `
  }

  stateChanged(state) {
    var overlay = state.layout.overlays['context-toolbar-overlay']

    this.show = overlay && overlay.show
    if (overlay && overlay.template) {
      this.template = overlay.template
    }
  }
}

customElements.define('context-toolbar-overlay', ContextToolbarOverlay)

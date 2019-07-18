import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'

export class TitleBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      context: Object
    }
  }

  render() {
    return this.context
      ? html`
          <label>${this.context.title}</label>
        `
      : html``
  }

  stateChanged(state) {
    this.context = state.route.context
  }
}

customElements.define('title-bar', TitleBar)

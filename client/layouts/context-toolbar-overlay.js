import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import { HIDE_CONTEXT_OVERLAY } from '@things-factory/context-base'
import '@things-factory/layout-ui' // for floating-overlay element

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

      floating-overlay {
        width: 100%;
      }

      fl-overlay[hidden] {
        display: none;
      }
    `
  }

  render() {
    return html`
      <floating-overlay
        ?hidden=${!this.show}
        backdrop="true"
        direction="up"
        @close-overlay=${this.onCloseOverlay.bind(this)}
        >${this.template}</floating-overlay
      >
    `
  }

  stateChanged(state) {
    var overlay = (state.context && state.context.overlay) || {
      show: false
    }

    this.show = overlay.show
    this.template = overlay.template
  }

  onCloseOverlay() {
    store.dispatch({
      type: HIDE_CONTEXT_OVERLAY
    })
  }
}

customElements.define('context-toolbar-overlay', ContextToolbarOverlay)

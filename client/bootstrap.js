import { html } from 'lit-html'
import { store } from '@things-factory/shell'
import { APPEND_FOOTERBAR, TOOL_POSITION } from '@things-factory/layout-base'

export default function bootstrap() {
  import('./layouts/context-toolbar')
  import('./layouts/context-toolbar-overlay')

  /*
   * footerbar 에 append 하는 순서가 중요하다.
   * footerbar는 아래에서 위로 올라가는 stack 형태의 순서이므로,
   * context-toolbar가 먼저, 그리고 context-toolbar-overlay 가 나중에 올라간다.
   */
  store.dispatch({
    type: APPEND_FOOTERBAR,
    footerbar: {
      position: TOOL_POSITION.REAR_END,
      template: html`
        <context-toolbar></context-toolbar>
      `
    }
  })

  store.dispatch({
    type: APPEND_FOOTERBAR,
    footerbar: {
      position: TOOL_POSITION.REAR_END,
      template: html`
        <context-toolbar-overlay></context-toolbar-overlay>
      `
    }
  })
}
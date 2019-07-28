import { html } from 'lit-html'

import { store } from '@things-factory/shell'
import { appendViewpart, VIEWPART_POSITION, TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'

import './tools/title-bar'
import './layouts/context-toolbar'

export default function bootstrap() {
  /* add title app-tool */
  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <title-bar></title-bar>
      `,
      position: TOOL_POSITION.CENTER
    }
  })

  /*
   * footerbar 에 append 하는 순서가 중요하다.
   * footerbar는 아래에서 위로 올라가는 stack 형태의 순서이므로,
   * context-toolbar가 먼저, 그리고 context-toolbar-overlay 가 나중에 올라간다.
   */
  appendViewpart({
    name: 'context-toolbar',
    viewpart: {
      show: true,
      template: html`
        <context-toolbar></context-toolbar>
      `
    },
    position: VIEWPART_POSITION.FOOTERBAR
  })

  appendViewpart({
    name: 'context-toolbar-overlay',
    viewpart: {
      show: false,
      hovering: 'next',
      backdrop: true,
      template: html``
    },
    position: VIEWPART_POSITION.FOOTERBAR
  })
}

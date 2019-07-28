import { css } from 'lit-element'

export const ContextToolbarOverlayStyle = css`
  :host {
    display: block;

    background-color: var(--context-ui-background-color);
    box-shadow: var(--context-ui-box-shadow);
    padding: var(--context-ui-padding);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
  }

  li {
    display: flex;

    border-bottom: var(--context-ui-list-border-bottom);
    padding: var(--context-ui-list-padding);
  }

  li > mwc-icon {
    font-size: 1em;

    padding: var(--context-ui-padding);
    color: var(--context-ui-list-color);
  }

  li > span {
    margin: auto 0;
    flex: 1;

    color: var(--context-ui-list-color);
  }

  li:hover mwc-icon,
  li:hover span {
    color: #fff;
  }

  li:hover {
    cursor: pointer;

    border-bottom: var(--context-ui-list-border-hover-bottom);
  }

  @media (max-width: 460px) {
    :host {
      min-width: 100%;
      box-shadow: none;
      border-radius: 0;
    }
  }
`

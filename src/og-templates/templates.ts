import { html } from 'satori-html';

export const templates: Record<string, (data?: Record<string, any>) => any> = {
  default: () => html`<div tw="flex items-center justify-between p-24">
    <h1>Lazar Nikolov</h1>
    <p>Software Engineer, Content Creator</p>
  </div>`,
};

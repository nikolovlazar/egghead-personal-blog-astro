import { Resvg } from '@resvg/resvg-js';
import type { APIContext } from 'astro';
import satori from 'satori';
import fs from 'fs/promises';
import path from 'path';

import { templates } from '../../og-templates/templates';

export const prerender = false;

export async function GET(context: APIContext) {
  const { template } = context.params;

  if (!template) {
    return new Response('Must provide a template', { status: 400 });
  }

  const templateFn = templates[template];

  if (!templateFn) {
    return new Response('Template not found', { status: 404 });
  }

  const { searchParams } = new URL(context.request.url);
  const data = Object.fromEntries(searchParams.entries());

  const svg = await satori(templateFn(data), {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: await fs.readFile(
          path.join(process.cwd(), 'src/og-templates/Inter-Regular.ttf')
        ),
        style: 'normal',
      },
    ],
  });

  const resvgInstance = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const image = await resvgInstance.render();

  return new Response(image.asPng());
}

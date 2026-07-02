import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { formatDate } from './utils';

function loadInter(file: string): Buffer {
  return fs.readFileSync(path.join(process.cwd(), 'src/assets/fonts', file));
}

const fonts = [
  { name: 'Inter', data: loadInter('Inter-Regular.ttf'), weight: 400 as const },
  { name: 'Inter', data: loadInter('Inter-Bold.ttf'), weight: 700 as const },
];

const colors = {
  bg: '#1a1f2e',
  border: '#2e3447',
  text: '#e8eaf0',
  muted: '#8b909e',
  accent: '#e8a020',
  tagBg: '#2e3447',
};

interface PostOgImageInput {
  title: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  locale: string;
}

export async function renderPostOgImage(input: PostOgImageInput): Promise<Uint8Array<ArrayBuffer>> {
  const dateLocale = input.locale === 'en' ? 'en-US' : 'pl-PL';

  const element = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 64px',
        backgroundColor: colors.bg,
        borderBottom: `12px solid ${colors.accent}`,
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '14px' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          backgroundColor: colors.accent,
                        },
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: { fontSize: '34px', fontWeight: 700, color: colors.text },
                        children: 'blogeusz',
                      },
                    },
                  ],
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '24px',
                    fontWeight: 700,
                    color: colors.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                  },
                  children: input.category,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: '58px',
              fontWeight: 700,
              lineHeight: 1.25,
              color: colors.text,
              lineClamp: 4,
            },
            children: input.title,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: '12px' },
                  children: input.tags.slice(0, 4).map((tag) => ({
                    type: 'span',
                    props: {
                      style: {
                        fontSize: '22px',
                        color: colors.text,
                        backgroundColor: colors.tagBg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '6px',
                        padding: '8px 18px',
                      },
                      children: tag,
                    },
                  })),
                },
              },
              {
                type: 'span',
                props: {
                  style: { fontSize: '24px', color: colors.muted },
                  children: formatDate(input.publishedAt, dateLocale),
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element, { width: 1200, height: 630, fonts });
  return new Uint8Array(new Resvg(svg).render().asPng());
}

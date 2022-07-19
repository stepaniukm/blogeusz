import rss from '@astrojs/rss';

export const get = () =>
	rss({
		title: 'Blogeusz',
		description: 'Simple personal blog',
		site: import.meta.env.SITE,
		items: import.meta.glob('./**/*.md'),
		customData: `<language>en-us</language>`,
	});

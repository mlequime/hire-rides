import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { reputationBlock } from '../misc/reputation'
import { alignItems, textAlign } from '../fragments'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'hero',
	title: 'Hero',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'asset' },
		{ name: 'options' },
	],
	fieldsets: [
		{ name: 'layout', options: { columns: 2 } },
		{ name: 'alignment', options: { columns: 2 } },
		{ name: 'image', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: [
					{ title: 'Full', value: 'full' },
					{ title: 'Split', value: 'split' },
				],
				layout: 'radio',
			},
			initialValue: 'full',
			fieldset: 'layout',
			group: 'options',
		}),
		defineField({
			name: 'colorScheme',
			title: 'Colour scheme',
			type: 'string',
			options: {
				list: [
					{ title: 'Dark', value: 'dark' },
					{ title: 'Light', value: 'light' },
				],
				layout: 'radio',
			},
			initialValue: 'dark',
			fieldset: 'layout',
			group: 'options',
		}),
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'custom-html' }, reputationBlock],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'assets',
			title: 'Assets',
			type: 'array',
			of: [{ type: 'img' }],
			validation: (Rule) => Rule.max(1),
			group: 'asset',
		}),
		defineField({
			...(alignItems as any),
			fieldset: 'alignment',
			group: 'options',
		}),
		defineField({
			...(textAlign as any),
			fieldset: 'alignment',
			group: 'options',
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'assets.0.image',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero',
			media,
		}),
	},
})

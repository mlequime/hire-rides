import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutGrid3 } from 'react-icons/tfi'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'ride-list',
	title: 'Ride list',
	icon: TfiLayoutGrid3,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'note',
			title: 'Note',
			description: 'Small text shown to the right of the heading',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'rides',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'ride',
					fields: [
						defineField({
							name: 'emoji',
							type: 'string',
							description: 'A single emoji character',
						}),
						defineField({ name: 'category', type: 'string' }),
						defineField({ name: 'title', type: 'string' }),
						defineField({ name: 'description', type: 'string' }),
						defineField({
							name: 'cta',
							title: 'Link',
							type: 'cta',
						}),
						defineField({
							name: 'variant',
							type: 'string',
							options: {
								list: [
									{ title: 'Standard', value: 'standard' },
									{ title: 'Tall (double height)', value: 'tall' },
									{ title: 'Wide (double width)', value: 'wide' },
								],
								layout: 'radio',
							},
							initialValue: 'standard',
						}),
					],
					preview: {
						select: { title: 'title', emoji: 'emoji', category: 'category' },
						prepare: ({ title, emoji, category }) => ({
							title: [emoji, title].filter(Boolean).join(' '),
							subtitle: category,
						}),
					},
				}),
			],
			group: 'content',
		}),
	],
	preview: {
		select: { intro: 'intro', rides: 'rides' },
		prepare: ({ intro, rides }) => ({
			title: getBlockText(intro) || `${rides?.length ?? 0} rides`,
			subtitle: 'Ride list',
		}),
	},
})

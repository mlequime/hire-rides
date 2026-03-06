import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscSymbolString } from 'react-icons/vsc'

export default defineType({
	name: 'ticker',
	title: 'Ticker',
	icon: VscSymbolString,
	type: 'object',
	fields: [
		defineField({
			name: 'items',
			title: 'Items',
			description: 'Text items that scroll across the ticker bar',
			type: 'array',
			of: [defineArrayMember({ type: 'string' })],
		}),
	],
	preview: {
		select: { items: 'items' },
		prepare: ({ items }) => ({
			title: items?.join(' · ') || 'Ticker',
			subtitle: 'Ticker',
		}),
	},
})

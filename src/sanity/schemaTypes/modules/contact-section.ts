import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiEmail } from 'react-icons/tfi'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'contact-section',
	title: 'Contact section',
	icon: TfiEmail,
	type: 'object',
	groups: [
		{ name: 'left', title: 'Left column', default: true },
		{ name: 'right', title: 'Right column' },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
		// Left column
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'left',
		}),
		defineField({
			name: 'heading',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'left',
		}),
		defineField({
			name: 'body',
			title: 'Body text',
			type: 'string',
			group: 'left',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'left',
		}),
		// Right column
		defineField({
			name: 'contactPretitle',
			title: 'Contact pretitle',
			type: 'string',
			group: 'right',
		}),
		defineField({
			name: 'contactHeading',
			title: 'Contact heading',
			type: 'string',
			group: 'right',
		}),
		defineField({
			name: 'contactRows',
			title: 'Contact rows',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'type',
							title: 'Label',
							type: 'string',
							description: 'e.g. "Call Direct · 24/7"',
						}),
						defineField({
							name: 'value',
							title: 'Value',
							type: 'string',
							description: 'e.g. "07940 536 535"',
						}),
						defineField({
							name: 'href',
							title: 'Link (href)',
							type: 'string',
							description: 'e.g. "tel:07940536535" or "mailto:..."',
						}),
					],
					preview: {
						select: { type: 'type', value: 'value' },
						prepare: ({ type, value }) => ({ title: value, subtitle: type }),
					},
				}),
			],
			group: 'right',
		}),
		defineField({
			name: 'reassurance',
			title: 'Reassurance text',
			type: 'string',
			description: 'Small italic note shown below the contact rows',
			group: 'right',
		}),
	],
	preview: {
		select: { heading: 'heading' },
		prepare: ({ heading }) => ({
			title: getBlockText(heading) || 'Contact section',
			subtitle: 'Contact section',
		}),
	},
})

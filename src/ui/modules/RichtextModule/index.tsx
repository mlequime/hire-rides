import moduleProps from '@/lib/moduleProps'
import TableOfContents from './TableOfContents'
import Content from './Content'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default function RichtextModule({
	pretitle,
	content,
	tableOfContents,
	tocPosition = 'right',
	stretch,
	headings,
	...props
}: Partial<{
	pretitle: string
	content: any
	tableOfContents: boolean
	tocPosition: 'left' | 'right'
	stretch: boolean
	headings: {
		style: string
		text: string
	}[]
}> &
	Sanity.Module) {
	const tocRight = stegaClean(tocPosition) === 'right'

	return (
		<section
			className={cn(
				'section grid gap-8',
				tableOfContents &&
					(tocRight ? 'lg:grid-cols-[1fr_auto]' : 'lg:grid-cols-[auto_1fr]'),
			)}
			{...moduleProps(props)}
		>
			{pretitle && <Pretitle className="col-span-full">{pretitle}</Pretitle>}

			{tableOfContents && (
				<aside
					className={cn(
						'lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:w-3xs',
						tocRight && 'lg:order-last',
					)}
				>
					<TableOfContents headings={headings} />
				</aside>
			)}

			<Content
				value={content}
				className={cn(
					!tableOfContents && (stretch ? 'max-w-screen-lg' : 'max-w-screen-md'),
				)}
			/>
		</section>
	)
}

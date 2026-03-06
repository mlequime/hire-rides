import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import Icon from '@/ui/Icon'
import { cn } from '@/lib/utils'

export default function FlagList({
	pretitle,
	intro,
	items,
}: Partial<{
	pretitle: string
	intro: any
	items: {
		icon: Sanity.Icon
		content: any
	}[]
}>) {
	return (
		<section className="section-pad bg-canvas-warm">
			{(pretitle || intro) && (
				<header className="richtext mb-16 max-w-xl text-balance">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div className="border-border bg-border grid grid-cols-2 gap-px border sm:grid-cols-4">
				{items?.map(({ icon, content }, key) => (
					<article
						key={key}
						className="group bg-canvas-warm hover:bg-canvas-white relative flex flex-col gap-3 overflow-hidden px-7 py-9 transition-colors"
					>
						{/* Left accent bar — scales up from bottom on hover */}
						<span className="bg-accent absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />

						{icon && (
							<span className="text-2xl leading-none">
								<Icon icon={icon} />
							</span>
						)}

						<PortableText
							value={content}
							components={{
								block: {
									h3: ({ children }) => (
										<h3 className="font-display text-ink text-lg leading-tight font-semibold">
											{children}
										</h3>
									),
									h4: ({ children }) => (
										<h4 className="font-display text-ink text-lg leading-tight font-semibold">
											{children}
										</h4>
									),
									normal: ({ children }) => (
										<p
											className={cn(
												'text-ink/70 text-sm leading-relaxed font-light',
											)}
										>
											{children}
										</p>
									),
								},
							}}
						/>
					</article>
				))}
			</div>
		</section>
	)
}

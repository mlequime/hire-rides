import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'

export default function StepList({
	pretitle,
	intro,
	steps,
}: Partial<{
	pretitle: string
	intro: any
	steps: {
		title: string
		content: any
	}[]
}>) {
	return (
		<section className="section-pad border-border-light bg-canvas-white border-y">
			{(pretitle || intro) && (
				<header className="richtext max-w-xl text-balance">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<ol className="border-border mt-16 grid grid-cols-4 border-t max-lg:grid-cols-2">
				{steps?.map((step, index) => (
					<li
						key={index}
						className="group border-border-light relative overflow-hidden border-r pt-12 pr-8 pb-10 last:border-r-0 max-lg:even:border-r-0 [&:not(:first-child)]:pl-8"
					>
						{/* Accent line — expands to full width on hover */}
						<div className="accent-line group-hover:[transform:scaleX(1)]" />

						{/* Large italic index */}
						<span className="font-display text-ink/5 group-hover:text-accent/5 mb-5 block text-[5rem] leading-none font-light italic transition-colors">
							{String(index + 1).padStart(2, '0')}
						</span>

						{step.title && (
							<h3 className="font-display text-ink mb-3 text-xl font-semibold">
								{step.title}
							</h3>
						)}

						<div className="richtext text-ink/70 text-sm">
							<PortableText value={step.content} />
						</div>
					</li>
				))}
			</ol>
		</section>
	)
}

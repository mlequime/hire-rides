import moduleProps from '@/lib/moduleProps'
import CTAList from '@/ui/CTAList'
import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'

type ContactRow = {
	type?: string
	value?: string
	href?: string
}

export default function ContactSection({
	pretitle,
	heading,
	body,
	ctas,
	contactPretitle,
	contactHeading,
	contactRows,
	reassurance,
	...props
}: Partial<{
	pretitle: string
	heading: any
	body: string
	ctas: Sanity.CTA[]
	contactPretitle: string
	contactHeading: string
	contactRows: ContactRow[]
	reassurance: string
}> &
	Sanity.Module) {
	return (
		<section className="split max-lg:grid-cols-1" {...moduleProps(props)}>
			{/* Left — dark pane */}
			<div className="dot-pattern bg-ink section-pad relative flex flex-col justify-center overflow-hidden">
				<div className="relative">
					{pretitle && (
						<p className="eyebrow-dark mb-6">{stegaClean(pretitle)}</p>
					)}

					{heading && (
						<PortableText
							value={heading}
							components={{
								block: {
									h2: ({ children }) => (
										<h2 className="display-lg text-canvas [&_em]:text-canvas/45 [&_em]:font-light [&_em]:italic">
											{children}
										</h2>
									),
									normal: ({ children }) => (
										<p className="text-canvas/50 mt-6 max-w-[400px] text-base leading-[1.85] font-light">
											{children}
										</p>
									),
								},
								marks: {
									em: ({ children }) => (
										<em className="text-canvas/45 font-light italic">
											{children}
										</em>
									),
								},
							}}
						/>
					)}

					{body && (
						<p className="text-canvas/50 mt-6 max-w-[400px] text-base leading-[1.85] font-light">
							{body}
						</p>
					)}

					<CTAList ctas={ctas} className="mt-10" />
				</div>
			</div>

			{/* Right — white pane */}
			<div className="border-border bg-canvas-white section-pad flex flex-col justify-center border-l max-lg:border-t max-lg:border-l-0">
				{contactPretitle && (
					<p className="eyebrow mb-6">{stegaClean(contactPretitle)}</p>
				)}

				{contactHeading && (
					<p className="font-display text-ink mb-4 text-2xl leading-tight font-semibold">
						{contactHeading}
					</p>
				)}

				{!!contactRows?.length && (
					<div className="border-border flex flex-col border-t">
						{contactRows.map(({ type, value, href }, i) => (
							<a
								key={i}
								href={stegaClean(href) ?? '#'}
								className={cn(
									'group border-border-light flex items-center justify-between gap-4 border-b py-6 no-underline transition-all hover:pl-2',
								)}
							>
								<div className="flex flex-col gap-1">
									{type && (
										<span className="technical text-ink/40">
											{stegaClean(type)}
										</span>
									)}
									{value && (
										<span className="font-display text-ink text-xl leading-tight font-semibold">
											{stegaClean(value)}
										</span>
									)}
								</div>
								<span className="text-accent shrink-0 text-xl transition-transform group-hover:translate-x-1">
									→
								</span>
							</a>
						))}
					</div>
				)}

				{reassurance && (
					<p className="text-ink/40 mt-8 text-xs leading-[1.7] font-light italic">
						{reassurance}
					</p>
				)}
			</div>
		</section>
	)
}

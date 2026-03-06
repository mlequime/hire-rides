import Pretitle from '@/ui/Pretitle'
import CTA from '@/ui/CTA'
import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'

type Ride = {
	emoji?: string
	category?: string
	title?: string
	description?: string
	cta?: Sanity.CTA
	variant?: 'standard' | 'tall' | 'wide'
}

export default function RideList({
	pretitle,
	intro,
	note,
	rides,
}: Partial<{
	pretitle: string
	intro: any
	note: string
	rides: Ride[]
}>) {
	return (
		<section className="section-pad bg-canvas">
			{/* Header */}
			<div className="mb-16 grid grid-cols-2 items-end gap-16 max-lg:grid-cols-1 max-lg:gap-6">
				<div>
					<Pretitle>{pretitle}</Pretitle>
					{intro && (
						<div className="richtext mt-2">
							<PortableText value={intro} />
						</div>
					)}
				</div>
				{note && (
					<p className="border-border-light text-ink/40 max-w-[360px] justify-self-end border-t pt-3 text-sm leading-[1.75] font-light max-lg:max-w-none max-lg:justify-self-start">
						{note}
					</p>
				)}
			</div>

			{/* Rides grid */}
			<div className="border-border-light bg-border-light grid grid-cols-3 gap-px border max-lg:grid-cols-2 max-sm:grid-cols-1">
				{rides?.map((ride, i) => (
					<article
						key={i}
						className={cn(
							'group card-ride relative',
							ride.variant === 'tall' && 'row-span-2',
							ride.variant === 'wide' && 'col-span-2 max-sm:col-span-1',
						)}
					>
						{/* Accent line top — expands on hover */}
						<div className="accent-line group-hover:[transform:scaleX(1)]" />

						<div
							className={cn(
								'flex h-full min-h-[210px] flex-col justify-between p-9',
								ride.variant === 'tall' && 'min-h-[420px]',
								ride.variant === 'wide' && 'min-h-[185px]',
							)}
						>
							{/* Top row: emoji + index */}
							<div className="flex items-start justify-between">
								{ride.emoji && (
									<span className="text-4xl leading-none transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
										{ride.emoji}
									</span>
								)}
								<span className="font-display text-ink/10 text-sm font-light italic">
									{String(i + 1).padStart(2, '0')}
								</span>
							</div>

							{/* Bottom: category, title, desc, cta */}
							<div>
								{ride.category && (
									<p className="technical text-accent/80 mb-1.5">
										{ride.category}
									</p>
								)}
								{ride.title && (
									<h3
										className={cn(
											'font-display text-ink leading-tight font-semibold tracking-tight',
											ride.variant === 'tall' ? 'text-3xl' : 'text-xl',
										)}
									>
										{ride.title}
									</h3>
								)}
								{ride.description && (
									<p className="text-ink/70 mt-2 text-sm leading-relaxed font-light">
										{ride.description}
									</p>
								)}
								{ride.cta && (
									<div className="mt-4 translate-y-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
										<CTA className="link-arrow" {...ride.cta}>
											<span>{ride.cta.link?.label ?? 'Enquire'}</span>
											<span className="arrow">→</span>
										</CTA>
									</div>
								)}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	)
}

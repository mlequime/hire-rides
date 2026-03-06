import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import Asset from './Asset'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	assets,
	assetOnRight,
	assetBelowContent,
	trustStats,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Array<Sanity.Img | Sanity.Code | Sanity.CustomHTML>
	assetOnRight: boolean
	assetBelowContent: boolean
	trustStats: { value: string; label: string }[]
}>) {
	const asset = assets?.[0]

	return (
		<section className="section">
			<div className="grid items-center gap-8 md:grid-cols-2 md:gap-x-12">
				<figure
					className={cn(
						asset?._type === 'img' && 'max-md:full-bleed',
						assetOnRight && 'md:order-1',
						assetBelowContent && 'max-md:order-last',
					)}
				>
					<Asset asset={asset} />
				</figure>

				<div className="richtext headings:text-balance mx-auto w-full max-w-lg">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText
						value={content}
						components={{
							block: {
								h1: ({ children }) => (
									<h1 className="display-xl">{children}</h1>
								),
								h2: ({ children }) => (
									<h2 className="display-lg">{children}</h2>
								),
							},
							marks: {
								em: ({ children }) => (
									<em className="display-em">{children}</em>
								),
								strong: ({ children }) => (
									<strong className="font-medium">{children}</strong>
								),
							},
							types: {
								'custom-html': ({ value }) => <CustomHTML {...value} />,
								'reputation-block': ({ value }) => (
									<Reputation className="!mt-4" reputation={value.reputation} />
								),
							},
						}}
					/>
					<CTAList ctas={ctas} className="!mt-6" />
				</div>
			</div>
			{!!trustStats?.length && (
				<div
					className={cn(
						'border-border-light mt-4 flex flex-wrap items-center justify-center gap-8 border-t pt-8',
					)}
				>
					{trustStats.map(({ value, label }, i) => (
						<div
							key={i}
							className="font-accent text-accent flex flex-col items-center gap-3"
						>
							<span
								className={cn(
									'font-display text-accent text-3xl leading-none font-semibold tracking-tight',
								)}
							>
								{value}
							</span>
							<span className={cn('technical text-ink/50')}>{label}</span>
						</div>
					))}
				</div>
			)}
		</section>
	)
}

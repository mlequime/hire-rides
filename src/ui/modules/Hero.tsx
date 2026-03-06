import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'

export default function Hero({
	pretitle,
	content,
	ctas,
	assets,
	layout: l,
	colorScheme: cs,
	textAlign: ta = 'center',
	alignItems: ai,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Sanity.Img[]
	layout: 'full' | 'split'
	colorScheme: 'light' | 'dark'
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}> &
	Sanity.Module) {
	const hasImage = !!assets?.[0]
	const asset = assets?.[0]
	const layout = stegaClean(l) ?? 'full'
	const isDark = stegaClean(cs) !== 'light'
	const textAlign = stegaClean(ta)
	const alignItems = stegaClean(ai)

	// ── Split layout ──────────────────────────────────────────────────────────
	if (layout === 'split') {
		return (
			<section
				className={cn(
					'section relative overflow-hidden',
					!hasImage && isDark && 'bg-ink text-canvas',
				)}
				{...moduleProps(props)}
			>
				{hasImage && (
					<ResponsiveImg
						img={asset}
						className="absolute inset-0 size-full object-cover object-center"
						width={2400}
						draggable={false}
					/>
				)}

				{/* Gradient scrim — left-to-transparent so content reads clearly */}
				{hasImage && (
					<div
						className="pointer-events-none absolute inset-0 z-[1]"
						style={{
							background: isDark
								? 'linear-gradient(to right, #1a1208 25%, rgba(26,18,8,0.85) 45%, rgba(26,18,8,0) 70%)'
								: 'linear-gradient(to right, #f8f5ef 25%, rgba(248,245,239,0.9) 45%, rgba(248,245,239,0) 70%)',
						}}
					/>
				)}

				{/* Content — constrained to left ~52% */}
				<div
					className={cn(
						'relative z-10 flex max-w-[56%] flex-col justify-center px-18 py-24 max-lg:max-w-full max-lg:px-10 max-lg:py-24',
						isDark ? 'text-canvas' : 'text-ink',
					)}
				>
					{pretitle && (
						<p
							className={cn(
								'eyebrow mb-10',
								isDark ? 'text-gold/75 [&::before]:bg-gold/70' : '',
							)}
						>
							{stegaClean(pretitle)}
						</p>
					)}

					{content && (
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
									normal: ({ children }) => (
										<p
											className={cn(
												'mt-6 max-w-[420px] text-base leading-[1.85] font-light',
												isDark ? 'text-canvas/70' : 'text-ink/70',
											)}
										>
											{children}
										</p>
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
										<Reputation
											className="!mt-4"
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>
					)}

					<CTAList ctas={ctas} className="mt-12" />
				</div>
			</section>
		)
	}

	// ── Full layout (default) ─────────────────────────────────────────────────
	return (
		<section
			className={cn(
				hasImage && isDark
					? 'bg-ink text-canvas grid overflow-hidden *:col-span-full *:row-span-full'
					: hasImage
						? 'grid overflow-hidden *:col-span-full *:row-span-full'
						: isDark
							? 'bg-ink text-canvas'
							: '',
			)}
			{...moduleProps(props)}
		>
			{hasImage && (
				<ResponsiveImg
					img={asset}
					className="max-h-fold size-full object-cover"
					width={2400}
					draggable={false}
				/>
			)}

			{content && (
				<div className="section flex w-full flex-col text-balance">
					<div
						className={cn(
							'richtext headings:text-balance relative isolate max-w-xl',
							hasImage && isDark && 'text-shadow',
							{
								'mb-8': alignItems === 'start',
								'my-auto': alignItems === 'center',
								'mt-auto': alignItems === 'end',
								'me-auto': ['left', 'start'].includes(textAlign),
								'mx-auto': textAlign === 'center',
								'ms-auto': ['right', 'end'].includes(textAlign),
							},
						)}
						style={{ textAlign }}
					>
						<Pretitle className={cn(hasImage && isDark && 'text-canvas/70')}>
							{pretitle}
						</Pretitle>

						<PortableText
							value={content}
							components={{
								types: {
									'custom-html': ({ value }) => <CustomHTML {...value} />,
									'reputation-block': ({ value }) => (
										<Reputation
											className={cn(
												'!mt-4',
												hasImage && isDark && '[&_strong]:text-amber-400',
												{
													'justify-start': ['left', 'start'].includes(
														textAlign,
													),
													'justify-center': textAlign === 'center',
													'justify-end': ['right', 'end'].includes(textAlign),
												},
											)}
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>

						<CTAList
							ctas={ctas}
							className={cn('!mt-4', {
								'justify-start': textAlign === 'left',
								'justify-center': textAlign === 'center',
								'justify-end': textAlign === 'right',
							})}
						/>
					</div>
				</div>
			)}
		</section>
	)
}

export default function Ticker({
	items,
}: Partial<{
	items: string[]
}> &
	Sanity.Module) {
	if (!items?.length) return null

	// Duplicate items for seamless infinite loop
	const track = [...items, ...items]

	return (
		<div
			className="bg-ink flex h-11 items-center overflow-hidden"
			aria-hidden="true"
		>
			<div className="anim-marquee flex whitespace-nowrap">
				{track.map((item, i) => (
					<span key={i} className="flex items-center gap-5 px-10">
						<span className="technical text-canvas/45">{item}</span>
						<span className="bg-accent inline-block size-1 shrink-0 rotate-45" />
					</span>
				))}
			</div>
		</div>
	)
}

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
			<div className="anim-marquee flex w-max shrink-0 whitespace-nowrap">
				{track.map((item, i) => (
					<span key={i} className="flex items-center pl-10">
						<span className="technical text-canvas/45">{item}</span>
						<span className="bg-accent ml-10 inline-block size-1 shrink-0 rotate-45" />
					</span>
				))}
			</div>
		</div>
	)
}

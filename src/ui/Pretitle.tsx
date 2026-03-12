import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default function Pretitle({
	className,
	children,
}: React.ComponentProps<'p'>) {
	if (!children) return null

	return (
		<p className={cn('eyebrow technical text-accent mb-8', className)}>
			{stegaClean(children)}
		</p>
	)
}

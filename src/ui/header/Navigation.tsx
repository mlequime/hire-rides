import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import { cn } from '@/lib/utils'

export default async function Menu() {
	const { headerMenu } = await getSite()

	const parentClassName = cn('lg:px-3 lg:text-center lg:leading-tight')

	return (
		<nav
			className="max-lg:anim-fade-to-r max-lg:header-closed:hidden flex gap-y-2 [grid-area:nav] max-lg:my-4 max-lg:flex-col lg:justify-center"
			role="navigation"
		>
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className={cn(
									parentClassName,
									'hover:link text-accent font-medium tracking-widest uppercase lg:grid lg:place-content-center',
								)}
								link={item}
								key={key}
							/>
						)

					case 'link.list':
						return (
							<LinkList
								summaryClassName={parentClassName}
								{...item}
								key={key}
							/>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}

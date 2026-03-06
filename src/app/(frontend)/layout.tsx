// import { GoogleTagManager } from '@next/third-parties/google'
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/app.css'
import { Playfair_Display, DM_Sans } from 'next/font/google'

const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-display',
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	style: 'italic',
})

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-body',
	weight: ['200', '300', '400', '500'],
})

export const metadata = {
	title: 'Hire Fairground Rides',
	description:
		'Discover and hire unique fairground rides for your events. From vintage carousels to thrilling roller coasters, find the perfect attraction to make your occasion unforgettable.',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Root>
			{/* <GoogleTagManager gtmId="" /> */}
			<body
				className={`bg-canvas text-ink antialiased ${playfair.variable} ${dmSans.variable}`}
			>
				<NuqsAdapter>
					<SkipToContent />
					<Announcement />
					<Header />
					<main id="main-content" role="main" tabIndex={-1}>
						{children}
					</main>
					<Footer />

					<VisualEditingControls />
				</NuqsAdapter>

				<Analytics />
				<SpeedInsights />
			</body>
		</Root>
	)
}

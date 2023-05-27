import getWikiResult from '@/lib/getWikiResult'
import Item from './components/Item'

type Props = {
	params: {
		searchTerm: string
	}
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
	const wikiData: Promise<SearchResult> = getWikiResult(searchTerm)
	const data = await wikiData
	const displayTerm = searchTerm.replaceAll('%20', ' ')

	if (!data?.query?.pages) return { title: `${displayTerm} Not Found` }

	return {
		title: displayTerm,
		description: `Search results for ${displayTerm}`,
	}
}

export default async function SearchTerm({ params: { searchTerm } }: Props) {
	const wikiData: Promise<SearchResult> = getWikiResult(searchTerm)
	const data = await wikiData
	const results: Result[] | undefined = data?.query?.pages

	return (
		<main>
			{results ? (
				Object.values(results).map((result) => (
					<Item key={result.pageid} result={result} />
				))
			) : (
				<h2 className='p-2 text-xl'>{`${searchTerm} Not Found`}</h2>
			)}
		</main>
	)
}

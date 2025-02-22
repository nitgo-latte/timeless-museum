import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import { getArtworkById } from '../../library/hooks'
import prisma from '../../library/prisma'
import { useSession } from 'next-auth/react'

const ArtPiece = () => {
  const router = useRouter()
  const {
    query: { id },
    asPath,
  } = router
  const session = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push(`/api/auth/signin?callbackUrl=${asPath}`)
    },
  })
  const { data } = useQuery({ queryKey: ['artwork', id], queryFn: () => getArtworkById(id as string) })
  const artwork = data?.getArtworkById

  if (!artwork || !session.data?.user) return undefined

  return (
    <Layout>
      <div className="container mx-auto px-56 py-8">
        <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
        <Image
          priority
          height={490}
          width={800}
          className="w-full mb-4"
          src={artwork.imageUrls[0]}
          alt={artwork.description ?? 'alt'}
        />
        <p className="text-gray-800 text-base">{artwork.description}</p>
      </div>
    </Layout>
  )
}

export default ArtPiece

export const getStaticPaths: GetStaticPaths = async () => {
  const artworks = await prisma.artwork.findMany({
    where: {
      imageUrls: {
        isEmpty: false,
      },
    },
  })
  const paths = artworks.map(aw => ({
    params: {
      id: String(aw.id),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['artwork', params?.id],
    queryFn: () => getArtworkById(params?.id as string),
    staleTime: 60 * 1000 * 15, // activate gc every 15mins
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

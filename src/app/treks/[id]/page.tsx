import Layout from '../../../../components/Layout'

interface TrekDetailPageProps {
  params: {
    id: string
  }
}

export default function TrekDetailPage({ params }: TrekDetailPageProps) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Trek Details</h1>
        <p>Trek ID: {params.id}</p>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Trek Information</h2>
          <p>Detailed trek information will go here...</p>
        </div>
      </div>
    </Layout>
  )
}
import Layout from '../../../components/Layout'

export default function TreksPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Our Trek Adventures</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Buran Ghati Trek</h3>
            <p className="text-gray-600">Himachal Pradesh</p>
            <p className="text-2xl font-bold text-green-600 mt-4">Rps. 17,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Kedarkantha Trek</h3>
            <p className="text-gray-600">Uttarakhand</p>
            <p className="text-2xl font-bold text-green-600 mt-4">Rps. 7500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Kashmir Great Lakes Trek</h3>
            <p className="text-gray-600">Kashmir</p>
            <p className="text-2xl font-bold text-green-600 mt-4">Rps. 17500</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
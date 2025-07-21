import Layout from '../../../components/Layout'

export default function CartPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <p className="text-gray-600">Your cart is currently empty.</p>
      </div>
    </Layout>
  )
}
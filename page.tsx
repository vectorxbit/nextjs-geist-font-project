'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  minStock: number
  supplier: string
  description: string
  barcode: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Beras Premium',
      category: 'Sembako',
      price: 15000,
      stock: 45,
      minStock: 10,
      supplier: 'CV Beras Sejahtera',
      description: 'Beras premium kualitas terbaik, pulen dan wangi',
      barcode: '8991002123456'
    },
    {
      id: 2,
      name: 'Minyak Goreng',
      category: 'Sembako',
      price: 25000,
      stock: 8,
      minStock: 15,
      supplier: 'PT Minyak Nusantara',
      description: 'Minyak goreng berkualitas untuk memasak sehari-hari',
      barcode: '8991002123457'
    },
    {
      id: 3,
      name: 'Gula Pasir',
      category: 'Sembako',
      price: 12000,
      stock: 30,
      minStock: 10,
      supplier: 'Pabrik Gula Manis',
      description: 'Gula pasir putih bersih untuk kebutuhan dapur',
      barcode: '8991002123458'
    },
    {
      id: 4,
      name: 'Telur Ayam',
      category: 'Protein',
      price: 28000,
      stock: 25,
      minStock: 20,
      supplier: 'Peternakan Ayam Jaya',
      description: 'Telur ayam segar langsung dari peternakan',
      barcode: '8991002123459'
    },
    {
      id: 5,
      name: 'Susu UHT',
      category: 'Minuman',
      price: 8000,
      stock: 50,
      minStock: 15,
      supplier: 'PT Susu Sehat',
      description: 'Susu UHT full cream kaya nutrisi',
      barcode: '8991002123460'
    },
    {
      id: 6,
      name: 'Roti Tawar',
      category: 'Makanan',
      price: 15000,
      stock: 12,
      minStock: 10,
      supplier: 'Toko Roti Sari',
      description: 'Roti tawar lembut untuk sarapan keluarga',
      barcode: '8991002123461'
    },
    {
      id: 7,
      name: 'Sabun Mandi',
      category: 'Kebersihan',
      price: 5000,
      stock: 35,
      minStock: 10,
      supplier: 'PT Kebersihan Indonesia',
      description: 'Sabun mandi dengan formula lembut untuk kulit',
      barcode: '8991002123462'
    },
    {
      id: 8,
      name: 'Pasta Gigi',
      category: 'Kebersihan',
      price: 12000,
      stock: 20,
      minStock: 8,
      supplier: 'PT Oral Care',
      description: 'Pasta gigi dengan fluoride untuk kesehatan gigi',
      barcode: '8991002123463'
    }
  ])

  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Sembako',
    price: 0,
    stock: 0,
    minStock: 0,
    supplier: '',
    description: '',
    barcode: ''
  })

  const categories = ['Semua', 'Sembako', 'Protein', 'Minuman', 'Makanan', 'Kebersihan']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.supplier || newProduct.price <= 0) {
      alert('Mohon lengkapi semua data produk')
      return
    }

    const product: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      ...newProduct
    }

    setProducts([...products, product])
    setNewProduct({
      name: '',
      category: 'Sembako',
      price: 0,
      stock: 0,
      minStock: 0,
      supplier: '',
      description: '',
      barcode: ''
    })
    setShowAddProduct(false)
    alert('Produk berhasil ditambahkan!')
  }

  const handleEditProduct = () => {
    if (!editingProduct) return

    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    )
    setProducts(updatedProducts)
    setEditingProduct(null)
    alert('Produk berhasil diperbarui!')
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(p => p.id !== id))
      alert('Produk berhasil dihapus!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">List Barang</h1>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tambah Produk
        </button>
      </div>

      {(showAddProduct || editingProduct) && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk *
              </label>
              <input
                type="text"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama produk"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={editingProduct ? editingProduct.category : newProduct.category}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.filter(cat => cat !== 'Semua').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga *
              </label>
              <input
                type="number"
                min="0"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, price: value })
                  } else {
                    setNewProduct({ ...newProduct, price: value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Awal
              </label>
              <input
                type="number"
                min="0"
                value={editingProduct ? editingProduct.stock : newProduct.stock}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, stock: value })
                  } else {
                    setNewProduct({ ...newProduct, stock: value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Stock
              </label>
              <input
                type="number"
                min="0"
                value={editingProduct ? editingProduct.minStock : newProduct.minStock}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, minStock: value })
                  } else {
                    setNewProduct({ ...newProduct, minStock: value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier *
              </label>
              <input
                type="text"
                value={editingProduct ? editingProduct.supplier : newProduct.supplier}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, supplier: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, supplier: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama supplier"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barcode
              </label>
              <input
                type="text"
                value={editingProduct ? editingProduct.barcode : newProduct.barcode}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, barcode: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, barcode: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kode barcode"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                rows={3}
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Deskripsi produk"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={editingProduct ? handleEditProduct : handleAddProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingProduct ? 'Perbarui' : 'Simpan'}
            </button>
            <button
              onClick={() => {
                setShowAddProduct(false)
                setEditingProduct(null)
                setNewProduct({
                  name: '',
                  category: 'Sembako',
                  price: 0,
                  stock: 0,
                  minStock: 0,
                  supplier: '',
                  description: '',
                  barcode: ''
                })
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari nama produk atau supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                      {product.barcode && (
                        <div className="text-xs text-gray-400">Barcode: {product.barcode}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock} unit
                    <div className="text-xs text-gray-500">Min: {product.minStock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada produk yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}

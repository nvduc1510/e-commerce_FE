import { useEffect, useState } from 'react';
import NavbarOne from '@/components/navbar/navbar-one';
import FooterOne from '@/components/footer/footer-one';
import API from '@/components/utils/auth/axiosInterceptor';
import toast from 'react-hot-toast';
import { LuPlus, LuTrash2, LuPackage, LuUsers, LuInfo, LuFolderPlus } from 'react-icons/lu';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'low-stock'>('products');
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [lowStockList, setLowStockList] = useState<any[]>([]);
    const [productList, setProductList] = useState<any[]>([]);
    const [categoryList, setCategoryList] = useState<any[]>([]);

    // Form states
    const [showProductModal, setShowProductModal] = useState<boolean>(false);
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);

    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDesc, setNewCategoryDesc] = useState('');

    const [newProductName, setNewProductName] = useState('');
    const [newProductSku, setNewProductSku] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductQty, setNewProductQty] = useState('');
    const [newProductBrand, setNewProductBrand] = useState('');
    const [newProductShortDesc, setNewProductShortDesc] = useState('');

    useEffect(() => {
        fetchDashboardStats();
        fetchProducts();
        fetchCategories();
        fetchLowStock();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const resProd = await API.get('http://localhost:8080/api/public/totalProduct');
            setTotalProducts(resProd.data?.params || 0);

            const resUser = await API.get('http://localhost:8080/api/public/totalUsers');
            setTotalUsers(resUser.data?.params || 0);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await API.get('http://localhost:8080/api/public/products?limit=50');
            setProductList(res.data?.params?.content || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await API.get('http://localhost:8080/api/public/categories?limit=50');
            setCategoryList(res.data?.params?.content || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchLowStock = async () => {
        try {
            const res = await API.get('http://localhost:8080/api/admin/product/low-stock');
            setLowStockList(res.data?.params || []);
        } catch (error) {
            console.error('Error fetching low stock:', error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await API.delete(`http://localhost:8080/api/admin/product/delete/${id}`);
            toast.success('Product deleted successfully');
            fetchProducts();
            fetchDashboardStats();
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await API.delete(`http://localhost:8080/api/admin/category/delete/${id}`);
            toast.success('Category deleted successfully');
            fetchCategories();
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post('http://localhost:8080/api/admin/category/create', {
                categoryName: newCategoryName,
                description: newCategoryDesc,
                status: 'ACTIVE'
            });
            toast.success('Category created successfully!');
            setNewCategoryName('');
            setNewCategoryDesc('');
            setShowCategoryModal(false);
            fetchCategories();
        } catch (error) {
            toast.error('Failed to create category');
        }
    };

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post('http://localhost:8080/api/admin/product/create', {
                sku: newProductSku || `SKU-${Date.now()}`,
                productName: newProductName,
                shortDescription: newProductShortDesc,
                price: parseFloat(newProductPrice),
                quantity: parseInt(newProductQty),
                brand: newProductBrand || 'Furnixar',
                status: 'ACTIVE',
                slug: newProductName.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
                discount: 0
            });
            toast.success('Product created successfully!');
            setNewProductName('');
            setNewProductSku('');
            setNewProductPrice('');
            setNewProductQty('');
            setNewProductBrand('');
            setNewProductShortDesc('');
            setShowProductModal(false);
            fetchProducts();
            fetchDashboardStats();
        } catch (error) {
            toast.error('Failed to create product');
        }
    };

    return (
        <>
            <NavbarOne />

            <div className="bg-slate-100 dark:bg-title py-8 px-4 sm:px-8 min-h-screen">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Management Dashboard</h1>
                            <p className="text-slate-500 dark:text-gray-400 mt-1">Manage products, categories, stock, and store overview.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowProductModal(true)}
                                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all">
                                <LuPlus size={18} /> Add Product
                            </button>
                            <button
                                onClick={() => setShowCategoryModal(true)}
                                className="bg-slate-800 text-white dark:bg-white dark:text-title px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all">
                                <LuFolderPlus size={18} /> Add Category
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-lg">
                                <LuPackage size={28} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-gray-400">Total Products</p>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{totalProducts}</h3>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-lg">
                                <LuUsers size={28} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-gray-400">Registered Users</p>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{totalUsers}</h3>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-lg">
                                <LuInfo size={28} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-gray-400">Low Stock Items</p>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{lowStockList.length}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`py-3 px-6 font-medium text-base border-b-2 transition-all ${activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-gray-400'}`}>
                            All Products ({productList.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`py-3 px-6 font-medium text-base border-b-2 transition-all ${activeTab === 'categories' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-gray-400'}`}>
                            Categories ({categoryList.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('low-stock')}
                            className={`py-3 px-6 font-medium text-base border-b-2 transition-all ${activeTab === 'low-stock' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-gray-400'}`}>
                            Low Stock Alert ({lowStockList.length})
                        </button>
                    </div>

                    {/* Tab: Products */}
                    {activeTab === 'products' && (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase">
                                        <th className="py-4 px-6">ID / SKU</th>
                                        <th className="py-4 px-6">Product Name</th>
                                        <th className="py-4 px-6">Price</th>
                                        <th className="py-4 px-6">Stock Qty</th>
                                        <th className="py-4 px-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
                                    {productList.map((item) => (
                                        <tr key={item.productId} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                                            <td className="py-4 px-6 font-mono text-slate-600 dark:text-gray-300">#{item.productId} <span className="text-xs text-gray-400">({item.sku})</span></td>
                                            <td className="py-4 px-6 font-medium text-slate-800 dark:text-white">{item.productName}</td>
                                            <td className="py-4 px-6 text-slate-700 dark:text-gray-200">${item.price}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.quantity > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {item.quantity} in stock
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => handleDeleteProduct(item.productId)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950 transition-all">
                                                    <LuTrash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Tab: Categories */}
                    {activeTab === 'categories' && (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase">
                                        <th className="py-4 px-6">ID</th>
                                        <th className="py-4 px-6">Category Name</th>
                                        <th className="py-4 px-6">Description</th>
                                        <th className="py-4 px-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
                                    {categoryList.map((cat) => (
                                        <tr key={cat.categoryId} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                                            <td className="py-4 px-6 font-mono">#{cat.categoryId}</td>
                                            <td className="py-4 px-6 font-medium text-slate-800 dark:text-white">{cat.categoryName}</td>
                                            <td className="py-4 px-6 text-slate-600 dark:text-gray-300">{cat.description || 'N/A'}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => handleDeleteCategory(cat.categoryId)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950 transition-all">
                                                    <LuTrash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Tab: Low Stock */}
                    {activeTab === 'low-stock' && (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase">
                                        <th className="py-4 px-6">Product ID</th>
                                        <th className="py-4 px-6">Product Name</th>
                                        <th className="py-4 px-6">Current Quantity</th>
                                        <th className="py-4 px-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
                                    {lowStockList.map((item) => (
                                        <tr key={item.productId}>
                                            <td className="py-4 px-6 font-mono">#{item.productId}</td>
                                            <td className="py-4 px-6 font-medium">{item.productName}</td>
                                            <td className="py-4 px-6 font-bold text-red-600">{item.quantity} left</td>
                                            <td className="py-4 px-6">
                                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Re-order required</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>

            {/* Modal: Create Product */}
            {showProductModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Create New Product</h3>
                        <form onSubmit={handleCreateProduct} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-gray-300 mb-1">Product Name</label>
                                <input required type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 dark:text-gray-300 mb-1">Price ($)</label>
                                    <input required type="number" step="0.01" value={newProductPrice} onChange={e => setNewProductPrice(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 dark:text-gray-300 mb-1">Stock Quantity</label>
                                    <input required type="number" value={newProductQty} onChange={e => setNewProductQty(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-gray-300 mb-1">Brand</label>
                                <input type="text" value={newProductBrand} onChange={e => setNewProductBrand(e.target.value)} placeholder="Furnixar" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-gray-300 mb-1">Short Description</label>
                                <textarea value={newProductShortDesc} onChange={e => setNewProductShortDesc(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" rows={2}></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 border rounded-lg text-slate-600 dark:text-gray-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Create Category */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Create New Category</h3>
                        <form onSubmit={handleCreateCategory} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-gray-300 mb-1">Category Name</label>
                                <input required type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-gray-300 mb-1">Description</label>
                                <textarea value={newCategoryDesc} onChange={e => setNewCategoryDesc(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" rows={3}></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setShowCategoryModal(false)} className="px-4 py-2 border rounded-lg text-slate-600 dark:text-gray-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <FooterOne />
        </>
    );
}

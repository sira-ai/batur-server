'use client'

import { motion } from 'framer-motion'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  DollarSign,
  Eye,
  Calendar
} from 'lucide-react'

// Mock data untuk demo
const stats = [
  {
    name: 'Total Produk',
    value: '24',
    change: '+12%',
    changeType: 'positive',
    icon: Package,
  },
  {
    name: 'Total Orders',
    value: '156',
    change: '+23%',
    changeType: 'positive',
    icon: ShoppingCart,
  },
  {
    name: 'Total Users',
    value: '89',
    change: '+8%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Revenue',
    value: 'Rp 45.2M',
    change: '+15%',
    changeType: 'positive',
    icon: DollarSign,
  },
]

const recentOrders = [
  {
    id: '1',
    customer: 'John Doe',
    product: 'Panel Pterodactyl Premium',
    amount: 'Rp 150.000',
    status: 'completed',
    date: '2025-01-15',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    product: 'Reseller Panel Pro',
    amount: 'Rp 250.000',
    status: 'pending',
    date: '2025-01-15',
  },
  {
    id: '3',
    customer: 'Bob Johnson',
    product: 'Admin Panel Custom',
    amount: 'Rp 500.000',
    status: 'paid',
    date: '2025-01-14',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'paid':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang di admin panel Batur Server
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change} dari bulan lalu
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border border-border rounded-lg"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Orders
            </h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Product
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <div className="font-medium text-foreground">
                      {order.customer}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-foreground">
                      {order.product}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">
                      {order.amount}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-muted-foreground">
                      {order.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Manage Products
            </h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Add, edit, or remove products from your store
          </p>
          <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
            Go to Products
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              View Orders
            </h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Monitor and manage customer orders
          </p>
          <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors duration-200">
            View Orders
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Analytics
            </h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            View detailed sales and performance analytics
          </p>
          <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors duration-200">
            View Analytics
          </button>
        </div>
      </motion.div>
    </div>
  )
}


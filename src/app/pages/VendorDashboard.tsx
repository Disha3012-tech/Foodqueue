import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Users, Clock, TrendingUp, Package, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router';

export const VendorDashboard: React.FC = () => {
  const { orders } = useApp();

  const activeOrders = orders.filter((o) => o.status !== 'completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgWaitTime = 12;
  const completedToday = orders.filter((o) => o.status === 'completed').length;

  const stats = [
    {
      icon: Package,
      label: 'Active Orders',
      value: activeOrders,
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10',
    },
    {
      icon: Clock,
      label: 'Avg Wait Time',
      value: `${avgWaitTime} min`,
      color: 'from-yellow-500 to-orange-500',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: CheckCircle,
      label: 'Completed Today',
      value: completedToday,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your orders and track performance</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`${stat.bg} backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-opacity-10`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Link to="/vendor/orders">
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)' }}
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-300 dark:border-orange-500/30 cursor-pointer"
            >
              <Package className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage Orders</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">View and update order status</p>
            </motion.div>
          </Link>

          <Link to="/vendor/queue">
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-300 dark:border-purple-500/30 cursor-pointer"
            >
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Queue Management</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Organize and optimize your queue</p>
            </motion.div>
          </Link>

          <Link to="/vendor/analytics">
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-300 dark:border-green-500/30 cursor-pointer"
            >
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">View performance insights</p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-purple-500/20"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Orders</h2>
          
          {orders.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                      {order.token}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold">{order.items.length} items</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {new Date(order.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">${order.total.toFixed(2)}</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'placed'
                          ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          : order.status === 'preparing'
                          ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                          : order.status === 'ready'
                          ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                          : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
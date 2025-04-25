import React, { useState, useEffect } from 'react';
import SolanaEcosystemDashboard from './components/SolanaEcosystemDashboard';
import SolanaLiquidityFlow from './components/SolanaLiquidityFlow';
import { motion } from 'framer-motion';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ecosystem');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mb-4 mx-auto"
          >
            <svg viewBox="0 0 50 50" className="text-blue-400">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="80, 200"
              />
            </svg>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Solana Dashboard
          </motion.h1>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className="p-6 border-b border-blue-800/30">
        <div className="container mx-auto">
          <motion.h1
            className="text-3xl text white font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Solana Analytics Dashboard
          </motion.h1>
          <motion.p
            className="text-white mt-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Real-time ecosystem metrics and liquidity flow visualization
          </motion.p>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <motion.div
          className="flex justify-center mb-6 bg-gray-800/50 rounded-lg p-1.5 backdrop-blur-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className={`px-6 py-3 rounded-md font-medium cursor-pointer ${activeTab === 'ecosystem'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-300'
              }`}
            onClick={() => setActiveTab('ecosystem')}
            variants={tabVariants}
            animate={activeTab === 'ecosystem' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Ecosystem Metrics
          </motion.button>

          <motion.button
            className={`px-6 py-3 rounded-md font-medium cursor-pointer ${activeTab === 'liquidity'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-300'
              }`}
            onClick={() => setActiveTab('liquidity')}
            variants={tabVariants}
            animate={activeTab === 'liquidity' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Liquidity Flow
          </motion.button>

          <motion.button
            className={`px-6 py-3 rounded-md font-medium cursor-pointer ${activeTab === 'combined'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-300'
              }`}
            onClick={() => setActiveTab('combined')}
            variants={tabVariants}
            animate={activeTab === 'combined' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            All Metrics
          </motion.button>

        </motion.div>

        {activeTab === 'ecosystem' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SolanaEcosystemDashboard />
          </motion.div>
        )}

        {activeTab === 'liquidity' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SolanaLiquidityFlow />
          </motion.div>
        )}

        {activeTab === 'combined' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <SolanaEcosystemDashboard />
              <SolanaLiquidityFlow />
            </div>
          </motion.div>
        )}
      </div>

      <footer className="mt-12 py-6 border-t border-blue-800/30 text-center text-blue-400">
        <div className="container mx-auto">
          <p>© 2025 Solana Analytics Dashboard • Real-time blockchain metrics</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default App;
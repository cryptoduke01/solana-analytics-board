import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const SolanaEcosystemDashboard = () => {
  const [hoveredSector, setHoveredSector] = useState(null);
  
  // Data for comparison chart
  const sectorData = [
    {
      name: 'DEXs',
      activeUsers: 35,
      txVolume: 90,
      feeGeneration: 83.7,
      retention: 80,
      tvl: 85
    },
    {
      name: 'Liquid Staking',
      activeUsers: 22.5,
      txVolume: 50,
      feeGeneration: 70,
      retention: 95,
      tvl: 85
    },
    {
      name: 'Meme Tokens',
      activeUsers: 45,
      txVolume: 95,
      feeGeneration: 90,
      retention: 40,
      tvl: 10
    },
    {
      name: 'RWAs/Payments',
      activeUsers: 12.5,
      txVolume: 65,
      feeGeneration: 50,
      retention: 75,
      tvl: 25
    },
    {
      name: 'Lending/Borrowing',
      activeUsers: 17.5,
      txVolume: 50,
      feeGeneration: 70,
      retention: 75,
      tvl: 85
    }
  ];

  // Data for TVL distribution
  const tvlData = [
    { name: 'DEXs', value: 3.2 },
    { name: 'Liquid Staking', value: 3.2 },
    { name: 'Meme Tokens', value: 0.2 },
    { name: 'RWAs/Payments', value: 0.6 },
    { name: 'Lending/Borrowing', value: 2.3 }
  ];

  // Data for Token Flow Distribution
  const tokenFlowData = [
    { name: 'DEXs', value: 20 },
    { name: 'Liquid Staking', value: 15 },
    { name: 'Meme Tokens', value: 45 },
    { name: 'RWAs/Payments', value: 10 },
    { name: 'Lending/Borrowing', value: 10 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  
  // Custom tooltip style
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-blue-500/30 backdrop-blur-md">
          <p className="text-blue-300 font-bold">{label}</p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {entry.name}: {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-blue-500/20 backdrop-blur"
        variants={itemVariants}
      >
        <h2 className="text-xl text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Solana Ecosystem Metrics by Sector (Normalized %)
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sectorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis label={{ value: 'Score (0-100)', angle: -90, position: 'insideLeft', fill: '#94A3B8' }} stroke="#94A3B8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#E2E8F0' }} />
              <Bar 
                dataKey="activeUsers" 
                name="Daily Active Users %" 
                fill="url(#activeUsersGradient)" 
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredSector("activeUsers")}
                onMouseLeave={() => setHoveredSector(null)}
                animationDuration={1500}
              />
              <Bar 
                dataKey="txVolume" 
                name="Transaction Volume" 
                fill="url(#txVolumeGradient)" 
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredSector("txVolume")}
                onMouseLeave={() => setHoveredSector(null)}
                animationDuration={1500}
              />
              <Bar 
                dataKey="feeGeneration" 
                name="Fee Generation" 
                fill="url(#feeGradient)" 
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredSector("feeGeneration")}
                onMouseLeave={() => setHoveredSector(null)}
                animationDuration={1500}
              />
              <Bar 
                dataKey="retention" 
                name="User Retention" 
                fill="url(#retentionGradient)" 
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredSector("retention")}
                onMouseLeave={() => setHoveredSector(null)}
                animationDuration={1500}
              />
              <Bar 
                dataKey="tvl" 
                name="TVL" 
                fill="url(#tvlGradient)" 
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredSector("tvl")}
                onMouseLeave={() => setHoveredSector(null)}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="txVolumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#047857" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#B45309" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#B91C1C" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-blue-500/20 backdrop-blur"
          variants={itemVariants}
        >
          <h2 className="text-xl text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            TVL Distribution ($9.5B Total)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tvlData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {tvlData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#pieGradient${index})`}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}B`} content={<CustomTooltip />} />
                <defs>
                  {COLORS.map((color, index) => (
                    <radialGradient key={index} id={`pieGradient${index}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor={COLORS[index]} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={COLORS[index]} stopOpacity={0.7} />
                    </radialGradient>
                  ))}
                </defs>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-blue-500/20 backdrop-blur"
          variants={itemVariants}
        >
          <h2 className="text-xl text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            New Token Flow Distribution (110,180 new tokens)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenFlowData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={600}
                >
                  {tokenFlowData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#tokenGradient${index})`}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} content={<CustomTooltip />} />
                <defs>
                  {COLORS.map((color, index) => (
                    <radialGradient key={index} id={`tokenGradient${index}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor={COLORS[index]} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={COLORS[index]} stopOpacity={0.7} />
                    </radialGradient>
                  ))}
                </defs>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SolanaEcosystemDashboard;
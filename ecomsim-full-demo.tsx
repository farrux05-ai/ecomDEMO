import React, { useState, useMemo } from 'react';
import { TrendingUp, Calculator, BookOpen, Gamepad2, Network, ArrowRight, ArrowLeft, CheckCircle, XCircle, TrendingDown, DollarSign, Users, ShoppingCart, Target, Zap, Info, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EcomSimFullDemo() {
  const [activeTab, setActiveTab] = useState('education');
  const [selectedMetric, setSelectedMetric] = useState(null);
  
  const [calcInputs, setCalcInputs] = useState({
    traffic: 10000,
    conversionRate: 2.5,
    aov: 150000,
    adSpend: 5000000,
    cogs: 60,
    returnRate: 5
  });
  
  const [scenarioStep, setScenarioStep] = useState(0);
  const [scenarioChoices, setScenarioChoices] = useState([]);
  const [scenarioScore, setScenarioScore] = useState(0);

  const metrics = [
    {
      id: 'revenue',
      name: 'Revenue (Daromad)',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      definition: "Biznesingiz qancha pul ishlab topdi",
      formula: "Sotilgan Soni × Narx",
      why: "Daromadsiz biznes yoq",
      example: {
        scenario: "200 mahsulot, 150k som",
        calculation: "200 × 150,000 = 30 mln",
        result: "30 million som"
      },
      goodRange: "Oyma-oy +10-20%",
      badRange: "Tushsa xavfli"
    },
    {
      id: 'aov',
      name: "AOV (Ortacha Buyurtma)",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      definition: "Mijoz ortacha qancha sarflaydi",
      formula: "Daromad ÷ Buyurtmalar",
      why: "AOV oshirish oson yol",
      example: {
        scenario: "30 mln, 200 buyurtma",
        calculation: "30 mln ÷ 200 = 150k",
        result: "150k som AOV"
      },
      goodRange: "100k-300k som",
      badRange: "Juda past"
    },
    {
      id: 'conversion',
      name: 'Konversiya',
      icon: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      definition: "Necha foiz xarid qiladi",
      formula: "Buyurtma ÷ Tashrif × 100",
      why: "Past bolsa muammo bor",
      example: {
        scenario: "10k tashrif, 250 xarid",
        calculation: "250 ÷ 10k × 100 = 2.5%",
        result: "2.5% konversiya"
      },
      goodRange: "2-5% yaxshi",
      badRange: "1% dan kam"
    },
    {
      id: 'roas',
      name: 'ROAS',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      definition: "1 som reklamaga qancha qaytadi",
      formula: "Daromad ÷ Reklama",
      why: "Past bolsa zarar",
      example: {
        scenario: "5 mln reklama, 20 mln",
        calculation: "20 ÷ 5 = 4x",
        result: "ROAS 4x"
      },
      goodRange: "3x+ yaxshi",
      badRange: "2x dan kam"
    },
    {
      id: 'cac',
      name: 'CAC',
      icon: <Users className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      definition: "Mijoz qancha turadi",
      formula: "Reklama ÷ Mijoz",
      why: "Yuqori bolsa zarar",
      example: {
        scenario: "5 mln, 200 mijoz",
        calculation: "5 mln ÷ 200 = 25k",
        result: "25k som"
      },
      goodRange: "Past kerak",
      badRange: "Juda yuqori"
    }
  ];

  const calculatedMetrics = useMemo(() => {
    const orders = calcInputs.traffic * calcInputs.conversionRate / 100;
    const revenue = orders * calcInputs.aov;
    const productCost = revenue * calcInputs.cogs / 100;
    const returnsLoss = revenue * calcInputs.returnRate / 100;
    const grossProfit = revenue - productCost - calcInputs.adSpend - returnsLoss;
    const roas = revenue / calcInputs.adSpend;
    const cac = calcInputs.adSpend / orders;
    const profitMargin = grossProfit / revenue * 100;

    return {
      orders: Math.round(orders),
      revenue: Math.round(revenue),
      grossProfit: Math.round(grossProfit),
      roas: roas.toFixed(2),
      cac: Math.round(cac),
      profitMargin: profitMargin.toFixed(1)
    };
  }, [calcInputs]);

  const chartData = [
    { name: 'Oy 1', daromad: 25000000 },
    { name: 'Oy 2', daromad: 28000000 },
    { name: 'Oy 3', daromad: 32000000 },
    { name: 'Oy 4', daromad: 35000000 },
    { name: 'Oy 5', daromad: 40000000 },
    { name: 'Oy 6', daromad: 45000000 }
  ];

  const currentScenario = {
    title: "Konversiya 20% Tushdi!",
    description: "2 haftada konversiya 3% dan 2.4% ga tushdi.",
    currentMetrics: { traffic: 10000, conversion: 2.4, aov: 150000, revenue: 36000000 },
    choices: [
      { id: 'ads', text: "Reklama 2x oshirish", icon: <TrendingUp className="w-5 h-5" />, points: -20, feedback: "Traffic oshdi, konversiya tushdi!", lesson: "Koproq odam yechim emas." },
      { id: 'photos', text: "Rasmlar yaxshilash", icon: <CheckCircle className="w-5 h-5" />, points: 50, feedback: "Ajoyib! Konversiya tiklanmoqda.", lesson: "Yaxshi vizual muhim." },
      { id: 'discount', text: "20% chegirma", icon: <TrendingDown className="w-5 h-5" />, points: 10, feedback: "Konversiya oshdi, AOV tushdi.", lesson: "Chegirma qisqa muddat." },
      { id: 'reviews', text: "Review yigish", icon: <Users className="w-5 h-5" />, points: 40, feedback: "Yaxshi! Ishonch oshdi.", lesson: "Social proof kuchli." }
    ]
  };

  const handleScenarioChoice = (choice) => {
    setScenarioChoices([...scenarioChoices, choice]);
    setScenarioScore(scenarioScore + choice.points);
    setScenarioStep(1);
  };

  const resetScenario = () => {
    setScenarioStep(0);
    setScenarioChoices([]);
    setScenarioScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold">EcomSim</h1>
            </div>
            <div className="text-sm text-gray-600">Demo</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-2 flex space-x-2 overflow-x-auto">
          <button onClick={() => setActiveTab('education')} className={`flex items-center px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'education' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <BookOpen className="w-5 h-5 mr-2" />Talim
          </button>
          <button onClick={() => setActiveTab('calculator')} className={`flex items-center px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'calculator' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Calculator className="w-5 h-5 mr-2" />Kalkulyator
          </button>
          <button onClick={() => setActiveTab('connections')} className={`flex items-center px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'connections' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Network className="w-5 h-5 mr-2" />Boglanish
          </button>
          <button onClick={() => setActiveTab('scenario')} className={`flex items-center px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'scenario' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Gamepad2 className="w-5 h-5 mr-2" />Oyin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {activeTab === 'education' && (
          <div className="space-y-6">
            {!selectedMetric ? (
              <>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                  <h2 className="text-3xl font-bold mb-4">Metrikalar</h2>
                  <p className="text-lg">Har biri oddiy tilda</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {metrics.map((m) => (
                    <div key={m.id} onClick={() => setSelectedMetric(m)} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
                      <div className={`bg-gradient-to-br ${m.color} w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4`}>{m.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{m.name}</h3>
                      <p className="text-gray-600 mb-4">{m.definition}</p>
                      <div className="flex items-center text-blue-600 font-semibold">Organish <ArrowRight className="ml-2 w-5 h-5" /></div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <button onClick={() => setSelectedMetric(null)} className="flex items-center text-gray-600 hover:text-gray-900"><ArrowLeft className="w-5 h-5 mr-2" />Orqaga</button>
                <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                  <div className={`bg-gradient-to-br ${selectedMetric.color} w-20 h-20 rounded-xl flex items-center justify-center text-white mb-6`}>{selectedMetric.icon}</div>
                  <h1 className="text-4xl font-bold mb-6">{selectedMetric.name}</h1>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                      <div className="flex items-start">
                        <Info className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                        <div><h3 className="text-lg font-bold mb-2">Bu nima?</h3><p className="text-gray-700 text-lg">{selectedMetric.definition}</p></div>
                      </div>
                    </div>
                    <div><h3 className="text-2xl font-bold mb-3">Formula:</h3><div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-lg">{selectedMetric.formula}</div></div>
                    <div><h3 className="text-2xl font-bold mb-3">Nega muhim?</h3><p className="text-gray-700 text-lg">{selectedMetric.why}</p></div>
                    <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                      <h3 className="text-2xl font-bold mb-4">Misol:</h3>
                      <div className="space-y-3">
                        <div><span className="font-semibold text-purple-700">Vaziyat:</span><p className="text-gray-700 mt-1">{selectedMetric.example.scenario}</p></div>
                        <div><span className="font-semibold text-purple-700">Hisob:</span><p className="text-gray-700 mt-1 font-mono bg-white p-3 rounded">{selectedMetric.example.calculation}</p></div>
                        <div><span className="font-semibold text-purple-700">Natija:</span><p className="text-gray-700 mt-1">{selectedMetric.example.result}</p></div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                        <div className="flex items-center text-green-700 font-bold mb-2"><CheckCircle className="w-5 h-5 mr-2" />Yaxshi</div>
                        <p className="text-gray-700">{selectedMetric.goodRange}</p>
                      </div>
                      <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                        <div className="flex items-center text-red-700 font-bold mb-2"><XCircle className="w-5 h-5 mr-2" />Xavfli</div>
                        <p className="text-gray-700">{selectedMetric.badRange}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Kalkulyator</h2>
              <p className="text-lg">Ozgartiring va koring</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-6">Kirish</h3>
                <div className="space-y-6">
                  <div>
                    <label className="flex justify-between text-sm font-semibold mb-2"><span>Trafik</span><span className="text-blue-600">{calcInputs.traffic.toLocaleString()}</span></label>
                    <input type="range" min="1000" max="50000" step="1000" value={calcInputs.traffic} onChange={(e) => setCalcInputs({...calcInputs, traffic: parseInt(e.target.value)})} className="w-full" />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-semibold mb-2"><span>Konversiya</span><span className="text-blue-600">{calcInputs.conversionRate}%</span></label>
                    <input type="range" min="0.5" max="10" step="0.1" value={calcInputs.conversionRate} onChange={(e) => setCalcInputs({...calcInputs, conversionRate: parseFloat(e.target.value)})} className="w-full" />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-semibold mb-2"><span>AOV</span><span className="text-blue-600">{calcInputs.aov.toLocaleString()}</span></label>
                    <input type="range" min="50000" max="500000" step="10000" value={calcInputs.aov} onChange={(e) => setCalcInputs({...calcInputs, aov: parseInt(e.target.value)})} className="w-full" />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-semibold mb-2"><span>Reklama</span><span className="text-blue-600">{calcInputs.adSpend.toLocaleString()}</span></label>
                    <input type="range" min="1000000" max="20000000" step="500000" value={calcInputs.adSpend} onChange={(e) => setCalcInputs({...calcInputs, adSpend: parseInt(e.target.value)})} className="w-full" />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-semibold mb-2"><span>Tannarx</span><span className="text-blue-600">{calcInputs.cogs}%</span></label>
                    <input type="range" min="30" max="80" step="5" value={calcInputs.cogs} onChange={(e) => setCalcInputs({...calcInputs, cogs: parseInt(e.target.value)})} className="w-full" />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-semibold mb-2"><span>Qaytarish</span><span className="text-blue-600">{calcInputs.returnRate}%</span></label>
                    <input type="range" min="0" max="20" step="1" value={calcInputs.returnRate} onChange={(e) => setCalcInputs({...calcInputs, returnRate: parseInt(e.target.value)})} className="w-full" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <h3 className="text-xl font-bold mb-6">Natijalar</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                      <div className="text-sm opacity-90 mb-1">Buyurtmalar</div>
                      <div className="text-3xl font-bold">{calculatedMetrics.orders}</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                      <div className="text-sm opacity-90 mb-1">Daromad</div>
                      <div className="text-3xl font-bold">{calculatedMetrics.revenue.toLocaleString()} som</div>
                    </div>
                    <div className={`bg-gradient-to-r ${calculatedMetrics.grossProfit > 0 ? 'from-teal-500 to-teal-600' : 'from-red-500 to-red-600'} rounded-lg p-4 text-white`}>
                      <div className="text-sm opacity-90 mb-1">Foyda</div>
                      <div className="text-3xl font-bold">{calculatedMetrics.grossProfit.toLocaleString()} som</div>
                      <div className="text-sm mt-2">Margin: {calculatedMetrics.profitMargin}%</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-4">
                        <div className="text-sm text-orange-700 mb-1">ROAS</div>
                        <div className="text-2xl font-bold text-orange-600">{calculatedMetrics.roas}x</div>
                      </div>
                      <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                        <div className="text-sm text-purple-700 mb-1">CAC</div>
                        <div className="text-2xl font-bold text-purple-600">{calculatedMetrics.cac.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <h3 className="text-lg font-bold mb-4">Trend</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)} mln`} />
                      <Line type="monotone" dataKey="daromad" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Boglanishlar</h2>
              <p className="text-lg">Qanday boglanadi</p>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl">Trafik (10,000)</div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded">Konversiya 2.5%</div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-xl">Buyurtmalar (250)</div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded">AOV 150k</div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-xl">Daromad (37.5 mln)</div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-bold text-xl">Foyda</div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mt-8">
                <h3 className="font-bold mb-3">Muhim:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Trafik yuqori - Xarajat yuqori</li>
                  <li>• Konversiya yuqori - Buyurtma yuqori</li>
                  <li>• AOV yuqori - Daromad yuqori</li>
                  <li>• Qaytarish yuqori - Foyda past</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scenario' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Oyin</h2>
              <p className="text-lg">Muammo hal qiling</p>
            </div>
            {scenarioStep === 0 ? (
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <h2 className="text-3xl font-bold mb-4">{currentScenario.title}</h2>
                <p className="text-lg text-gray-700 mb-8">{currentScenario.description}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-700 mb-1">Trafik</div>
                    <div className="text-2xl font-bold">{currentScenario.currentMetrics.traffic.toLocaleString()}</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-sm text-red-700 mb-1">Konversiya</div>
                    <div className="text-2xl font-bold">{currentScenario.currentMetrics.conversion}%</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Nima qilardingiz?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentScenario.choices.map((c) => (
                    <button key={c.id} onClick={() => handleScenarioChoice(c)} className="bg-gray-50 border-2 border-gray-300 hover:border-orange-500 rounded-xl p-6 text-left transition">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 text-orange-600 p-2 rounded-lg mr-3">{c.icon}</div>
                        <h4 className="text-lg font-bold">{c.text}</h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${scenarioChoices[0].points > 30 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Natija</h2>
                  <p className="text-lg text-gray-600">Ball: <span className="font-bold text-green-600">{scenarioScore}</span></p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                  <h3 className="text-xl font-bold mb-3">Tanlov:</h3>
                  <p className="text-lg text-gray-700 mb-4">{scenarioChoices[0].text}</p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-bold mb-2">Natija:</h4>
                    <p className="text-gray-700">{scenarioChoices[0].feedback}</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Darslik:</h4>
                    <p className="text-blue-800">{scenarioChoices[0].lesson}</p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button onClick={resetScenario} className="flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
                    <RotateCcw className="w-5 h-5 mr-2" />Qaytadan
                  </button>
                  <button onClick={() => setActiveTab('education')} className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    <BookOpen className="w-5 h-5 mr-2" />Organish
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-white">EcomSim</h3>
          </div>
          <p className="text-sm">Ozbekiston savdogarlari uchun ecommerce talim</p>
        </div>
      </footer>
    </div>
  );
}
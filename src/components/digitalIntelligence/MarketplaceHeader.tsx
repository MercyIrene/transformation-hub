 import { ChevronRight, BarChart3, Brain, Activity, Sparkles } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 
 export function MarketplaceHeader() {
   const navigate = useNavigate();
 
   return (
     <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-b border-gray-200">
       <div className="max-w-7xl mx-auto px-4 py-12">
         {/* Breadcrumb */}
         <nav
           aria-label="Breadcrumb"
           className="flex items-center gap-2 text-sm text-gray-600 mb-6 flex-wrap"
         >
           <button
             onClick={() => navigate("/")}
             className="hover:text-purple-600 transition-colors"
           >
             Home
           </button>
           <ChevronRight size={16} aria-hidden="true" />
           <button
             onClick={() => navigate("/marketplaces")}
             className="hover:text-purple-600 transition-colors"
           >
             Marketplaces
           </button>
           <ChevronRight size={16} aria-hidden="true" />
           <span className="text-gray-900 font-medium" aria-current="page">
             Digital Intelligence
           </span>
         </nav>
 
         {/* Phase Badge + AI-Powered Badge */}
         <div className="flex flex-wrap items-center gap-3 mb-3">
           <span className="badge-drive inline-block px-3 py-1 rounded-full text-xs font-semibold border-0">
             Drive
           </span>
           <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white px-4 py-2 rounded-full font-semibold text-sm inline-flex items-center gap-2 shadow-lg animate-pulse">
             <Sparkles className="w-4 h-4" />
             AI-Powered Analytics & Insights
           </span>
         </div>
 
         {/* Title */}
         <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
           DTMP Digital Intelligence
         </h1>
 
         {/* Description */}
         <p className="text-gray-600 text-base leading-relaxed max-w-3xl mb-6">
           Data-driven insights across systems, digital transformation maturity,
           and project delivery. Leverage AI-powered analytics for predictive
           intelligence, automated maturity assessments, trend analysis, and
           performance optimization. Turn data into actionable insights for
           continuous improvement.
         </p>
 
         {/* Stats */}
         <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
           <div className="flex items-center gap-2">
             <BarChart3 className="w-5 h-5 text-purple-600" aria-hidden="true" />
             <span className="font-semibold">30 Intelligence Services</span>
           </div>
           <div className="flex items-center gap-2">
             <Brain className="w-5 h-5 text-purple-600" aria-hidden="true" />
             <span className="font-semibold">AI-Powered Predictions</span>
           </div>
           <div className="flex items-center gap-2">
             <Activity className="w-5 h-5 text-purple-600" aria-hidden="true" />
             <span className="font-semibold">Real-time Analytics</span>
           </div>
         </div>
       </div>
     </section>
   );
 }
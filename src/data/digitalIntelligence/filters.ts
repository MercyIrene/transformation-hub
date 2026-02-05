 export interface FilterConfig {
   [key: string]: string[];
 }
 
 export const systemsPortfolioFilters: FilterConfig = {
   analyticsType: [
     "Health Analytics",
     "Performance Monitoring",
     "Predictive Analytics",
     "Lifecycle Management",
     "Cost Analytics",
     "Security Analytics"
   ],
   systemScope: [
     "Enterprise-wide",
     "Business Unit",
     "Domain",
     "Individual System"
   ],
   dataSource: [
     "APM Tools",
     "CMDB",
     "Monitoring Systems",
     "Log Analytics",
     "All Sources"
   ],
   aiCapability: [
     "Predictive Models",
     "Anomaly Detection",
     "Trend Analysis",
     "Forecasting",
     "None"
   ],
   updateFrequency: [
     "Real-time",
     "Hourly",
     "Daily",
     "Weekly",
     "On-demand"
   ],
   visualizationType: [
     "Dashboard",
     "Report",
     "Heatmap",
     "Trend Chart",
     "Alert"
   ],
   complexity: [
     "Low",
     "Medium",
     "High"
   ]
 };
 
 export const digitalMaturityFilters: FilterConfig = {
   assessmentType: [
     "DBP Maturity",
     "Capability Maturity",
     "Technology Maturity",
     "Organizational Maturity",
     "Process Maturity"
   ],
   assessmentScope: [
     "Enterprise",
     "Domain",
     "Business Unit",
     "Initiative"
   ],
   framework: [
     "DBP Framework",
     "CMMI",
     "Custom Framework",
     "Industry Standard"
   ],
   aiCapability: [
     "Auto-scoring",
     "Gap Analysis",
     "Recommendation Engine",
     "Benchmark Comparison"
   ],
   outputFormat: [
     "Interactive Dashboard",
     "PDF Report",
     "PPTX Presentation",
     "Excel Scorecard"
   ],
   assessmentFrequency: [
     "Continuous",
     "Quarterly",
     "Semi-Annual",
     "Annual",
     "On-demand"
   ],
   complexity: [
     "Low",
     "Medium",
     "High"
   ]
 };
 
 export const projectsPortfolioFilters: FilterConfig = {
   analyticsType: [
     "Success Prediction",
     "Velocity Analytics",
     "Resource Analytics",
     "Risk Analytics",
     "Delivery Forecasting"
   ],
   projectType: [
     "Transformation Projects",
     "IT Projects",
     "Business Projects",
     "All Projects"
   ],
   aiCapability: [
     "Predictive Models",
     "Success Scoring",
     "Risk Prediction",
     "Resource Optimization",
     "Timeline Forecasting"
   ],
   dataSource: [
     "Project Management Tools",
     "Time Tracking",
     "Financial Systems",
     "Resource Management",
     "All Sources"
   ],
   updateFrequency: [
     "Real-time",
     "Daily",
     "Weekly",
     "On-demand"
   ],
   visualizationType: [
     "Predictive Dashboard",
     "Trend Analysis",
     "Heatmap",
     "Forecast Chart"
   ],
   complexity: [
     "Low",
     "Medium",
     "High"
   ]
 };
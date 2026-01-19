export default function ProgressBar({ step }) {
  // Calculate width percentage based on step (1 to 4)
  const progress = (step / 4) * 100;
  
  return (
    <div className="w-full bg-gray-200 h-2.5 rounded-full mb-6">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-xs text-right mt-1 text-gray-500">Step {step} of 4</p>
    </div>
  );
}
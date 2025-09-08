import React from "react";

const StepProgressBar = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, label: "Customer" },
    { number: 2, label: "Service" },
    { number: 3, label: "Professional" },
    { number: 4, label: "Date" },
  ];

  const getStepClasses = (stepNumber) => {
    if (stepNumber <= currentStep) {
      return "w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium";
    }
    return "w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium";
  };

  const getLabelClasses = (stepNumber) => {
    if (stepNumber <= currentStep) {
      return "mt-2 text-sm font-medium text-orange-500 text-center";
    }
    return "mt-2 text-sm text-gray-400 text-center";
  };

  return (
    <div className="w-full flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex-1 flex flex-col items-center relative">
          {/* Step Circle */}
          <div className={getStepClasses(step.number)}>{step.number}</div>
          {/* Label */}
          <span className={getLabelClasses(step.number)}>{step.label}</span>

          {/* Connector (except last step) */}
          {index < steps.length - 1 && (
            <div
              className={`absolute top-4 left-1/2 w-full border-t-2 border-dashed ${
                step.number < currentStep ? "border-orange-500" : "border-gray-300"
              }`}
             ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;

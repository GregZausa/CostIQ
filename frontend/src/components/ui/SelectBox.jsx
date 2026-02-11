import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SelectBox = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  label = '',
  disabled = false,
  className = '',
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  
  return (
    <div className={`w-full max-w-xs ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
          }`}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && !disabled && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {options.length === 0 ? (
                <div className="px-4 py-2 text-gray-500">No options available</div>
              ) : (
                options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                      value === option.value ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default SelectBox;
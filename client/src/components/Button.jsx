import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-dark text-white hover:bg-gray-800",
    secondary: "bg-brand-yellow text-brand-dark hover:bg-yellow-300",
    outline: "bg-transparent border border-gray-300 text-brand-dark hover:border-brand-dark",
    ghost: "bg-transparent text-brand-dark hover:bg-gray-100"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
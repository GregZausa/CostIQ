import React from 'react'

const ProductCardLayout = ({title, icon: Icon, children}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            {title}
          </p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500">
          <Icon size={15} />
        </div>
      </div>
      {children}
    </div>
  )
}

export default ProductCardLayout

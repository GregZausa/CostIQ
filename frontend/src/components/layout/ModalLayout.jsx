import React from 'react'

const ModalLayout = ({children, closeModal, widthStyle}) => {
  return (
    <div>
      <div
        className="z-50 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div
        className={`fixed top-1/2 left-1/2 z-60 ${widthStyle ? widthStyle : "w-96"} max-w-full bg-white/80 border border-white/20 rounded-xl 
                      shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6 hover:shadow-2xl hover:scale-102 transition-all
                      duration-300 ease-in-out text-black overflow-hidden`}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalLayout

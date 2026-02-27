import React from 'react'
import Button from '../ui/Button'

const Headers = ({title, openModal, buttonLabel}) => {
  return (
    <div>
      <div className="flex items-center text-center justify-between">
        <h1 className="font-bold text-2xl">{title}</h1>
        <Button
          label={buttonLabel}
          onClick={openModal}
          backgroundAndText={"bg-gray-800 text-white"}
        />
      </div>
    </div>
  )
}

export default Headers

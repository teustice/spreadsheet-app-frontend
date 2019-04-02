import React from 'react'
import Loader from 'react-loader-spinner'

const LoadingSpinner = (props) => {
  return (
    <div className='loading-wrapper'>
      <Loader
        type="Triangle"
        color="#000"
        height="50"
        width="50"
        />
      <p>Loading</p>
    </div>
  )
}

export default LoadingSpinner

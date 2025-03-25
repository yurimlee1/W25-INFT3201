import React from 'react'

export const Hero = () => {
  return (
    <div><section className="lg:grid lg:h-screen lg:place-content-center">
    <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-prose text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Welcome to
          <strong className="text-blue-500"> Press Start </strong>
          
        </h1>
  
        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
          Best place in Oshawa for both young and old game enthusiasts!
        </p>
  
        <div className="mt-4 flex justify-center gap-4 sm:mt-6">
          <a
            className="inline-block rounded border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            href="product"
          >
            View Products
          </a>
  
          <a
            className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            href="signup"
          >
            Join a Member
          </a>
        </div>
      </div>
    </div>
  </section></div>
  )
}

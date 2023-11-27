'use client'

function Stats () {
    return (
        <main className="flex-1 p-5">
        <h2 className="text-xl mb-5">Welcome back!</h2>
        <p>Here is an overview of your account</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <div className="p-5 border rounded-md">
            <h3 className="text-lg mb-2">Total Money</h3>
            <p>0$</p>
          </div>
          <div className="p-5 border rounded-md">
            <h3 className="text-lg mb-2">Total Engagement</h3>
            <p>0</p>
          </div>
          <div className="p-5 border rounded-md">
            <h3 className="text-lg mb-2">Total Business</h3>
            <p>0</p>
          </div>
        </div>
      </main>
    )
}

export default Stats
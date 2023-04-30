const Footer = () => {
    return (
      <footer className="bg-gray-800 mt-8">
        <div className="container mx-auto px-4 py-12 text-gray-400">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/4 lg:w-1/4">
              <h5 className="text-lg font-semibold text-gray-200 mb-4">About Us</h5>
              <p>
                Langga AI is an AI-driven healthcare platform that aims to provide users with accurate and personalized medical advice.
              </p>
            </div>
            <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/4 lg:w-1/4">
              <h5 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h5>
              <ul className="list-none">
                <li className="mb-2">
                  <a href="/" className="text-gray-400 hover:text-gray-200">Home</a>
                </li>
                <li className="mb-2">
                  <a href="/chat" className="text-gray-400 hover:text-gray-200">Chat</a>
                </li>
                <li className="mb-2">
                  <a href="/tos" className="text-gray-400 hover:text-gray-200">Syarat dan ketentuan</a>
                </li>
              </ul>
            </div>
            <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/4 lg:w-1/4">
              <h5 className="text-lg font-semibold text-gray-200 mb-4">Contact Information</h5>
              <p>
                Email: reza.busoftinc@gmail.com
                <br />
                Phone: +6281804444844
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6">
            <p className="text-sm text-center text-gray-400">
              &copy; {new Date().getFullYear()} Langga AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  export default Footer
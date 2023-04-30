import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Typewriter from "typewriter-effect";

import { api } from "~/utils/api";
import Footer from "~/components/Footer";
import { FiHeart, FiSmartphone, FiUser, FiWatch } from "react-icons/fi";

const Home: NextPage = () => {
  return (
    <>
      <Head>

        <title>Langga AI - Dokter AI Pribadi Anda</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Dapatkan rekomendasi kesehatan instan dan personal dari dokter AI kami yang canggih, memberdayakan Anda untuk mengendalikan kesejahteraan Anda." />
        <meta name="keywords" content="dokter AI, kesehatan, rekomendasi, Langga AI, konsultasi kesehatan" />
        <meta name="author" content="Langga AI" />
        
        <meta property="og:title" content="Langga AI - Dokter AI Pribadi Anda" />
        <meta property="og:description" content="Dapatkan rekomendasi kesehatan instan dan personal dari dokter AI kami yang canggih, memberdayakan Anda untuk mengendalikan kesejahteraan Anda." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://langga.erlangga.org/" />
        <meta property="og:image" content="https://langga.erlangga.org/images/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Langga AI - Dokter AI Pribadi Anda" />
        <meta name="twitter:description" content="Dapatkan rekomendasi kesehatan instan dan personal dari dokter AI kami yang canggih, memberdayakan Anda untuk mengendalikan kesejahteraan Anda." />
        <meta name="twitter:image" content="https://langga.erlangga.org/images/twitter-image.jpg" />
        
      </Head>
      <main className="bg-white">
        <Navbar />
       <div id="background" className="grid grid-cols-1 md:grid-cols-2 mt-32 px-12 gap-12">
        <div className="">
          <span className="text-border-indigo-500  p-3 border border-indigo-500 rounded-2xl mb-8">🔥 Powered By GPT 4 Machines</span>
          <p className="text-5xl font-bold text-black mt-4"><span className="text-indigo-500 font-bold">Langga AI</span> Dokter AI Pribadi Anda, <Typewriter
  
  onInit={(typewriter)=> {
  typewriter
  .typeString("Kapan Pun, ")
  .pauseFor(1000)
  .typeString("Dimana Pun")
  .start();
  }}
  /></p>
          <p className="text mt-8 mb-8 text-gray-500">
          Dapatkan rekomendasi kesehatan instan dan personal dari dokter AI kami yang canggih, memberdayakan Anda untuk mengendalikan kesejahteraan Anda.
          </p>
          <a
                href="/chat"
                className="mt-8 bg-indigo-500 text-white px-4 font-bold hover:border-black border-2 py-3 rounded-full"
              >

💬 Mulai Chat dengan Langga AI
              </a>
        </div>
        <div className="order-first md:order-last">
              
              <img className="animate__animated animate__tada animate__delay-2s animate__infinite" src="flying.jpeg" />
        </div>
       </div>
       <div className="mt-72 mx-32 ">
        <div className="rounded-2xl shadow border px-4 py-2">
          <p className="text-2xl font-bold text-center mb-4">With latest technology</p>
            <div className="grid grid-cols-2 md:grid-cols-6 items-center text-center gap-12">
            <img src="/openai.png" className="h-18 w-64" />
            <img src="/vercel.svg" className="h-32 w-32" />
            <img src="/next.svg" className="h-24 w-32" />
            <img src="/mysql.svg" className="h-24 w-32" />
            <img src="/typescript.svg" className="h-24 w-32" />
            <img src="/prisma.svg" className="h-24 w-32" />

          </div>
        </div>
       </div>
       <div className="mt-72">
        <p className="font-bold text-4xl text-center">Features</p>
        <div className="grid grid-cols-3 gap-4 mt-32 px-12">
          <div className="border px-4 py-8 rounded-3xl shadow hover:border-indigo-400">
            <p className="text-8xl text-center">⚡ </p>
            <p className="text-2xl font-bold mt-4 text-indigo-400">
            Diagnosa Cepat dan Akurat
            </p>
            <p className="text-sm text-gray-500 mt-3">
            Langga AI menggunakan teknologi AI canggih untuk menganalisis gejala dan kondisi kesehatan Anda, memberikan diagnosa yang cepat dan akurat. Dapatkan informasi yang Anda butuhkan untuk mengambil tindakan yang tepat lebih awal.
            </p>
          </div>
          <div className="border px-4 py-8 rounded-3xl shadow hover:border-indigo-400">
            <p className="text-8xl text-center"><FiUser className="mx-auto" /></p>
            <p className="text-2xl font-bold mt-4 text-indigo-400">
            Rekomendasi Perawatan Personal
            </p>
            <p className="text-sm text-gray-500 mt-3">
            Layanan dokter AI kami menawarkan rekomendasi perawatan yang disesuaikan dengan kebutuhan kesehatan Anda. Mulai dari perubahan gaya hidup hingga obat resep, dapatkan saran yang sesuai dengan keadaan dan preferensi Anda            </p>
          </div>
          <div className="border px-4 py-8 rounded-3xl shadow hover:border-indigo-400">
            <p className="text-8xl text-center"><FiWatch className="mx-auto" /></p>
            <p className="text-2xl font-bold mt-4 text-indigo-400">
            Konsultasi Kesehatan 24/7            </p>
            <p className="text-sm text-gray-500 mt-3">
            Dapatkan dukungan kesehatan kapan saja, di mana saja, dengan akses ke dokter AI Langga 24 jam sehari, 7 hari seminggu. Ajukan pertanyaan kesehatan, diskusikan gejala, atau minta saran medis kapan pun Anda memerlukan bantuan.</p>
          </div>
          <div className="border px-4 py-8 rounded-3xl shadow hover:border-indigo-400">
            <p className="text-8xl text-center"><FiSmartphone className="mx-auto"></FiSmartphone></p>
            <p className="text-2xl font-bold mt-4 text-indigo-400">
            Tersedia dalam Berbagai Platform           </p>
            <p className="text-sm text-gray-500 mt-3">
            Langga AI dapat diakses melalui perangkat dan platform yang berbeda, termasuk ponsel, tablet, dan desktop. Manfaatkan kecanggihan teknologi AI untuk menjaga kesehatan Anda di mana pun Anda berada, dengan antarmuka yang mudah digunakan dan responsif.</p>
          </div>
          <div className="border px-4 py-8 rounded-3xl shadow hover:border-indigo-400">
            <p className="text-8xl text-center"><FiHeart className="mx-auto" /></p>
            <p className="text-2xl font-bold mt-4 text-indigo-400">
            Kemudahan Akses Informasi Kesehatan          </p>
            <p className="text-sm text-gray-500 mt-3">
            Dengan Langga AI, Anda dapat mengakses informasi kesehatan yang akurat dan terpercaya dalam hitungan detik. Temukan artikel, panduan, dan sumber daya yang relevan dengan kondisi Anda, sehingga Anda dapat membuat keputusan yang lebih baik tentang perawatan dan kesejahteraan Anda.</p>
          </div>
        </div>
       </div>
      </main>
      <Footer />

    </>
  );
};

export default Home;

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Typewriter from "typewriter-effect";

import { api } from "~/utils/api";
import Footer from "~/components/Footer";
import { useState } from "react";

const Home: NextPage = () => {
  const loginAPI = api.auth.login.useMutation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  async function login() {
    loginAPI.mutateAsync({
        email, password
    }).then((data) => { 
        window.localStorage.setItem('token', data.token)
        window.location.assign('/chat')
    }).catch((err) => {
        alert(err.message)
    })
  }
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
      <Navbar />
      <main className="bg-white">
        <div className="rounded-md border p-4 mx-auto sm:max-w-lg my-32">
                {message.length > 1 ? 
                <div className="bg-danger-500 p-3 rounded-md mb-3">{message}</div> : null}
                <p className="text-3xl font-bold mb-3">Login</p>
                <hr/>
                <br/>
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="p-3 border rounded-md w-full" placeholder="email@kamu.com" type="email" required/>
                <label>Password</label>
                <input  value={password} onChange={e => setPassword(e.target.value)} className="p-3 border rounded-md w-full" placeholder="****" type="password" required/>
                <button onClick={login}  className={"bg-indigo-500 mt-4 rounded-md w-full hover:shadow text-white py-3 px-6 font-bold"}>Masuk</button>

        </div>
      </main>
      <Footer />

    </>
  );
};

export default Home;

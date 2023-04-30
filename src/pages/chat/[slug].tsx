import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Typewriter from "typewriter-effect";

import { api } from "~/utils/api";
import Modal from "~/components/Modal";
import { useEffect, useState } from "react";
import { use } from "react";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
type AiMessage = {
    role: string,
    content: string
}
const Home: NextPage = () => {
    const router = useRouter()
    const { slug } = router.query
    const [product, setProductName] = useState<string>("");
    const [modalProduct, setModalProductStatus] = useState<boolean>(false)
    const aiProduct = api.ai.product.useQuery({ name: product }, { retry: 0 });
    const historyAPI = api.ai.history.useQuery({ conversation_id: parseInt(slug as string)})
    const chatAPI = api.ai.ask.useMutation()

    const [character, setCharacter] = useState<string>("hore");
    const [agree, setAgree] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");

    const [question, setQuestion] = useState<string>("");

    const [year, setYear] = useState<number>(2001)
    async function Answer() {
        setCharacter('searching')
        chatAPI.mutateAsync(
            { conversation_id: parseInt(slug as string), text: prompt}
        ).then((res) => {
            historyAPI.refetch()
            setCharacter('hore')

        })
    }
    function renderCharacter() {
        if (character == 'hai') return <div className="">
            <img src="/hai.jpeg" className="h-96  mx-auto animate__animated animate__pulse animate__infinite" />
            <p className="text-gray-400 mt-2 text-center">tanyakan keluhan muuu~~~</p>
        </div>
        if (character == 'searching') return <div className="animate__animated animate__flipInX">
            <img src="/searching.jpeg" className="h-96  mx-auto animate__animated animate__pulse animate__infinite" />
            <p className="text-gray-400 mt-2 text-center">sedang mencari solusi...</p>
        </div>
        if (character == 'drugs') return <div className="animate__animated animate__flipInX">
        <img src="/drugs.jpeg" className="h-96  mx-auto animate__animated animate__pulse animate__infinite" />
        <p className="text-gray-400 mt-2 text-center">ini obat kamu yaa.</p>
    </div>

        if (character == 'hore') return <div className="animate__animated animate__flipInX">
        <img src="/hore.jpeg" className="h-96  mx-auto animate__animated animate__pulse animate__infinite" />
        <p className="text-gray-400 mt-2 text-center">yay</p>
        </div>

    }
    const startConversation = async () => {
        setCharacter("searching")
    }
    const askProduct = (name : string) => {
        setProductName(name)
        setModalProductStatus(true)
        setCharacter("drugs")
    }
    const parserChat = (message: string) => {
        let msgs = message.split(" ")

        let content = msgs.map(msg => {
            if (msg.startsWith("{{")) {
                let productName = msg.replace('{{', '').replace('}}', '')
                return <button className="text-blue-500" onClick={() => { askProduct(productName) }}>{productName}</button>
            }
            return msg + " "
        })
        return <div>{content}</div>
    }
    const renderChat = () => {
        let messages:any [] = []
        historyAPI.data?.messages.forEach((ai) => {
            if (ai.role == "assistant") {
                messages.push(<div className="border p-3 col-span-5 rounded-2xl text-gray-800"><b>[Langga]</b> {parserChat(ai.content)}</div>)
                messages.push(<div></div>)
            } else {
                messages.push(<div></div>)
                messages.push(<div className="border p-3 col-span-5 rounded-2xl text-gray-800">
                    <b>[{historyAPI.data.conversation?.name}]</b>
                    {parserChat(ai.content)}</div>)
            }
        })
        return <div className="grid grid-cols-6 px-3 gap-4 mt">{messages}</div>
    }
    const renderProduct = () => {
        if (aiProduct.isLoading) return <center>
            <div className="my-4" role="status">
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
        </center>
        if (aiProduct.data == null || aiProduct.data == undefined) return <p>Tidak dapat menemukan produk ini</p>


        return <div className="gap-4">

            <div>
                <b>Nama Obat</b>
                <p>{product}</p>
                <b>Deskripsi</b>
                <p className="text-gray-600 text-xs">{aiProduct.data.description}</p>
            </div>
            <b>Rekomendasi Obat</b>
            <div className="grow grid grid-cols-2">
                {aiProduct.data.products.map(p => <a key={p.url} href={p.url} target="_blank" className="block flex gap-2 items-center border rounded-lg px-3 py-1 m-2">
                    <img src={p.image_url} className="h-24 w-24" />
                    <p className=""><span className="text-xs text-gray-500">({p.store})</span> {p.name}</p>
                    <p className="font-bold">Rp{p.price.toLocaleString()}</p>
                </a>)}
            </div>

        </div>
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
            <Modal isOpen={modalProduct} title={"Obat Detail"}>
                {renderProduct()}
                <hr />
                <button onClick={() => setModalProductStatus(false)} className={"bg-indigo-500 mt-4 rounded-md w-full hover:shadow text-white py-3 px-6 font-bold"}>Tutup</button>
            </Modal>
            <main className="bg-white pb-32">


                <div className="grid md:grid-cols-12 mt-8 px-4 md:mt-32 md:px-12 gap-12">
                    <div className="md:col-span-4"> {renderCharacter()}</div>
                    <div className="border-indigo-500 md:col-span-8 border-2 rounded-2xl  pb-6">

                        <div className=" p-3">

                            <p className="text-indigo-500  float-left text-3xl font-bold">Langga AI</p>
                            <span className="text-white text-xs float-right p-3 bg-indigo-500 rounded-md mb-8">🔥 Powered By GPT 4 Machines</span>

                        </div>


                        

                            <div className="max-h-96 px-3 mt-24 overflow-auto">{renderChat()}</div>


                        <div className="p-3">
                            <div className="flex gap-8">
                                <input className="p-3 grow border-indigo-500 border rounded-md" value={prompt} onChange={e => setPrompt(e.target.value)} type="text" />
                                {character == "searching" ? <div className="mt-2" role="status">
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div> : <button className="bg-indigo-500 rounded-full text-white py-3 px-6 font-bold" onClick={Answer}>Kirim 💬</button> }
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />

        </>
    );
};

export default Home;

import { useEffect, useState } from "react"
import Nav from "../components/navbar"
import httpAuth from "../utils/http"
import { Spinner } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";
import Blog from "../components/Blog";
import Login from "../components/login";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Chatbox from "../components/chatbox";


function Home() {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [blog, setBlog] = useState(false)
    const [chatbox, setChartBox] = useState(false)




    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                setLoggedIn(true)
                setOpen(false)
            } catch (error) {
                console.error('Invalid token:', error)
                setLoggedIn(false)
                setOpen(true)
                localStorage.removeItem('token')
            }
        }
        else {
            setOpen(true)
        }
    }, [])
    const handleOpen = () => setOpen(!open);


    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setOpen(true)
        setLoggedIn(false);
        localStorage.removeItem('token');
    };

    const GetCryptoData = async () => {
        setLoading(true)

        try {
            const res = await httpAuth.get(
                `/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tron,binancecoin`,
                {
                    params: {
                        vs_currency: 'usd',
                        days: 1,
                        interval: '1m',
                    }
                }
            )

            const data = res.data;
            console.log(data)

            const updatedData = Object.entries(data).map(([id, { current_price, image, name, price_change_24h
                , price_change_percentage_24h
            }]) => {
                return {
                    id,
                    currentPrice: current_price,
                    hourlyPriceChange: 0,
                    image,
                    name,
                    price_change_24h: current_price - price_change_24h,
                    price_change_percentage_24h
                }
            })

            setCrypto(updatedData);
            setLoading(false)

        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        GetCryptoData()

        const interval = setInterval(() => {
            GetCryptoData()
        }, 60000)
        return () => clearInterval(interval);

    }, []);

    const handleReadmore = () => {
        setBlog(!blog)
    }

    const handleChatBox = () => {
        setChartBox(!chatbox)
    }










    useEffect(() => {
        const loadBrevoConversationsScript = () => {
            window.BrevoConversationsID = '657311b2adb20f661378cb67';
            window.BrevoConversations = window.BrevoConversations || function () {
                (window.BrevoConversations.q = window.BrevoConversations.q || []).push(arguments);
            };

            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';

            if (document.head) {
                document.head.appendChild(script);
            }
        };

        loadBrevoConversationsScript();
    }, []);



















    return (
        < div className="bg-cover relative bg-center h-screen ">













            <Nav handleLogout={handleLogout} handleLogin={handleLogin} handleOpen={handleOpen} />
            <Login open={open} setOpen={setOpen} handleOpen={handleOpen} />


            <div className="text-center text-[#9eb1b4] mt-9 p-2 xl:p-0 ">
                <h1 >Latest Blog Post: Exploring Cryptocurrency Trends</h1>
                <p className="text-sm p-2">Stay informed about the latest trends and developments in the cryptocurrency world.</p>
                <button className="btn btn-primary p-2 mt-2 hover:bg-white hover:text-[#ce6e55] ">
                    <Link onClick={handleReadmore} className=" " >{blog ? "show less" : "Readmore"} {blog ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}</Link>
                </button>
            </div>
            {blog && <Blog setBlog={setBlog} />}
            {loading && <span className="flex justify-center mt-24"><Spinner /></span>}


            <div className="  flex flex-wrap mt-10 justify-center xl:m-auto xl:gap-8 xl:mt-12 mb-[300px] gap-6">
                {!loading && crypto.map((cryp) => (
                    <div key={cryp.id} className="relative mb-24 xl:mb:0   hover:-translate-y-1 hover:scale-110  duration-300 ">
                        <h1 className="text-center text-[#9eb1b4] font-bold mb-2">{cryp.name}</h1>
                        <div className="rounded-lg  text-white  crypto-widget     ">
                            <div className=" xl:w-[250px] xl:h-[300px] w-[150px] h-[250px]  md:w-[250px] md:h-[250px]">
                                <div className="flex  justify-center md:pt-3 xl:p-2">
                                    <div className="  rounded-t-lg xl:h-[150px]  w-[150px] flex justify-center mt-2 xl:mt-10">
                                        <img src={cryp?.image} className=" w-[100px] h-[100px]" alt="" />
                                    </div></div>

                                <div className="md:mt-12 ">
                                    <div className="p-2 ">
                                        <h2 className="mt-2">Current price:  ${cryp?.currentPrice.toFixed(0)}</h2>
                                        <h2 className="mt-2">Prev price/hr: ${cryp?.price_change_24h.toFixed(0)}
                                        </h2>
                                        <div className="absolute  bottom-[-18px] right-[-18px] p-3 mt-2 text-black   ">
                                            <div className="w-[50px] h-[50px] rounded-full bg-white  flex justify-center items-center mt-2">
                                                <h3>{cryp?.price_change_percentage_24h?.toFixed(2)}%</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                ))}




            </div>



            <footer className="fixed flex items-center justify-center gap-4   w-full bottom-0">

                <p>&copy; 2023 CryptoCurrency Tracker</p>

            </footer>



        </div>
    )

}
export default Home
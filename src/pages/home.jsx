import { useEffect, useState } from "react"
import Nav from "../components/navbar"
import httpAuth from "../utils/http"
import { Spinner } from "@material-tailwind/react";
// import Login from "../components/login";
import { Link, Outlet } from "react-router-dom";
import Blog from "../components/Blog";

function Home() {
    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [blog, setBlog] = useState(false)
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
                    price_change_24h,
                    price_change_percentage_24h

                };
            });

            setCrypto(updatedData);
            setLoading(false)

        } catch (error) {
            console.error(error);
        }
    };

    const GetHistory = async () => {
        setLoading(true)

        try {
            const res = await httpAuth.get(
                `/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=daily`

            );
            const prevPrices = res.data.prices;
            console.log(res.data.prices)

            const currentTime = new Date().getTime()

            const updatedprice = crypto.map((prices) => {
                const PrevHourPrice = prices.find(
                    (p) => currentTime - p[0] <= 60 * 60 * 1000
                )
                console.log(updatedprice)
                const hourlyPriceChange =
                    PrevHourPrice && prices.currentPrice !== undefined ? ((prices.currentPrice - PrevHourPrice[1]) / PrevHourPrice[1]) * 100
                        : 0
                return {
                    ...prices,
                    hourlyPriceChange,
                };
            });
            setCrypto(updatedprice)

        } catch (error) {
            console.error(error)
        }
    };


    useEffect(() => {
        GetCryptoData()

        const interval = setInterval(() => {
            GetCryptoData()
        }, 60000)
        return () => clearInterval(interval);

    }, []);

    const handleBlog = () => {
        setBlog(true)
    }





    return (
        < div className="bg-cover relative bg-center h-screen ">
            <Nav />


            {blog && <Blog setBlog={setBlog} />}
            <div className="text-center text-[#ffffff] mt-9 p-2 xl:p-0">
                <h1>Latest Blog Post: Exploring Cryptocurrency Trends</h1>
                <p className="text-sm p-2">Stay informed about the latest trends and developments in the cryptocurrency world.</p>
                <button className="btn btn-primary p-2 mt-2 ">
                    <Link to={`/Home/blog`} className="hover:text-black" > Readmore</Link>
                </button>
            </div>
            <Outlet />
            {loading && <span className="flex justify-center mt-24"><Spinner /></span>}


            <div className="  flex flex-wrap justify-center  gap-5 mt-9 mb-24 ">
                {!loading && crypto.map((cryp) => (
                    <div key={cryp.id} className="relative  hover:-translate-y-1 hover:scale-110  duration-300 ">
                        <h1 className="text-center text-[#9eb1b4] font-bold mb-2">{cryp.name}</h1>
                        <div className="rounded-lg  text-white  crypto-widget     ">
                            <div className=" w-[250px] h-[300px] ">
                                <div className="flex justify-center p-2">
                                    <div className=" rounded-t-lg h-[150px] w-[150px] flex justify-center mt-10">
                                        <img src={cryp?.image} className=" w-[100px] h-[100px]" alt="" />
                                    </div></div>

                                <div className=" ">
                                    <div className="p-2 just">
                                        <h2 className="mt-2">Current price: ${cryp?.currentPrice.toFixed(2)}</h2>
                                        <h2 className="mt-2">Prev price/hr: ${cryp?.price_change_24h.toFixed(2)}
                                        </h2>
                                        <div className="absolute  bottom-[-18px] right-[-18px] p-3 mt-2 text-black">
                                            <div className="w-[50px] h-[50px] rounded-full bg-white   flex justify-center items-center mt-2">
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

            <div className="crypto-list">
                <h2>Crypto Price List</h2>
                <ul id="crypto-price-list"></ul>
            </div>


            <footer>

                <p>&copy; 2023 CryptoCurrency Tracker</p>
            </footer>

            <button className="talk-to-expert">Talk to Expert</button>

        </div>
    )

}
export default Home
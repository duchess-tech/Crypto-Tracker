import { useState } from "react";
import httpAuth from "../utils/http";
import { useEffect } from "react";
import { data } from "autoprefixer";
import { Spinner } from "@material-tailwind/react";

function Blog() {
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCryptoNews = async () => {
            setLoading(true)
            try {
                const response = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`)
                }
                const res = await response.json()
                console.log(res.Data)
                setNewsData(res.Data)
                setLoading(false)

            } catch (error) {
                console.error('Error fetching news')
                setLoading(false)
            }
        }
        fetchCryptoNews();

    }, [])

    const truncate = (string, limit) => {
        let dots = "..."
        if (string.length > limit) {
            string = string.substring(0, limit) + dots
        }
        return string
    }

    return (
        <>

            {loading && <span className="flex justify-center mt-24"><Spinner /></span>}

            <div className="flex w-11/12 gap-6 p-12 m-auto overflow-auto removeScrollbar animate-pop-up">
                {!loading && newsData.map((news) => (

                    <a href={news.url}>
                        <div key={news.id} className="text-white  blog-case p-3">

                            <div className="w-[160px] h-[150px]   rounded-xl ">
                                <img src={news.imageurl} alt="" />
                            </div>

                            <div className="mt-3">
                                <h1 className="text-md font-bold"> {news.source}</h1>
                                <p className="text-sm text-[#9cafb3]">{truncate(news.body, 50)}</p>
                            </div>

                        </div>

                    </a>
                ))

                }
            </div>
        </>




    )
}
export default Blog

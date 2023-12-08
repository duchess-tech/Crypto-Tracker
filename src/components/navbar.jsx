import { Link } from "react-router-dom"

function Nav({ handleLogout, handleOpen }) {

    return (<>
        <nav className=" bg-[#8096ac]  flex   flex-wrap   xl:p-3 xl:flex">
            <header className="blogname ml-24  text-center xl:m-auto  md:m-auto p-3   xl:p-2">
                <div className="xl:text-2xl  text-lg  font-bold">
                    <Link to={"/Home"} className="flex"> <span>Crypt</span><img src="/images/bitcoin2.jpg" alt="" className="w-[30px] animate-bounce" /><span>CurrencyTracker</span> </Link>
                </div>
            </header>





        </nav>



        <div className="flex pt-2 gap-6 text-sm xl:text-md   text-[#ffffff]     xl:justify-center xl:gap-32 justify-center   items-center">
            <button className="hover:border-b-2 border-b-white hover:p-2 hover:animate-pulse"><Link>About</Link></button>
            <button className="hover:border-b-2 border-b-white hover:p-2 hover:animate-pulse   " ><Link>Contact</Link></button>

            <button className="hover:border-b-2 border-b-white hover:p-2 hover:animate-pulse">
                <Link>Services</Link>
            </button>
            <button className="hover:border-b-2 border-b-white hover:p-2 hover:animate-pulse" >
                <Link>Learn</Link>
            </button>
            <button className="hover:border-b-2 border-b-white hover:p-2 hover:animate-pulse" onClick={handleLogout}><Link>Signout</Link></button>


        </div>



    </>
    )
}
export default Nav

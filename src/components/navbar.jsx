import { Link } from "react-router-dom"

function Nav() {






    return (<>
        <nav className=" xl:flex xl:justify-around items-center  flex-wrap bg-white  xl:p-3 flex">
            <header className="blogname w-full  xl:w-2/5 p-2 xl:p-0 text-center">
                <div className="xl:text-2xl text-lg  font-bold">

                    <Link to={"/Home"} className="flex"> <span>Crypt</span><img src="./src/images/coinfinal.png" alt="" className="w-[30px]" /><span>CurrencyTracker</span> </Link>
                </div>
            </header>


            <div className="flex xl:w-1/5 w-full  xl:justify-between text-black    font-bold  gap-4 mt-3 xl:text-md text-md hover:text-[#ffffff]">
                <button ><Link>About</Link></button>
                <button ><Link>Contact</Link></button>

                <button >
                    <Link>Login</Link>
                </button>
                <button >
                    <Link>Learn</Link>
                </button>


            </div>

        </nav></>
    )
}
export default Nav

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarOne from "../../components/navbar/navbar-one";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";
import AccountTab from "../../components/account/account-tab";
import bg from '../../assets/img/shortcode/breadcumb.jpg';
import { RiShoppingBag2Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Aos from "aos";
import API from "@/components/utils/auth/axiosInterceptor";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/store/cartThunks";
import { getUserIdFromToken } from "@/components/utils/auth/tokenUtils";

export default function Wishlist() {
    const [wishProducts, setWishProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        Aos.init();
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await API.get('http://localhost:8080/api/public/products?limit=6');
            if (res.data && res.data.params) {
                setWishProducts(res.data.params.content || res.data.params);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (item: any) => {
        const userId = getUserIdFromToken() || 1;
        const productId = item.productId || item.id || 1;
        dispatch(addItemToCart({ userId, productId, quantity: 1, price: item.price || 25 }));
        toast.success(`Added "${item.productName || item.name}" to cart!`);
    };

    const handleRemoveWish = (id: number) => {
        setWishProducts(prev => prev.filter(p => (p.productId || p.id) !== id));
        toast.success("Removed from wishlist");
    };

  return (
    <>
        <NavbarOne/>

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Wishlist</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">wishlist</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                    <div className="w-full md:w-[200px] lg:w-[300px] flex-none" data-aos="fade-up" data-aos-delay="100">
                        <AccountTab/>
                    </div>
                    <div className="w-full md:w-auto md:flex-1" data-aos="fade-up" data-aos-delay="300">
                        {loading ? (
                            <p className="text-slate-500">Loading wishlist...</p>
                        ) : wishProducts.length === 0 ? (
                            <p className="text-slate-500">Your wishlist is currently empty.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg::gap-8">
                                {wishProducts.map((item, index) => {
                                    const imageBasePath = "../../../assets/img/gallery/product/";
                                    const imgSrc = item.image ? item.image : (item.thumbnailImage ? `${imageBasePath}${item.thumbnailImage}` : '');
                                    return (
                                        <div className="group" key={item.productId || index}>
                                            <div className="relative overflow-hidden group z-[5] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-title before:opacity-0 before:duration-300 before:z-[5] hover:before:opacity-80 rounded-xl bg-slate-200">
                                                {imgSrc ? (
                                                    <img className="w-full transform duration-300 group-hover:scale-110" src={imgSrc} alt="product-card"/>
                                                ) : (
                                                    <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-semibold text-slate-500">{item.productName}</div>
                                                )}

                                                <div className="absolute z-10 top-1/2 left-1/2 transform -translate-y-2/4 -translate-x-2/4 flex gap-2">
                                                    <button onClick={() => handleAddToCart(item)} className="w-9 lg:w-12 h-9 p-2 lg:h-12 bg-white dark:bg-title bg-opacity-80 rounded-full flex items-center justify-center hover:bg-primary transition-all">
                                                        <RiShoppingBag2Line className="text-title dark:text-white hover:text-white size-6"/>
                                                    </button>
                                                    <button onClick={() => handleRemoveWish(item.productId || item.id)} className="w-9 lg:w-12 h-9 p-2 lg:h-12 bg-white dark:bg-title bg-opacity-80 rounded-full flex items-center justify-center hover:bg-red-500 transition-all">   
                                                        <FaHeart className="text-[#F0264A] size-6"/>   
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="lg:pt-7 pt-5 flex gap-3 md:gap-4 flex-col">
                                                <h4 className="font-medium leading-none dark:text-white text-lg">${item.price}</h4>
                                                <div>
                                                    <h5 className="font-normal dark:text-white text-xl leading-[1.5]">
                                                        <Link to={`/product-details/${item.slug || item.productId}`} className="text-underline">{item.productName || item.name}</Link>
                                                    </h5>
                                                    <ul className="flex items-center gap-2 mt-1">
                                                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                                                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                                                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                                                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                                                        <li><GoStarFill className='text-slate-300 size-4'/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>
    </>
  )
}

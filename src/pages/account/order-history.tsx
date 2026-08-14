import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarOne from '../../components/navbar/navbar-one';
import bg from '../../assets/img/shortcode/breadcumb.jpg';
import AccountTab from '../../components/account/account-tab';
import FooterOne from '../../components/footer/footer-one';
import ScrollToTop from '../../components/scroll-to-top';
import Aos from 'aos';
import API from '@/components/utils/auth/axiosInterceptor';

export default function OrderHistory() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        Aos.init();
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await API.get('http://localhost:8080/api/admin/orders');
            if (res.data && res.data.params) {
                const list = res.data.params.content || res.data.params;
                setOrders(Array.isArray(list) ? list : []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <NavbarOne/>   

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Order History</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">History</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                    <div className="w-full md:w-[200px] lg:w-[300px] flex-none" data-aos="fade-up" data-aos-delay="100">
                        <AccountTab/>
                    </div>
                    <div className="w-full md:w-auto md:flex-1 overflow-auto" data-aos="fade-up" data-aos-delay="300">
                        <div className="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-8 lg:p-[50px] order-history-table rounded-xl">
                            {loading ? (
                                <p className="text-slate-500">Loading order history...</p>
                            ) : orders.length === 0 ? (
                                <p className="text-slate-500 py-4">No order history found.</p>
                            ) : (
                                <ul className="order-history">
                                    <li className="title flex items-center justify-between gap-5 pb-[10px] sm:pb-5 border-b border-bdr-clr dark:border-bdr-clr-drk">
                                        <span className="cart-product-title text-lg md:text-xl font-semibold leading-none text-title dark:text-white block w-[270px] sm:w-[310px] xl:w-[330px]">Order Details</span>
                                        <span className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white w-[100px]">Total Price</span>
                                        <span className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white w-[100px]">Status</span>
                                    </li>
                                    {orders.map((item, index) => {
                                        return (
                                            <li className="flex items-center justify-between gap-5 py-[15px] sm:py-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk" key={item.orderId || index}>
                                                <div className="flex items-center gap-3 md:gap-4 lg:gap-6 ordered-product w-[270px] sm:w-[310px] xl:w-[330px]">
                                                    <div className="flex-1">
                                                        <span className="text-[14px] font-mono text-primary font-medium block">#{item.orderCode || item.orderId}</span>
                                                        <h5 className="font-semibold leading-none mt-1 text-slate-800 dark:text-white">
                                                            Purchased: {item.datePurchase ? new Date(item.datePurchase).toLocaleDateString() : 'N/A'}
                                                        </h5>
                                                    </div>
                                                </div>

                                                <span className="text-base md:text-lg leading-none text-title dark:text-white font-semibold text-left w-[100px]">${item.totalPrice || item.price || 0}</span>

                                                <div className="w-[100px]">
                                                    <span className="bg-[#31A051] py-[7px] px-[10px] font-semibold leading-none text-white text-xs rounded inline-block">
                                                        {item.statusName || item.status || 'Completed'}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>
    </>
  )
}

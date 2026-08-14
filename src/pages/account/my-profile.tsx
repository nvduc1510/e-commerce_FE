import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarOne from "../../components/navbar/navbar-one";
import bg from '../../assets/img/shortcode/breadcumb.jpg';
import AccountTab from "../../components/account/account-tab";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";
import { LuMail, LuMapPin, LuPhoneCall } from "react-icons/lu";
import Aos from "aos";
import API from "@/components/utils/auth/axiosInterceptor";

export default function MyProfile() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        Aos.init();
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const res = await API.get('http://localhost:8080/api/user/me');
            if (res.data && res.data.params) {
                setProfile(res.data.params);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <NavbarOne/>

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">My Profile</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Profile</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                    <div className="w-full md:w-[200px] lg:w-[300px] flex-none" data-aos="fade-up" data-aos-delay="100">
                        <AccountTab/>
                    </div>
                    <div className="w-full md:w-auto md:flex-1 overflow-auto">
                        <div className="w-full max-w-[951px] bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-8 lg:p-[50px] rounded-xl">
                            {loading ? (
                                <p className="text-slate-500">Loading profile...</p>
                            ) : (
                                <>
                                    <div data-aos="fade-up" data-aos-delay="200">
                                        <h3 className="font-semibold leading-none text-2xl dark:text-white">{profile?.fullName || profile?.username || 'User Profile'}</h3>
                                        <span className="leading-none mt-3 text-primary font-medium block">
                                            Role: {Array.isArray(profile?.role) ? profile?.role.join(', ') : (profile?.role || 'Customer')}
                                        </span>
                                    </div>
                                    <p className="text-base sm:text-lg mt-5 sm:mt-8 md:mt-10 text-slate-600 dark:text-gray-300" data-aos="fade-up" data-aos-delay="300">
                                        Welcome to your account profile dashboard! Here you can review your registered contact information, manage orders, and check account preferences.
                                    </p>
                                    <div className="mt-5 sm:mt-8 md:mt-10 grid gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="400">
                                        <div className="flex items-center gap-3">
                                            <LuPhoneCall className="text-primary size-5 flex-none"/>
                                            <span className="leading-none font-medium text-base sm:text-lg dark:text-white">{profile?.phone || 'No phone provided'}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <LuMail className="text-primary size-5 flex-none"/>
                                            <span className="leading-none font-medium text-base sm:text-lg dark:text-white">{profile?.email || 'No email provided'}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <LuMapPin className="text-primary size-5 flex-none"/>
                                            <span className="leading-none font-medium text-base sm:text-lg dark:text-white">{profile?.address || 'No address registered'}</span>
                                        </div>
                                    </div>
                                </>
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

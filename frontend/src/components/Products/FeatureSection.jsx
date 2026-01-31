import { HiShoppingBag, HiOutlineCreditCard } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";



const FeatureSection = () => {
  return (
    <section>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

         {/* Feature 1  */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounde-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">FREE INTERNATIONAL SHIPPING</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            On All Order Above $100.0
          </p>
        </div>

         {/* Feature 2  */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounde-full mb-4">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">45 DAYS RETURN</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money Back Guarantee
          </p>
        </div>

        {/* Feature 3  */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounde-full mb-4">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secured checkout Process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

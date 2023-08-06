import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai"; // shopping icon

import { Cart } from "@/components";
import { useStateContext } from "@/context/StateContext";

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="flex justify-between items-center px-4 py-3">
      <p className="logo">
        <Link href="/" className="font-bold text-4xl uppercase ">
          Arch
        </Link>
      </p>

      <div className="flex items-center gap-8">
        <Link href={"/product"} className="font-semibold text-lg">
          Products
        </Link>
        <button
          type="button"
          className="cart-icon"
          // open the cart when the user clicks on the cart icon
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {/* only show the cart when user clicks on the cart icon above */}
      {showCart && <Cart />}
    </div>
  );
}

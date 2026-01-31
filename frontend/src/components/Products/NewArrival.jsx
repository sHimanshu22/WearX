import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useRef, useState } from 'react';

const NewArrival = () => {
  const scrollRef = useRef(null);
  const [isDragging , setIsDragging] = useState(false);
  const [stratX ,setStartX] = useState(0);
  const [scrollLeft , setScrollLeft] = useState(0); // FIX: boolean → number
  const [canScrollleft , setCanScrollLeft] = useState(false);
  const [canScrollright , setCanScrollRight] = useState(true);

  const newArrival = [
    {
      _id: "1",
      name: "Style Jackets",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish jackets" }],
    },
    {
      _id: "2",
      name: "Denim Blue Jacket",
      price: 150,
      images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Denim blue jacket" }],
    },
    {
      _id: "3",
      name: "Winter Leather Jacket",
      price: 220,
      images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Leather winter jacket" }],
    },
    {
      _id: "4",
      name: "Casual Hoodie Jacket",
      price: 90,
      images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Casual hoodie jacket" }],
    },
    {
      _id: "5",
      name: "Bomber Jacket",
      price: 180,
      images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Stylish bomber jacket" }],
    },
    {
      _id: "6",
      name: "Formal Blazer Jacket",
      price: 250,
      images: [{ url: "https://picsum.photos/500/500?random=6", altText: "Formal blazer jacket" }],
    },
    {
      _id: "7",
      name: "Puffer Winter Jacket",
      price: 200,
      images: [{ url: "https://picsum.photos/500/500?random=7", altText: "Puffer winter jacket" }],
    },
    {
      _id: "8",
      name: "Track Sports Jacket",
      price: 110,
      images: [{ url: "https://picsum.photos/500/500?random=8", altText: "Sports track jacket" }],
    },
    {
      _id: "9",
      name: "Vintage Corduroy Jacket",
      price: 170,
      images: [{ url: "https://picsum.photos/500/500?random=9", altText: "Vintage corduroy jacket" }],
    },
  ];

  const handleMouseDown = (e) =>{
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }

  const handleMouseMove = (e) => {
    if(!isDragging) return;
    const x = e.pageX -scrollRef.current.offsetLeft;
    const walk = x - stratX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth", // FIX: behaviour → behavior
    });
  };

  // Update Scroll Buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth; // FIX

      setScrollLeft(leftScroll);
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }

    console.log({
      scrollLeft: container.scrollLeft,
      clientWidth: container.clientWidth,
      containerScrollWidth: container.scrollWidth, // FIX
      offsetLeft: scrollRef.current.offsetLeft
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons); // FIX
      updateScrollButtons();
      return () => container.removeEventListener("scroll" , updateScrollButtons);
    }

  }, []);

  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest style straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollleft}
            className={`p-2 rounded border ${
              canScrollleft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")} // FIX: missing handler
            disabled={!canScrollright}
            className={`p-2 rounded border ${
              canScrollright
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}

      >
        {newArrival.map((product) => (
          <div
            key={product._id} // FIX
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative" // FIX
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable ='false'
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;

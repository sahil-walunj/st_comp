import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import Tile from './Tile'
import "../app.css";
function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("snacks");
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false); // State to control search box visibility
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
    const brands = ["Dabur", "Nivea", "Lay's", "Tata", "Aashirwad"];
    const limit = 25;
    const headers = {
        'Authorization': localStorage.getItem('token')
    };
    
    useEffect(() => {
        fetchData("snacks", 0);
    }, []);
  
    const fetchData = async (section, offsetParam) => {
        if (isFetching || !hasMore) return;
        setIsFetching(true);
        try {
        const response = await fetch(
            `https://scout-81lm.onrender.com/products/${section}?limit=${limit}&skip=${offsetParam}`,{ headers }
        );
        if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
        const result = await response.json();
        if (result.length < limit) setHasMore(false);
        setData((prevData) => [...prevData, ...result]);
        setOffset((prevOffset) => prevOffset + limit);
        } catch (error) {
        console.error("Error fetching data:", error);
        } finally {
        setIsFetching(false);
        }
    };
  
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setSelectedBrand("");
        setSearchQuery(""); // Clear the search query when changing sections
        setData([]);
        setHasMore(true);
        setOffset(0);
        fetchData(section, 0);
        setShowSidebar(false);
    };
  
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 50) {
        fetchData(activeSection, offset);
        }
    };
  
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection, offset, hasMore]);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputValue) return;
        setSearchQuery(inputValue); // Save the search query
        try {
        const response = await fetch(`https://scout-81lm.onrender.com/products/search?q=${inputValue}`,{ headers });
        const result = await response.json();
        setData([
            ...result.vegetables,
            ...result.fruits,
            ...result.snacks,
            ...result.seasonals,
            ...result.bodys,
            ...result.attas,
        ]);
        setShowSearchBox(false); // Hide the search box after submitting
        } catch (error) {
        console.error("Error fetching search data:", error);
        }
    };
  
    const handleBrandSearch = async (brand) => {
        setSelectedBrand(brand);
        setSearchQuery(brand); // Save the brand as the search query
        try {
        const response = await fetch(`https://scout-81lm.onrender.com/products/search?q=${brand}`,{ headers });
        const result = await response.json();
        setData([
            ...result.vegetables,
            ...result.fruits,
            ...result.snacks,
            ...result.seasonals,
            ...result.bodys,
            ...result.attas,
        ]);
        } catch (error) {
        console.error("Error fetching brand data:", error);
        }
    };
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    return (
<div className="app-container">
      <nav className="navbar flex justify-between items-center bg-[#212529] text-white py-4 px-6 fixed top-0 left-0 right-0 z-10">
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-2">
          <i className="fa fa-bars text-white"></i>
          </button>
          <h1 className="text-[1.5rem] px-3 font-bold text-[#CED4DA] flex-grow text-left"> Scout </h1>

          <div className="flex items-center ml-auto">
          {!showSearchBox && (
              <button onClick={() => setShowSearchBox(true)} className="search-button bg-[#212529] text-white p-2 rounded">
              <i className="fa fa-search"></i>
              </button>
          )}

          {showSearchBox && (
              <form onSubmit={handleSubmit} className="search-form flex items-center space-x-2 ml-2">
              <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="search-input p-1 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-[#56626D]"
                  placeholder="Search..."
              />
              <button type="submit" className="search-submit bg-[#212529] text-white p-2 rounded">
                  <i className="fa fa-search"></i>
              </button>
              </form>
          )}
          </div>
      </nav>

      <div className="flex mt-20">
          <aside className={`sidebar bg-gray-100 p-4 overflow-auto fixed top-24 left-0 h-full z-10 transition-all duration-300 lg:w-1/4 w-full ${showSidebar ? "block" : "hidden"}`}>
          <ul>
              {["vegetables", "fruits", "seasonal", "snacks", "atta", "body"].map((section) => (
              <li key={section}
                  className={`cursor-pointer py-2 px-4 ${activeSection === section ? "bg-[#56626D] text-white" : ""}`}
                  onClick={() => handleSectionChange(section)}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
              </li>
              ))}
              <li className="brand-dropdown-container">
              <button onClick={() => setShowDropdown(!showDropdown)} className="brand-dropdown-button w-full py-2 px-4 bg-gray-200 text-black text-left">
                  Search by Brand
              </button>
              {showDropdown && (
                  <ul className="brand-dropdown list-none bg-white border border-gray-300 rounded mt-2">
                  {brands.map((brand, index) => (
                      <li key={index} onClick={() => { handleBrandSearch(brand); setShowSidebar(false); }} className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                      {brand}
                      </li>
                  ))}
                  </ul>
              )}
              </li>
              <li className="cursor-pointer py-2 px-4 text-red-600 hover:bg-gray-200" onClick={handleLogout}>
                  Logout
              </li>
          </ul>
          </aside>

          <main className="main-content flex-1 p-4 lg:w-3/4 ml-auto">
          <h2 className="text-xl text-[#ffffff] font-bold mb-4">
              {searchQuery ? `Search Results for: ${searchQuery}` : selectedBrand || activeSection}
          </h2>
          <div className="px-7 tiles-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.map((item, index) => <Tile key={index} item={item} />)}
          </div>
          {isFetching && <p>Loading more...</p>}
          {!hasMore && <p>No more items to load.</p>}
          </main>
      </div>
      </div>
    )

}

export default Home

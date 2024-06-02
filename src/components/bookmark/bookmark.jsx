  import React, { useState, useRef, useEffect } from "react";
  import { v4 as uuidv4 } from "uuid";
  import { FaTrash } from "react-icons/fa";
  import { FiPlusCircle } from "react-icons/fi";

  const Bookmark = () => {
    const [bmTitle, setBmTitle] = useState("");
    const [bmLink, setBmLink] = useState("");
    const [BookMarks, setBookMarks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);

    const addBookmark = (e) => {
      e.preventDefault();
      setBookMarks((prevBookMarks) => [
        ...prevBookMarks,
        {
          id: uuidv4(),
          bmTitle: bmTitle,
          bmLink: bmLink,
        },
      ]);
      setBmTitle("");
      setBmLink("");
      setShowForm(false);
    };

    const deleteBookMark = (id) => {
      setBookMarks((prevBookMarks) => prevBookMarks.filter((bm) => bm.id !== id));
    };

    const openForm = () => {
      setShowForm(true);
    };

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    useEffect(() => {
      if (showForm) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };  
    }, [showForm]);

    useEffect(() => {
      try {
        const json = localStorage.getItem("BookMarks");
        const loadedBookmarks = JSON.parse(json);
        if (loadedBookmarks) {
          setBookMarks(loadedBookmarks);
        }
      } catch (error) {
        console.error("Error loading bookmarks from local storage:", error);
      }
    }, []);

    useEffect(() => {
      try {
        const json = JSON.stringify(BookMarks);
        localStorage.setItem("BookMarks", json);
      } catch (error) {
        console.error("Error saving bookmarks to local storage:", error);
      }
    }, [BookMarks]);
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {showForm && (
          <section
            ref={formRef}
            className="bg-[#53b4e4] p-4 rounded-xl max-w-md z-20 relative shadow-2xl border-[#e5f6fe] border-2"
          >
            <div>
              <form onSubmit={addBookmark} className="text-[#d9ecf6]">
                <div className="mb-3">
                  <label htmlFor="bmTitle">Title</label>
                  <input
                    type="text"
                    id="bmTitle"
                    className="ml-2 p-1 border-b focus:bg-transparent focus:border-none text-white bg-transparent"
                    value={bmTitle}
                    onChange={(e) => setBmTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bmLink">URL</label>
                  <input
                    type="text"
                    id="bmLink"
                    className="ml-3.5 p-1 border-b focus:bg-transparent focus:border-none text-white bg-transparent"
                    value={bmLink}
                    onChange={(e) => setBmLink(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center bg-[#b0e5ff] text-[#48baf4] p-2 rounded-full font-medium border-[#3499cc] border-2"
                >
                  Add
                  <FiPlusCircle size={18} className="ml-2" />
                </button>
              </form>
            </div>
          </section>
        )}

        <section className="bg-[#b5e6ff] rounded-xl p-8 w-full max-w-md h-auto max-h-full absolute shadow-2xl border-[#48baf4] border-2">
          <header className="text-[#48baf4]">
            <h3 className="flex justify-center text-3xl">BookMarks</h3>
            <FiPlusCircle
              color="green"
              size={25}
              onClick={openForm}
              className="float-right bottom-7 cursor-pointer relative"
            />
          </header>
          <div className="mt-6">
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {BookMarks.map((bm) => {
                return (
                  <li
                    key={bm.id}
                    className="bg-[#84d6ff] p-2 w-20 h-18 rounded-lg flex group relative shadow-lg border-[#48baf4] border-2"
                  >
                    <a href={bm.bmLink}>
                      <img
                        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bm.bmLink}&size=40`}
                        alt="icon"
                      />
                      <span>{bm.bmTitle}</span>
                    </a>
                    <FaTrash
                      onClick={() => deleteBookMark(bm.id)}
                      className="text-red-500 cursor-pointer hidden group-hover:block absolute right-2 top-2"
                      size={13}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          {/* <footer className="relative h-screen">
              <span className="float-right text-xs p-4">created by ~Sahil Soni</span>
          </footer> */}
        </section>
      </div>
    );
  };

  export default Bookmark;

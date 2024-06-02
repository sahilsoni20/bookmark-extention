import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from 'react-icons/fa';
import { FiPlusCircle } from "react-icons/fi";

const Bookmark = () => {
  const [bmTitle, setBmTitle] = useState("");
  const [bmLink, setBmLink] = useState("");
  const [BookMarks, setBookMarks] = useState([]);

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
  };
  console.log(BookMarks);

  const deleteBookMark = (id) => {
    setBookMarks(prevBookMarks => prevBookMarks.filter(bm => bm.id !== bm));
    console.log(id)
  }

  return (
    <div className=" flex items-center h-screen justify-center">
      <section className="bg-[#53b4e4]  p-4 rounded-xl max-w-54 z-20 relative left-1/3 top-24 ">
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
            <button type="submit" className="flex items-center ml-20 bg-[#b0e5ff] text-[#48baf4] p-2 rounded-full font-medium">Add<FiPlusCircle size={18} className="ml-2"/></button>
          </form>
        </div>
      </section>

      <section className="bg-[#b5e6ff] rounded-xl p-8 w-full max-w-md h-auto max-h-full">
        <header className="text-[#48baf4]">
          <h3 className="flex justify-center text-3xl">BookMarks</h3>
          <FiPlusCircle color="green" size={25} className="float-right bottom-7 cursor-pointer relative"/>
        </header>
        <div className="mt-6">
          <ul className="grid grid-cols-4 gap-x-20 gap-y-8 mr-20 relative">
            {BookMarks.map((bm) => {
              return (
                <li key={bm.id} className="flex bg-[#84d6ff] p-2 w-20 h-18 rounded-lg">
                  <a href={bm.bmLink} rel="">
                    <img
                      src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bm.bmLink}&size=40`}
                      alt="icon"
                    />
                    <span>{bm.bmTitle}</span>
                  </a>
                  <FaTrash onClick={() => deleteBookMark(bm.id)} size={12} className="mr-2 absolute ml-12 text-red-500"/>
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

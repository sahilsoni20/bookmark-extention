import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from 'react-icons/fa';

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
    <div className=" flex items-center h-screen justify-center ">
      <section className="bg-[#53b4e4">
        <div>
          <form onSubmit={addBookmark}>
            <div className="flex">
              <label htmlFor="bmTitle">Title</label>
              <input
                type="text"
                id="bmTitle"
                value={bmTitle}
                onChange={(e) => setBmTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="bmLink">URL</label>
              <input
                type="text"
                id="bmLink"
                value={bmLink}
                onChange={(e) => setBmLink(e.target.value)}
                className="border-black border-b-5"
              />
            </div>
            <button type="submit">Add Bookmark</button>
          </form>
        </div>
      </section>

      <section className="bg-[#b5e6ff] max-w-lg rounded-xl p-8 max-h-lg w-full h-3/5">
        <header>
          <h3 className="flex justify-center text-3xl">BookMarks</h3>
        </header>
        <div className="mt-6">
          <ul className="grid grid-cols-5 gap-6">
            {BookMarks.map((bm) => {
              return (
                <li key={bm.id} className="flex">
                  <a href={bm.bmLink} rel="">
                    <img
                      src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bm.bmLink}&size=40`}
                      alt="icon"
                    />
                    <span>{bm.bmTitle}</span>
                  </a>
                  <FaTrash onClick={() => deleteBookMark(bm.id)} size={15} className="relative left-2"/>
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

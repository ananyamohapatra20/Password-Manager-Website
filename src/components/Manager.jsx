import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      const parsedPasswords = JSON.parse(passwords);
      if (Array.isArray(parsedPasswords)) {
        setPasswordArray(parsedPasswords);
      } else {
        setPasswordArray([]);
      }
    }
  }, []);

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eye.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/hidden.png";
    }
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill in all fields!");
      return;
    }

    const updatedPasswords = [...passwordArray, {...form, id: uuidv4()}];
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setForm({ site: "", username: "", password: "" })
  };

  const deletePassword = (id) => {
    
    console.log("Deleting password with id ", id);
    let isConfirm = confirm("Do you really want to delete this password?")
    if(isConfirm){
      setPasswordArray(passwordArray.filter(item=>item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      toast('Password Saved Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    
    } 
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
    const passwordToEdit = passwordArray.find(i => i.id === id);
    setForm(passwordToEdit);
    const updatedPasswords = passwordArray.filter(item => item.id !== id);
    setPasswordArray(updatedPasswords);
    // const updatedPasswords = [...passwordArray, {...form, id: uuidv4()}];
    // setPasswordArray(updatedPasswords);
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) =>{
    toast('Copied to Clipboard', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text)
    
  }

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      {/* Background Image
      <div className="absolute inset-0 min-h-screen -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] animate-gradient"></div>
      </div> */}

      {/* Background Text */}
      <div className="mx-auto container px-5 sm:px-10 md:px-20 lg:px-40 min-h-screen">
        <h1 className="text-4xl text font-bold text-center mt-8">
          <span className="text-purple-700"> &lt;</span>
          <span>Pass</span>
          <span className="text-purple-700">OP/&gt;</span>
        </h1>
        <p className="text-purple-700 text-lg text-bold text-center">
          Your Own Password Manager{" "}
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          {/* Input Value */}
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            className="rounded-full border border-purple-700 w-full p-2 sm:p-3 md:p-4 py-1"
            name="site"
            id=""
          />
          <div className="flex w-full justify-between flex-col gap-5 md:flex-row">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-purple-700 w-full p-2 sm:p-3 md:p-4 py-1"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                className="rounded-full border border-purple-700 w-full p-2 sm:p-3 md:p-4 py-1"
                name="password"
                id=""
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={25}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={savePassword}
            className="flex justify-center items-center w-fit rounded-full border bg-purple-800 text-white border-black font-bold gap-3 py-2 px-4 sm:px-5 md:px-6 lg:px-8 text-sm sm:text-base hover:bg-purple-600 hover:shadow-lg hover:scale-105 transition-all"
          >
            Add Password
          </button>
        </div>

        {/* Table */}
        <div className="passwords">
          <h2 className="font-bold text-center text-2xl py-5 text-black">
            Your Passwords
          </h2>
          {Array.isArray(passwordArray) && passwordArray.length > 0 ? (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <img
                          src="icons/copy.png"
                          className="w-3.5 cursor-pointer"
                          alt="copy"
onClick={() => copyText(item.password)}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center gap-2 justify-center">
                      {item.username}
                      <img
                        src="icons/copy.png"
                        className="w-3.5 cursor-pointer"
                        alt="copy"
                onClick={() => copyText(item.username)}
                      />
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center gap-2 justify-center">
                      {item.password}
                      <img
                        src="icons/copy.png"
                        className="w-3.5 cursor-pointer"
                        alt="copy"
                        onClick={() => copyText(item.password)}
                      />
                      </div>
                    </td>
                    <td className="py-2 text-center flex gap-3 justify-center ">
                      <span><img onClick={()=>{editPassword(item.id)}} className="w-4 cursor-pointer" src="icons/edit-text.png" alt="edit"/></span>
                      <span><img onClick={()=>{deletePassword(item.id)}} className="w-4 cursor-pointer" src="icons/trash.png" alt="edit"/></span>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              No Passwords to Show <i className="fi fi-sr-copy-alt"></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

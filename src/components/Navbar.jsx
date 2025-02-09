import passwordLogo from '../assets/password.png';
const Navbar = () => {
  return (
    <div className='bg-slate-800 flex justify-between items-center px-6 h-20'>
        <div className='flex items-center'>
            <img src={passwordLogo} alt="Password Logo" className='h-9 ml-5'></img>
            <h1 className='font-bold text-center ml-2'> 
            <span className="text-purple-400"> &lt;</span>
            <span className='text-white'>Pass</span><span className="text-purple-400">OP/&gt;</span>
        </h1>
        </div>
        {/* <ul>
            <li className="flex gap-6 mr-4 text-white">
                <a className="hover:font-bold " href='#'>Home</a>
                <a className="hover:font-bold " href='#'>Contact</a>
                <a className="hover:font-bold " href='#'>Services</a>
                <a className="hover:font-bold " href='#'>About</a>
            </li>
        </ul> */}
        <div className='flex'>
          <a 
          href="https://github.com/ananyamohapatra20/Password-Manager-Website" target="_blank">
          <button className='bg-purple-400 border-2 text-shadow-md px-3 py-1.5 text-sm font-bold flex items-center rounded-full text-black text-bold hover:bg-purple-500 hover:text-black hover:shadow-lg transition-all md:px-5 md:py-2.5 md:text-base md:mr-40'>
           Github <img className="w-4 ml-2 md:w-6"src="icons/github-logo.png" alt="gihub"/></button></a>
        </div> 
        
      
    </div>
  )
}

export default Navbar


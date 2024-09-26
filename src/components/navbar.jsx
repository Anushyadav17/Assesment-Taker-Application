// import React from 'react';
// import { Link, matchPath } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { logout } from '../services/operations/authAPI';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';

// const Navbar = () => {

//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const matchRoute = (route) => {
//       return matchPath({ path: route }, location.pathname);
//   };

//   return (
//     <nav className="bg-blue-800 p-4">
//       <div className="container mx-auto flex justify-around items-center text-wrap">
//         <Link to="/" className="text-white text-lg font-bold"
//         >
//           Quizz-app
//         </Link>
//         <div className="flex space-x-4">
//           <Link to="/" className={`text-gray-300 hover:text-white ${matchRoute("/".path) ? "text-yellow-50" : "text-white"}`}>
//             Home
//           </Link>
//           <Link to="/performance" className="text-gray-300 hover:text-white">
//             Performance
//           </Link>

//           {
//              token !== null && (
//               <button className="text-gray-300 hover:text-white" onClick={() => {
//                 dispatch(logout(navigate));
//               }}>
//                 Logout
//               </button>
//              )
//           }
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link, matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-around items-center text-wrap">
        <Link to="/" className="text-white text-lg font-bold">
          Quizz-app
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className={` hover:text-white ${
              matchRoute('/') ? 'text-white' : 'text-gray-300'
            }`}
          >
            Home
          </Link>
          <Link to="/performance" className={` hover:text-white ${
              matchRoute('/performance') ? 'text-white' : 'text-gray-300'
            }`}>
            Performance
          </Link>
          {token !== null && (
            <button
              className="text-gray-300 hover:text-white"
              onClick={() => {
                dispatch(logout(navigate));
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


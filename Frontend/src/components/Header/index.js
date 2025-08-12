import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        

        const userToken = localStorage.getItem("userJwtToken");
        const adminToken = localStorage.getItem("adminJwtToken");

        setIsAdmin(!!adminToken);
        setIsUser(!!userToken);
    }, [navigate]); // runs once at mount

    const onLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
    
            localStorage.removeItem("adminJwtToken");
            localStorage.removeItem("adminId");
              localStorage.removeItem("userJwtToken");    
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            setIsAdmin(false);
            setIsUser(false);

            navigate('/login');
        }
    };

    return (
        <Navbar fixed="top" expand="lg" style={{ minHeight: '10vh' }} className={isAdmin ? "bg-danger" : "bg-success"}>
            <div className="container-fluid">
                <Navbar.Brand
                    // as={Link}
                    // to={isAdmin ? '/admin/dashboard' : '/'}
                    className="fw-bold text-white text-decoration-none"
                >
                    G-Mart
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarContent" />
                <Navbar.Collapse id="navbarContent">
                    <Nav className="me-auto gap-3">
                        {isAdmin ? (
                            <>
                                <NavLink to="/admin/dashboard" className="nav-link text-white">Dashboard</NavLink> 
                                <NavLink to="/admin/all-products" className="nav-link text-white">Products</NavLink>
                                <NavLink to="/admin/orders" className="nav-link text-white">Orders</NavLink>
                                <NavLink to="/admin/users" className="nav-link text-white">Users</NavLink>
                            </>
                        ) : 
                       isUser ? (
                            <>
                                <NavLink to="/shopping" className="nav-link text-white">products</NavLink>
                                <NavLink to="/my-cart" className="nav-link text-white">MyCart</NavLink>
                                <NavLink to="/my-orders" className="nav-link text-white">Orders</NavLink>
                            </>
                        ) : null   }       
                                        
                    </Nav>

                    <Nav className="ms-auto gap-3">
                        {!isUser && !isAdmin ? (
                            <div className="d-flex gap-2">
                                <NavLink to="/login" className="nav-link text-white">User Login</NavLink>
                                <span className="nav-link text-white">/</span>
                                <NavLink to="/alogin" className="nav-link text-white">Admin Login</NavLink>
                            </div>
                        ) : (
                            <NavLink to="/login" className="nav-link text-white" onClick={onLogout}>
                                Logout
                            </NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;









// import 'bootstrap/dist/css/bootstrap.css';
// import { Nav, Navbar } from 'react-bootstrap';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie'; // ✅ For cookie handling

// const Header = () => {
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [isUser, setIsUser] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         // ✅ Read cookies instead of localStorage
//         const userToken = Cookies.get("userJwtToken");
//         const adminToken = Cookies.get("adminJwtToken");

//         setIsAdmin(!!adminToken);
//         setIsUser(!!userToken);
//     }, [navigate]); // runs once at mount

//     const onLogout = () => {
//         if (window.confirm("Are you sure you want to log out?")) {
//             // ✅ Remove cookies
//             Cookies.remove("adminJwtToken");
//             Cookies.remove("adminId");
//             Cookies.remove("userJwtToken");
//             Cookies.remove("userId");
//             Cookies.remove("userName");

//             setIsAdmin(false);
//             setIsUser(false);

//             navigate('/login');
//         }
//     };

//     return (
//         <Navbar fixed="top" expand="lg" style={{ minHeight: '10vh' }} className={isAdmin ? "bg-danger" : "bg-success"}>
//             <div className="container-fluid">
//                 <Navbar.Brand
//                     className="fw-bold text-white text-decoration-none"
//                 >
//                     G-Mart
//                 </Navbar.Brand>

//                 <Navbar.Toggle aria-controls="navbarContent" />
//                 <Navbar.Collapse id="navbarContent">
//                     <Nav className="me-auto gap-3">
//                         {isAdmin ? (
//                             <>
//                                 <NavLink to="/admin/dashboard" className="nav-link text-white">Dashboard</NavLink> 
//                                 <NavLink to="/admin/all-products" className="nav-link text-white">Products</NavLink>
//                                 <NavLink to="/admin/orders" className="nav-link text-white">Orders</NavLink>
//                                 <NavLink to="/admin/users" className="nav-link text-white">Users</NavLink>
//                             </>
//                         ) : 
//                         isUser ? (
//                             <>
//                                 <NavLink to="/shopping" className="nav-link text-white">Products</NavLink>
//                                 <NavLink to="/my-cart" className="nav-link text-white">MyCart</NavLink>
//                                 <NavLink to="/my-orders" className="nav-link text-white">Orders</NavLink>
//                             </>
//                         ) : null}       
//                     </Nav>

//                     <Nav className="ms-auto gap-3">
//                         {!isUser && !isAdmin ? (
//                             <div className="d-flex gap-2">
//                                 <NavLink to="/login" className="nav-link text-white">User Login</NavLink>
//                                 <span className="nav-link text-white">/</span>
//                                 <NavLink to="/alogin" className="nav-link text-white">Admin Login</NavLink>
//                             </div>
//                         ) : (
//                             <NavLink to="/login" className="nav-link text-white" onClick={onLogout}>
//                                 Logout
//                             </NavLink>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </div>
//         </Navbar>
//     );
// };

// export default Header;





// import 'bootstrap/dist/css/bootstrap.css';
// import { Nav, Navbar } from 'react-bootstrap';
// import {  NavLink, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// const Header = () => {
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [isUser, setIsUser] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check auth status whenever the component renders
//         const userToken = Cookies.get("userJwtToken");
//         const adminToken = Cookies.get("adminJwtToken");

//         setIsAdmin(!!adminToken);
//         setIsUser(!!userToken);
//     }, [navigate, Cookies.get("userJwtToken"), Cookies.get("adminJwtToken")]); // Add cookie values as dependencies

//     const onLogout = () => {
//         if (window.confirm("Are you sure you want to log out?")) {
//             Cookies.remove("adminJwtToken");
//             Cookies.remove("adminId");
//             Cookies.remove("userJwtToken");
//             Cookies.remove("userId");
//             Cookies.remove("userName");

//             setIsAdmin(false);
//             setIsUser(false);

//             navigate('/login');
//         }
//     };

//     return (
//         <Navbar fixed="top" expand="lg" style={{ minHeight: '10vh' }} className={isAdmin ? "bg-danger" : "bg-success"}>
//             <div className="container-fluid">
//                 <Navbar.Brand
//                     className="fw-bold text-white text-decoration-none"
//                 >
//                     G-Mart
//                 </Navbar.Brand>

//                 <Navbar.Toggle aria-controls="navbarContent" />
//                 <Navbar.Collapse id="navbarContent">
//                     <Nav className="me-auto gap-3">
//                         {isAdmin ? (
//                             <>
//                                 <NavLink to="/admin/dashboard" className="nav-link text-white">Dashboard</NavLink> 
//                                 <NavLink to="/admin/all-products" className="nav-link text-white">Products</NavLink>
//                                 <NavLink to="/admin/orders" className="nav-link text-white">Orders</NavLink>
//                                 <NavLink to="/admin/users" className="nav-link text-white">Users</NavLink>
//                             </>
//                         ) : 
//                         isUser ? (
//                             <>
//                                 <NavLink to="/shopping" className="nav-link text-white">Products</NavLink>
//                                 <NavLink to="/my-cart" className="nav-link text-white">MyCart</NavLink>
//                                 <NavLink to="/my-orders" className="nav-link text-white">Orders</NavLink>
//                             </>
//                         ) : null}       
//                     </Nav>

//                     <Nav className="ms-auto gap-3">
//                         {!isUser && !isAdmin ? (
//                             <div className="d-flex gap-2">
//                                 <NavLink to="/login" className="nav-link text-white">User Login</NavLink>
//                                 <span className="nav-link text-white">/</span>
//                                 <NavLink to="/alogin" className="nav-link text-white">Admin Login</NavLink>
//                             </div>
//                         ) : (
//                             <NavLink to="/login" className="nav-link text-white" onClick={onLogout}>
//                                 Logout
//                             </NavLink>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </div>
//         </Navbar>
//     );
// };

// export default Header;
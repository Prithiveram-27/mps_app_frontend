import React, { useEffect, useState } from "react";
import "./App.css";
import AuthRouter from "./routes/AuthRouter";
import AppRouter from "./routes/AppRouter";

function App() {
  const [authDetails, setAuthDetails] = useState(() =>
    localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null
  );
  const [userLoggedIn, setuserLoggedIn] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (authDetails) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authDetails]);

  console.log("userlogged in", userLoggedIn);

  return (
    <div>
      {authDetails === null ? (
        <AuthRouter
          setAuthDetails={setAuthDetails}
          setuserLoggedIn={setuserLoggedIn}
        />
      ) : (
        <AppRouter userLoggedIn={userLoggedIn} />
      )}

      {/* <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route
              path="/login"
              element={<Login setAuthDetails={setAuthDetails} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/CustomerListing" element={<CustomerListing />} />
            <Route path="/ProductListing" element={<ProductListing />} />
            <Route path="/CreateService" element={<CreateService />} />
          </Routes>
        </div>
      </div> */}
    </div>
  );
}

export default App;

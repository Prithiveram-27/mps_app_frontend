import React from 'react';
import {Navbar} from 'react-bootstrap';

const CreateNavbar = ({ items }) => {
    return (//0B5ED7
        <Navbar className="p-4" style={{ background: "#145DA0", height: "50px" }}>
              <Navbar.Brand  className="" style={{ color: "#F1FADA",fontSize: "30px",fontWeight: "bold",marginLeft: "10px" }}>
                  MPS
              </Navbar.Brand>
        </Navbar>
        );
    };
    
export default CreateNavbar;
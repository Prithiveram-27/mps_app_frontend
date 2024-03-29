import React,{useState, useEffect} from 'react';
import { Card, Form, Button,Row,Col } from 'react-bootstrap';
import './createServiceScreen.css';
import CreateNavbar from '../../components/navbar';

const CreateService = () => {

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    alternateNumber: '',
    address: '',
    brand: '',
    problemType: '',
    problemStatus: '',
    problemDescription: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectToAnotherScreen, setRedirectToAnotherScreen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleNameSearch = async (searchText) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/customers/getCustomersbyNameorMobilenumber?searchTerm=${searchText}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.customers); 
        setIsDropdownVisible(true);
      } else {
        console.error('Failed to fetch search results.');
      }
    } catch (error) {
      console.error('Error searching names:', error);
    }
  };

  // Function to handle name selection
  const handleNameSelect = (name) => {
    setSelectedName(name);
    setIsDropdownVisible(false); 
    const selectedResult = searchResults.find(result => result.name === name);
    if (selectedResult) {
      setFormData({
        ...formData,
        phoneNumber: selectedResult.mobilenumber,
        alternateNumber: selectedResult.alternatemobilenumber,
        address: selectedResult.address,
      });
    }
  };


  const handleFormSubmit = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Service created successfully.');
        setRedirectToAnotherScreen(true);
      } else {
        // Handle API call failure
        console.error('Failed to create service.');
      }
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  useEffect(() => {
    if (redirectToAnotherScreen) {
      window.location.href = '/another-screen';
    }
  }, [redirectToAnotherScreen]);

  return (
    <>
    <CreateNavbar />
    <div className="d-flex justify-content-center mt-5">
         <Card style={{ width: '35rem',height: '25rem', marginRight: '2rem' }}>
        <Card.Body>
          <Card.Title>Customer Details</Card.Title>
          <br/>
          <Form>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Name: </Form.Label>
                <Col sm={8}>
                  <div className="search-dropdown">
                    <input
                      type="text"
                      placeholder="Search name"
                      value={selectedName}
                      onChange={(e) => {
                        setSelectedName(e.target.value);
                        handleNameSearch(e.target.value);
                      }}
                    />
                    {searchResults && isDropdownVisible &&searchResults.length > 0 && (
                      <ul>
                        {searchResults.map((result) => (
                          <li key={result.id} onClick={() => handleNameSelect(result.name)}>
                            {result.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Phone Number: </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                      type="phone" 
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} 
                    />
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Alternate Number: </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                      type="phone" 
                      value={formData.alternateNumber}
                      onChange={(e) => setFormData({ ...formData, alternateNumber: e.target.value })} 
                    />
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Address: </Form.Label>
                <Col sm={8}>
                    <textarea 
                      className='form-control' 
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
                    />
                </Col>
            </Form.Group>
            <br/>
        </Form>
        </Card.Body>
      </Card>
      
      <Card style={{width: '35rem',height: '25rem', }}>
      <Card.Body>
          <Card.Title>Product Details</Card.Title>
          <br/>
          <Form>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Brand: </Form.Label>
                <Col sm={8}>
                  <div class="dropdown">
                    <select class="form-control" id="dropdown">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <div class="dropdown-icon">
                      <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                  </div>
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Problem type: </Form.Label>
                <Col sm={8}>
                  <div class="dropdown">
                    <select class="form-control" id="dropdown">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <div class="dropdown-icon">
                      <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                  </div>
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
              <Form.Label column sm={4}>Problem Status:</Form.Label>
              <Col sm={8}>
                <div className="radio-border">
                  <Form.Check type="radio" label="Warranty" name="problemStatus" id="Warranty" />
                </div>
                <div className="radio-border">
                  <Form.Check type="radio" label="Out of Warranty" name="problemStatus" id="OutOfWarranty" />
                </div>
                <div className="radio-border">
                  <Form.Check type="radio" label="AMC" name="problemStatus" id="AMC" />
                </div>
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={5}> Problem Description: </Form.Label>
                <Col sm={7}>
                    <textarea className='form-control'  placeholder="Description" />
                </Col>
            </Form.Group>
            <br/>
        </Form>
        </Card.Body>
      </Card>
    </div>
    <br/>
    {successMessage && <p className="text-success">{successMessage}</p>}
      <div>
        <Row>
          <Col sm={10} style={{ textAlign: 'right' }}>
            <Button variant="primary" onClick={() => setFormData({})}>
              Reset
            </Button>
          </Col>
          <Col sm={2} style={{ textAlign: 'left' }}>
            <Button variant="success" type="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreateService;

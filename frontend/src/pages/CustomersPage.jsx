import React, { useEffect, useState } from "react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/customers")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Access the data property if it exists, otherwise use the response directly
      const customers = Array.isArray(data) ? data : data.data;
      setCustomers(customers || []);
    })
    .catch((error) => {
      console.error("Error fetching customers:", error);
      // You might want to set some error state here
    });
}, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Customers List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;

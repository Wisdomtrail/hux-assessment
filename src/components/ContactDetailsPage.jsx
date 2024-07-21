import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UserCircleIcon, PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/solid';

const ContactDetailsPage = () => {
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://${global.BASE_URL}/api/contacts/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setContact(response.data);
      } catch (error) {
        setMessage('Error fetching contact details.');
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://${global.BASE_URL}/api/contacts/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setMessage('Contact deleted successfully.');
        setTimeout(() => navigate('/contacts'), 2000);
      } catch (error) {
        setMessage('Error deleting contact.');
      }
    }
  };

  if (!contact) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold leading-6 text-gray-900">Contact Details</h1>
          {message && (
            <div className="mt-4 p-4 bg-blue-100 rounded-md">
              <p className="text-sm text-blue-700">{message}</p>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-0">
            <div className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <UserCircleIcon className="h-16 w-16 text-indigo-500 mx-auto sm:mx-0" />
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <h2 className="text-2xl font-semibold">{contact.firstName} {contact.lastName}</h2>
                </div>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <PhoneIcon className="h-5 w-5 text-indigo-500 mr-2" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contact.phoneNumber}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MailIcon className="h-5 w-5 text-indigo-500 mr-2" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contact.email || 'N/A'}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <LocationMarkerIcon className="h-5 w-5 text-indigo-500 mr-2" />
                  Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contact.address || 'N/A'}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          onClick={() => navigate(`/edit-contact/${id}`)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
        <button
          onClick={() => navigate('/contacts')}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
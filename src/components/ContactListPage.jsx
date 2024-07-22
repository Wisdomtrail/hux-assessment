import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, DotsVerticalIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

const ContactsListPage = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`http://${global.BASE_URL}/api/contacts`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setContacts(response.data);
    } catch (error) {
      setMessage('Error fetching contacts.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
  }, []);

  useEffect(() => {
    if (openDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown, handleClickOutside]);

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://${global.BASE_URL}/api/contacts/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setMessage('Contact deleted successfully.');
        fetchContacts();
      } catch (error) {
        setMessage('Error deleting contact.');
      }
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (id, event) => {
    event.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 py-8 flex flex-col top-10vw md:left-[12vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col h-full">
          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Contacts List</h1>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate('/create-contact')}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Contact
            </button>
          </div>
          {message && (
            <div className="px-4 py-3 bg-blue-50 border-t border-b border-blue-200 text-blue-700">
              {message}
            </div>
          )}
          <div className="flex-grow overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Address</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-800 font-medium text-lg">{contact.firstName[0]}{contact.lastName[0]}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{contact.firstName} {contact.lastName}</div>
                          <div className="text-sm text-gray-500 sm:hidden">{contact.email}</div>
                          <div className="text-sm text-gray-500 sm:hidden md:hidden">{contact.phoneNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{contact.email}</td>
                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{contact.phoneNumber}</td>
                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{contact.address}</td>
                    <td className="px-6 py-6 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative" ref={openDropdown === contact._id ? dropdownRef : null}>
                        <button
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={(e) => toggleDropdown(contact._id, e)}
                        >
                          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {openDropdown === contact._id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10">
                            <div className="py-1">
                              <button
                                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/contacts/${contact._id}`);
                                  setOpenDropdown(null);
                                }}
                              >
                                <EyeIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                View
                              </button>
                            </div>
                            <div className="py-1">
                              <button
                                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/edit-contact/${contact._id}`);
                                  setOpenDropdown(null);
                                }}
                              >
                                <PencilIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                Edit
                              </button>
                            </div>
                            <div className="py-1">
                              <button
                                className="group flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900 w-full"
                                onClick={(e) => handleDelete(contact._id, e)}
                              >
                                <TrashIcon className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" aria-hidden="true" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsListPage;
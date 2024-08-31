"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (menu: string) => {
    setActiveSubMenu(activeSubMenu === menu ? '' : menu);
  };

  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {/* Logo u otro contenido aquí */}
            <Link href={'/'} className="text-xl font-bold">SST ACADEMY</Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {/* Menú principal para pantallas más grandes */}
            <ul className="flex space-x-4">
              <li className="relative">
                <Link href={'/'} className=" hover:text-blue-500">
                  Inicio
                </Link>      
              </li>
              <li className="relative">
                <button onClick={() => toggleSubMenu('courses')} className=" hover:text-blue-500">
                  Cursos
                </button>
                {activeSubMenu === 'courses' && (
                  <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md">
                  <li><Link href={'/cursos-virtuales'} className="block px-1 py-2 text-sm text-gray-700 hover:bg-gray-100">Todos</Link></li>
                  <li><a href="index_2.html" className="block px-1 py-2 text-sm text-gray-700 hover:bg-gray-100">Populares</a></li>
                </ul>
                )}
              </li>
              <li><a href="contact.html" className=" hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
          <div>
            <Link href={'/login'} className='px-2 py-1 bg-blue-500'>Ingresar</Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Botón para menú en dispositivos móviles */}
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-500 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú colapsable para dispositivos móviles */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li>
              <button onClick={() => toggleSubMenu('home')} className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Home
              </button>
              {activeSubMenu === 'home' && (
                <ul className="pl-4 mt-2 space-y-1">
                  <li><a href="index_1.html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home V.1</a></li>
                  <li><a href="index_2.html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home V.2</a></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => toggleSubMenu('courses')} className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Courses
              </button>
              {activeSubMenu === 'courses' && (
                <ul className="pl-4 mt-2 space-y-1">
                  <li><a href="course.html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Courses Grid</a></li>
                  <li><a href="course_list.html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Courses List</a></li>
                  <li><a href="course_details.html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Course Details V.1</a></li>
                  <li><a href="course_details_2.html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Course Details V.2</a></li>
                </ul>
              )}
            </li>
            <li><a href="contact.html" className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

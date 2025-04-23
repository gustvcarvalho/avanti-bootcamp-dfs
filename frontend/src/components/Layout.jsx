
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-purple-300 overflow-x-hidden">
      <main className="flex-grow">{children}</main>
      <footer className="bg-white-800 text-white py-2 text-center absolute bottom-0 w-full">
        © 2025 F7nder. Todos os direitos reservados.
      </footer>
    </div>
  );
}

import React from 'react';

function Footer() {
  return (
    <footer className="mt-8 py-16 px-4 grid place-content-center border-t border-t-pink-600 bg-pink-500">
      <p className="text-xs inline-block bg-black/10 font-bold">
        Source: John Hopkins University
      </p>
      <a
        href="https://github.com/fernando-silvabr66/covid19-stats"
        className=""
        target="_blank"
        rel="noopener noreferrer"
      >
        Source Code under AGPL license
      </a>
    </footer>
  );
}

export default Footer;

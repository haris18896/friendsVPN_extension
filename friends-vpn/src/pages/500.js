import Link from 'next/link';
import React from 'react';

function Custom500() {
  return (
    <div className='customError'>
      <p>
        <strong>500</strong> | Server-side error occurred
      </p>
    </div>
  );
}

export default Custom500;

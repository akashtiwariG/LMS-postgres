import React from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import Image from 'next/image'




export default function page() {
  return (
    <div>
 

<div>
  <label for="OrderNotes" class="sr-only">Order notes</label>

  <div
    class="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700"
  >
    <textarea
      id="OrderNotes"
      class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm dark:bg-gray-800 dark:text-white"
      rows="4"
      placeholder="Enter any additional order notes..."
    ></textarea>

    <div class="flex items-center justify-end gap-2 bg-white p-3 dark:bg-gray-800">
      <button
        type="button"
        class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-100"
      >
        Clear
      </button>

      <button
        type="button"
        class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Add
      </button>
    </div>
  </div>
</div>
    </div>
  )
}
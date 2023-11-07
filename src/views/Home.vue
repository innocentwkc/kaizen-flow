<template>
  <main class="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h1 class="text-2xl font-bold mb-4">Upload PDF</h1>
      <form @submit.prevent="uploadPdf" enctype="multipart/form-data">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="pdf">
            Select PDF file:
          </label>
          <input type="file" @change="handleFileUpload" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" accept=".pdf">
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Upload PDF
        </button>
      </form>
      <div v-if="response_output" class="mt-4">
        <div v-if="response_success">
          <div>
            File uploaded successfully.
          </div>
          <span class="font-semibold">Filename: &nbsp;</span>
          <a class="no-underline hover:underline text-cyan-500 dark:text-cyan-500" :href="'http://localhost:5001/api/get-resources?type=module&file=' + response_output" target="_blank">
             {{ response_output }}
          </a>
        </div>
        <div v-else>
          <span>
            Error:
          </span>
            {{ response_output }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  /**
   * Handles file upload functionality within a Vue component.
   * This script sets up reactive states for handling the PDF file and the response,
   * and provides methods to handle file selection and upload the file using Axios.
   *
   * @module FileUpload
   * @file FileUpload.js
   * @description Script setup for a file upload Vue component.
   */

  import { ref } from 'vue'
  import axios from 'axios'

  /**
   * Reactive state: pdf
   * Holds the selected PDF file for upload.
   * @type {Ref<File|null>}
   */
  const pdf = ref(null);

  /**
   * Reactive state: response_output
   * Holds the response message or file name after successful upload.
   * @type {Ref<string|null>}
   */
  const response_output = ref(null);

  /**
   * Reactive state: response_success
   * Indicates whether the file upload was successful.
   * @type {Ref<boolean>}
   */
  const response_success = ref(false);

  /**
   * Handles file selection and sets the pdf reactive state.
   * 
   * @param {Event} event - The file input change event.
   */
  const handleFileUpload = (event) => {
    pdf.value = event.target.files[0];
  };

  /**
   * Uploads the selected PDF file to a server endpoint using Axios.
   * Updates the response_output and response_success reactive states based on the result.
   */
  const uploadPdf = () => {
    if (!pdf.value) {
      console.error('No PDF file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdf.value);

    axios.post('http://localhost:5001/api/upload', formData)
      .then(response => {
        // Example: 'document.pdf' becomes 'document.json'
        // let json_file_name = (response.data.filename).split('.')[0] + '.json'

        // console.log(json_file)

        response_success.value = true;
        response_output.value = response.data.filename;
      })
      .catch(error => {
        response_success.value = false;
        response_output.value = `Error uploading file: ${error.message}`;
      });
  };
</script>

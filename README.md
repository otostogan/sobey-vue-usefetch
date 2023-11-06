# sobey-vue-usefetch

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

A powerful fetch utility for Vue.js applications that simplifies data fetching and state management.

## Features

-   Easily manage asynchronous requests with a clean API.
-   Handle loading, success, and error states seamlessly.
-   Supports interval-based data polling for real-time updates.

## Installation

```
npm install sobey-vue-usefetch
```

# Usage

```
import { useFetch, RequestStatus } from 'sobey-vue-usefetch';

// Define your request function
const fetchData = async (args) => {
  // Make your asynchronous request here
  const response = await fetch(`https://api.example.com/data/${args}`);
  return await response.json();
};

// Initialize useFetch hook
const [state, fetchDataFn, resetInterval] = useFetch({
  request: fetchData,
  defaultData: null, // Default data (optional)
});

// Usage in component
async function loadData() {
  try {
    // Trigger the fetch function
    await fetchDataFn('example-args');

    // Access the state
    if (state.status === RequestStatus.FULFILLED) {
      console.log('Data loaded successfully:', state.data);
    } else if (state.status === RequestStatus.REJECTED) {
      console.error('Error loading data:', state.error);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Optional: Set up interval-based polling
resetInterval(); // Reset interval (if needed)
const pollingInterval = 5000; // 5 seconds
fetchDataFn('example-args', pollingInterval); // Start polling

// Optional: Clean up interval on component unmount
onBeforeUnmount(() => {
  resetInterval();
});

```

# API

## useFetch(options)

-   `options` (object):
    -   `request` (function): A function that performs an asynchronous request and returns a promise.
    -   `defaultData` (any, optional): Default data to use before the request is made.

### Returns an array containing:

1. `state` (object): The current state of the request.

    - `data` (any): The fetched data.
    - `status` (string): The current status of the request (`INIT`, `LOADING`, `FULFILLED`, `REJECTED`).
    - `error` (any): The error object if the request is rejected.

2. `fetchDataFn` (function): The function to trigger the request.

    - Parameters:
        - `args` (any, optional): Arguments to pass to the request function.
        - `refetch` (number, optional): Interval (in milliseconds) for data polling.

3. `resetInterval` (function): Resets the polling interval.

## License

This project is licensed under the MIT License.

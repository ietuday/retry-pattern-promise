// Auto Retry when a network call fails
// fetchNews

// fetchWithAutoRetry(fetchNews,5)

function fetchWithAutoRetry(fetcher, maxRetryCount) {
    return new Promise((resolve, reject) => {
      let retries = 0;
      const caller = () =>
        fetcher()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            if (retries < maxRetryCount) {
              retries++;
              caller();
            } else {
              reject(error);
            }
          });
      retries = 1;
      caller();
    });
  }
  
  const fetchSouravProfile = async () => {
    console.log("Fetching..");
    const rawResponse = await fetch("https://api.github.com/users/ietuday");
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);
    return jsonResponse;
  };
  
  fetchWithAutoRetry(fetchSouravProfile, 5);
  
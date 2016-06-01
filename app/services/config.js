function isProduction()
{
    // Rudimentary check to see if we are running on production. Should provide a more flexible config.
    return true;
}

export let SERVER_URL = isProduction() ? "https://geniyes-gbharathkumar.rhcloud.com/" : "http://localhost:3000/";

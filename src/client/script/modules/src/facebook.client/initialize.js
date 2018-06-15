const id = 'facebook-jssdk';
const options = {
    appId: '1702779546503699',
    xfbml: false,
    version: 'v3.0',
    cookie: true,
};

/**
 * @returns {Promise<void>}
 */
export default function() {
    return new Promise(resolve => {
        if (document.getElementById(id)) resolve();

        window.fbAsyncInit = () => resolve(window.FB.init(options));

        const script = document.createElement('script');
        script.id = id;
        script.src = '//connect.facebook.net/en_US/sdk.js';

        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
}

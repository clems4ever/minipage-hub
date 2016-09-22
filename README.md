# MiniPage Hub

MiniPage Hub is a set of scripts that allows you to deploy easily as many one page websites with mail forms as you wish. Certificates are automatically generated so that your website is HTTPS ready.

## How to

### Deploy the Hub layer

To deploy your websites you must first create the minipage hub layer (proxy and certs agent) with the following commands:

    ./deploy
    
It creates a network bridge that links the proxy with minipage containers. 

### Deploy your websites

You can add as many websites as you wish with the following command:

    ./add-website www.example.com /var/www/mywebsite
    
Where **www.example.com** is your domain name and **/var/www/mywebsite** is the root of your website.
The deployment requires a bit of configuration. You just have to follow the instructions. *If you don't need to send emails you can disable mailgun.* 

*If the configuration has already been done, remove the website, remove the directory ~/.minipage/yourdomain.com/ and add it again.*

When it is done, your website should be accessible at https://www.example.com.

### Use mailgun to send emails from minipage websites

If you want to receive emails sent by users on your website, create a [mailgun](https://mailgun.com) account and get an API key that is required during configuration of your website.

You can try it quickly with the embedded example
  
    ./add-website www.example.com $(pwd)/examples/mail-form/
    
Access the website at https://www.example.com and you'll be able to send emails using the form.

### How to send emails from your own website

When the configuration of your website is done, include the following line in your HTML file:

    <script src="/minipage.js"></script>
    
This file is served by the webserver and contains a library that allows you to send emails without any more configuration with only one line of Javascript:

    minipage.send(subject, message, function(err, res) { })

### Remove your website

Removing a website is as simple as:

    ./remove-website www.example.com

## Contributing to MiniPage Hub

Follow [contributing](CONTRIBUTING.md) file.

## License

MiniPage Hub is **licensed** under the **[MIT License]**. The terms of the license are as follows:

    The MIT License (MIT)

    Copyright (c) 2016 - Clement Michaud

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[MIT License]: https://opensource.org/licenses/MIT
    

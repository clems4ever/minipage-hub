
# Create the overlay network for the proxy and the webservers
docker network create frontend-network

# Start the webserver that will serve your website
docker run -d -e VIRTUAL_HOST=example.com \
    --name example.com \
    -e LETSENCRYPT_HOST=example.com \
    -e LETSENCRYPT_EMAIL=user@example.com \
    -v /path/to/website:/usr/share/nginx/html:ro \
    --net frontend-network nginx:alpine

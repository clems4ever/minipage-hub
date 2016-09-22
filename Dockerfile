FROM smebberson/alpine-nginx-nodejs
MAINTAINER Clement Michaud

# Mail agent application
ADD mail-agent/package.json /src/mail-agent/package.json
ADD mail-agent/lib /src/mail-agent/lib
ADD mail-agent/app.js /src/mail-agent/app.js

# Fetch depencies of mail agent
RUN cd /src/mail-agent && npm install

# Mail agent startup script
ADD scripts/run /etc/services.d/mail-agent/run

# Easypage internal files
ADD minipage /minipage

# Nginx configuration
ADD conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


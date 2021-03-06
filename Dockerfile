FROM oryxprod/node-10.14:20181217.1
LABEL maintainer="Azure App Services Container Images <appsvc-images@microsoft.com>"

RUN echo "ipv6" >> /etc/modules

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.6/community" >> /etc/apk/repositories; \
    echo "http://dl-cdn.alpinelinux.org/alpine/v3.6/main" >> /etc/apk/repositories;
    
RUN npm install -g pm2 \
     && mkdir -p /home/LogFiles /opt/startup \
     && echo "root:Docker!" | chpasswd \
     && echo "cd /home" >> /etc/bash.bashrc \
     && apk update --no-cache \
     && apk add openssh \
     && apk add openrc \
     && apk add vim \
     && apk add curl \
     && apk add wget \
     && apk add tcptraceroute \
     && apk add bash 

# https://github.com/dockage/alpine/blob/master/3.8/openrc/Dockerfile
RUN sed -i 's/^\(tty\d\:\:\)/#\1/g' /etc/inittab \
    && sed -i \
        -e 's/#rc_sys=".*"/rc_sys="docker"/g' \
        -e 's/#rc_env_allow=".*"/rc_env_allow="\*"/g' \
        -e 's/#rc_crashed_stop=.*/rc_crashed_stop=NO/g' \
        -e 's/#rc_crashed_start=.*/rc_crashed_start=YES/g' \
        -e 's/#rc_provide=".*"/rc_provide="loopback net"/g' \
        /etc/rc.conf \
    # Remove unnecessary services
    && rm -f /etc/init.d/hwdrivers \
            /etc/init.d/hwclock \
            /etc/init.d/hwdrivers \
            /etc/init.d/modules \
            /etc/init.d/modules-load \
            /etc/init.d/modloop \
    # Can't do cgroups
    && sed -i 's/cgroup_add_service /# cgroup_add_service /g' /lib/rc/sh/openrc-run.sh \
    && sed -i 's/VSERVER/DOCKER/Ig' /lib/rc/sh/init.sh

	
# setup default site
COPY startup /opt/
COPY hostingstart.html /opt/startup

# configure startup
COPY sshd_config /etc/ssh/
COPY ssh_setup.sh /tmp
RUN chmod -R +x /opt/startup \
   && chmod -R +x /tmp/ssh_setup.sh \
   && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null) \
   && rm -rf /tmp/* \
   && cd /opt/startup \
   && npm install 


EXPOSE 2222 8080

ENV PM2HOME /pm2home

ENV HOST 0.0.0.0
ENV PORT 8080
ENV WEBSITE_ROLE_INSTANCE_ID localRoleInstance
ENV WEBSITE_INSTANCE_ID localInstance
ENV PATH ${PATH}:/home/site/wwwroot


WORKDIR /home/site/wwwroot
#Copy package.json to wwwroot
COPY package*.json ./
#Will Run Projects NPM
RUN npm install
RUN npm run build

COPY .nuxt /home/site/wwwroot/.nuxt
COPY assets /home/site/wwwroot/assets
COPY build /home/site/wwwroot/build
COPY components /home/site/wwwroot/components
COPY filters /home/site/wwwroot/filters
COPY fixtures /home/site/wwwroot/fixtures
COPY layouts /home/site/wwwroot/layouts
COPY locales /home/site/wwwroot/locales
COPY middleware /home/site/wwwroot/middleware
COPY node_modules /home/site/wwwroot/node_modules
COPY pages /home/site/wwwroot/pages
COPY plugins /home/site/wwwroot/plugins
COPY server /home/site/wwwroot/server
COPY static /home/site/wwwroot/static
COPY store /home/site/wwwroot/store
COPY nuxt.config.js /home/site/wwwroot/
COPY hostingstart.html /home/site/wwwroot/
COPY .eslintrc.js /home/site/wwwroot/
COPY backpack.config.js /home/site/wwwroot/
COPY yarn.lock /home/site/wwwroot/
COPY .editorconfig /home/site/wwwroot/
#RUN mkdir /home/site/wwwroot/.nuxt

ENTRYPOINT ["/opt/startup/init_container.sh"]
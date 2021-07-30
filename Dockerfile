FROM zevrant/zevrant-ubuntu-base:latest

EXPOSE 443

RUN mkdir -p /usr/local/microservices/zevrant-home-services/zevrant-home-ui/

RUN mkdir -p /var/log/zevrant-home-services/zevrant-home-ui\
  && mkdir -p /storage/keys

RUN useradd -m -d /usr/local/microservices/zevrant-home-services/zevrant-home-ui/ -G developers  zevrant-home-ui

RUN chown -R zevrant-home-ui:developers /var/log/zevrant-home-services/zevrant-home-ui /usr/local/microservices/zevrant-home-services/zevrant-home-ui /storage/keys

USER zevrant-home-ui

COPY build/libs/zevrant-home-ui-*.jar /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.jar

RUN mkdir ~/.aws; echo "[default]" > ~/.aws/config; echo "region = us-east-1" >> ~/.aws/config; echo "output = json" >> ~/.aws/config

RUN curl https://raw.githubusercontent.com/zevrant/zevrant-services-pipeline/master/bash/zevrant-services-start.sh > ~/startup.sh \
  && curl https://raw.githubusercontent.com/zevrant/zevrant-services-pipeline/master/bash/openssl.conf > ~/openssl.conf

CMD password=`date +%s | sha256sum | base64 | head -c 32`\
 && bash ~/startup.sh zevrant-home-ui $password \
 && java -Xmx32G -jar -Dcom.sun.net.ssl.checkRevocation=false -Dspring.profiles.active=$ENVIRONMENT -Dpassword=$password /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.jar

FROM zevrant/zevrant-centos-base:latest

ARG a_version

ENV VERSION=$a_version

EXPOSE 8000

RUN mkdir -p /usr/local/microservices/zevrant-home-services/zevrant-home-ui/

RUN mkdir -p /var/log/zevrant-home-services/zevrant-home-ui

RUN adduser -d /usr/local/microservices/zevrant-home-services/zevrant-home-ui/ -G developers -r -U zevrant-home-ui

RUN chown -R zevrant-home-ui:developers /var/log/zevrant-home-services/zevrant-home-ui; chown -R zevrant-home-ui:developers /usr/local/microservices/zevrant-home-services/zevrant-home-ui

USER zevrant-home-ui

COPY ./build/libs/zevrant-home-ui*.jar /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.jar

RUN mkdir -p ~/.aws; echo "[default]" > ~/.aws/credentials; echo "[default]" > ~/.aws.config; echo "region = us-east-1" >> ~/.aws/config; echo "output = json" >> ~/.aws/config;

CMD  echo "aws_access_key_id = $ACCESS_KEY" >> ~/.aws/credentials\
 && echo "aws_secret_access_key = $SECRET_KEY" >> ~/.aws/credentials\
 && IFS='\ '\
 && echo $(hostname -I)\
 && IP=$(hostname -I)\
 && echo ${IP[1]} \
 && read -ra arr <<< "$IP"\
 && export IP_ADDRESS=${IP[2]}\
 && echo $IP_ADDRESS \
 && java -jar -Dspring.profiles.active=prod -Deureka.instance.hostname=$IP_ADDRESS /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.jar

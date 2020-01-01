FROM glassfish:latest
ENV DEPLOYMENT_DIR ${GLASSFISH_HOME}/glassfish/domains/domain1/autodeploy/
ENV DEPLOYMENT_ASADMIN ${GLASSFISH_HOME}/glassfish/bin
#ENV ADMIN_USER admin
#ENV ADMIN_NEW_PASS abc123
COPY /build ${DEPLOYMENT_DIR}
# specify a new master password "newpassword" instead of the default password "changeit"
RUN echo 'AS_ADMIN_PASSWORD=\nAS_ADMIN_ADMINPASSWORD=abc123\nAS_ADMIN_USERPASSWORD=abc123\nAS_ADMIN_MASTERPASSWORD=abc123\nAS_ADMIN_NEWPASSWORD=abc123' >> glassfish/bin/masterpwdfile.txt

RUN \
  ${GLASSFISH_HOME}/glassfish/bin/asadmin start-domain
RUN \
  ${GLASSFISH_HOME}/glassfish/bin/asadmin --user admin --passwordfile ${GLASSFISH_HOME}/glassfish/bin/masterpwdfile.txt  change-admin-password

#RUN \
#  ${GLASSFISH_HOME}/glassfish/bin/asadmin --host localhost --port 4848 enable-secure-admin

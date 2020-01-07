FROM glassfish:latest
ENV DEPLOYMENT_DIR ${GLASSFISH_HOME}/glassfish/domains/domain1/autodeploy/
ENV DEPLOYMENT_ASADMIN ${GLASSFISH_HOME}/glassfish/bin
#ENV ADMIN_USER admin
#ENV ADMIN_NEW_PASS abc123

#Copy java ear project file to glassfish server
COPY /target/ServicePRJ-ear-1.0-SNAPSHOT.ear ${DEPLOYMENT_DIR}

#Copy driver jdbc to glassfish server
COPY sqljdbc42.jar ${GLASSFISH_HOME}/glassfish/domains/domain1/lib

# specify a new master password "newpassword" instead of the default password "changeit"
#create a password file to change Glassfish Admin password
RUN echo 'AS_ADMIN_PASSWORD=\nAS_ADMIN_ADMINPASSWORD=abc123\nAS_ADMIN_USERPASSWORD=abc123\nAS_ADMIN_MASTERPASSWORD=abc123\nAS_ADMIN_NEWPASSWORD=abc123' >> glassfish/bin/masterpwdfile.txt

RUN \
  ${GLASSFISH_HOME}/glassfish/bin/asadmin start-domain
RUN \
  ${GLASSFISH_HOME}/glassfish/bin/asadmin --user admin --passwordfile ${GLASSFISH_HOME}/glassfish/bin/masterpwdfile.txt  change-admin-password

#remove password file after change password
RUN \
  rm -rf glassfish/bin/masterpwdfile.txt

#RUN \
#  ${GLASSFISH_HOME}/glassfish/bin/asadmin --host localhost --port 4848 enable-secure-admin

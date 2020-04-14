FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install golang git python3 apache2 php python3-pip -y

RUN go get -u github.com/tomnomnom/assetfinder
RUN go get -u github.com/tomnomnom/httprobe
RUN go get -u github.com/tomnomnom/meg
RUN go get -u github.com/tomnomnom/gf
RUN go get -u github.com/hahwul/s3reverse

RUN cp /root/go/bin/* /bin/
RUN cp -r /root/.gf /var/www/

ENV PATH=$PATH:$HOME/go/bin
ENV GOPATH=$HOME/go/
# RUN export PATH=$PATH:$HOME/go/bin >> /root/.bashrc

RUN rm /var/www/html/index.html
COPY . /var/www/html
RUN pip3 install -r requires.txt
RUN chown www-data -R /var/www/html
RUN chmod 755 -R /var/www/html

EXPOSE 80
CMD ["apachectl", "-D", "FOREGROUND"]
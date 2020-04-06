RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install golang
RUN apt-get install git
RUN go get -u github.com/tomnomnom/assetfinder
RUN go get -u github.com/tomnomnom/httprobe
RUN go get -u github.com/tomnomnom/meg
RUN go get -u github.com/tomnomnom/gf
RUN go get -u github.com/hahwul/s3reverse

RUN git clone https://github.com/sa7mon/S3Scanner.git
RUN PATH=$PATH:/root/go/bin
vi /root/.bashrc
export PATH=$PATH:/root/go/bin
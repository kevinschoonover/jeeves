FROM python:3

WORKDIR /server

COPY . /server 

RUN pip install numpy && pip3 install -r requirements.txt

EXPOSE 5000

CMD python main.py

# start by pulling the python image
FROM python:3.9-slim

# update pip to minimize dependency errors
RUN pip install --upgrade pip

# switch working directory
WORKDIR /app

# copy the requirements file into the image
COPY ./requirements.txt ./requirements.txt

# RUN apk update \
#     && apk add --upgrade --no-cache \
#         bash openssh curl ca-certificates openssl less htop \
# 		g++ make wget rsync \
#         build-base libpng-dev freetype-dev openblas-dev libgomp lapack-dev \
# 		libgcc libquadmath musl  \
# 		libgfortran \
# 		lapack-dev \
# 	&&  pip install --no-cache-dir --upgrade pip

# install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt

# copy every content from the local file to the image
COPY . .

# configure the container to run in an executed manner
ENTRYPOINT [ "python" ]

CMD ["server.py" ]
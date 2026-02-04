FROM php:8.2-apache

# Instala as extensões necessárias para ligar à Base de Dados
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql

# Copia o teu código para a pasta do servidor
COPY . /var/www/html/

# Dá permissões de leitura
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

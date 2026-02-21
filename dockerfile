# Usamos PHP 8.2 con Apache (el más estable)
FROM php:8.2-apache

# Instalamos extensiones útiles de PHP
RUN docker-php-ext-install mysqli && \
    docker-php-ext-enable mysqli

# Habilitamos el módulo de reescritura de Apache (para URLs amigables)
RUN a2enmod rewrite

# Copiamos TODOS tus archivos al servidor
COPY . /var/www/html/

# Configuramos los permisos correctos
RUN chown -R www-data:www-data /var/www/html/ && \
    chmod -R 755 /var/www/html/ && \
    chmod 777 /var/www/html/data

# Configuramos Apache para que el archivo por defecto sea index.php
RUN sed -i 's/index.html/index.php/g' /etc/apache2/mods-enabled/dir.conf

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos Apache
CMD ["apache2-foreground"]

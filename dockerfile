FROM php:8.2-apache
COPY . /var/www/html/
RUN chmod -R 777 /var/www/html/data
RUN sed -i 's/index.html/index.php/g' /etc/apache2/mods-enabled/dir.conf
EXPOSE 80
CMD ["apache2-foreground"]

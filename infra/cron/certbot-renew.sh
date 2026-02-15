#!/bin/bash

LOGFILE="/var/log/certbot-renew.log"
DC="docker-compose -f /root/v1/docker-compose.yml"

echo "[$(date)] Starting certbot renewal..." >> $LOGFILE

$DC run --rm certbot renew \
  --webroot -w /var/www/certbot \
  -n \
  --quiet \
  --deploy-hook "$DC exec -T nginx nginx -s reload" >> $LOGFILE 2>&1

if [ $? -eq 0 ]; then
  echo "[$(date)] Renewal check completed successfully." >> $LOGFILE
else
  echo "[$(date)] Renewal failed! Check logs above." >> $LOGFILE
fi

